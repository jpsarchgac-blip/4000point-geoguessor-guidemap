import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  COUNTRIES,
  LEVEL_COLORS,
  coverageByIso,
  featureIso,
  type CoverageLevel,
  type CountryCoverage,
  type DrivingSide,
} from '../data/coverage'
import { countryMatchesMeta, getMetaInfo, type MetaFilter } from '../data/metaFilter'
import {
  BIAS_TIER_COLORS,
  BIAS_TIER_LABELS,
  countryMatchesBiasFilter,
  getCountryBiasShare,
  getCountryBiasTier,
  type BiasFilter,
} from '../data/worldBias'

type GeoProps = Record<string, unknown>

interface CoverageMapProps {
  selectedIso: string | null
  onSelect: (iso: string | null, uncoveredName?: string) => void
  levels: CoverageLevel[]
  driving: DrivingSide | 'all'
  region: CountryCoverage['region'] | 'all'
  showUncovered: boolean
  metaFilter: MetaFilter | null
  biasMode: boolean
  biasFilter: BiasFilter
}

function matchesFilters(
  country: CountryCoverage,
  levels: CoverageLevel[],
  driving: DrivingSide | 'all',
  region: CountryCoverage['region'] | 'all',
  metaFilter: MetaFilter | null,
) {
  if (!levels.includes(country.level)) return false
  if (driving !== 'all' && country.driving !== driving) return false
  if (region !== 'all' && country.region !== region) return false
  if (metaFilter && !countryMatchesMeta(country.iso, metaFilter)) return false
  return true
}

function styleFor(
  iso: string | null,
  selectedIso: string | null,
  levels: CoverageLevel[],
  driving: DrivingSide | 'all',
  region: CountryCoverage['region'] | 'all',
  showUncovered: boolean,
  metaFilter: MetaFilter | null,
  biasMode: boolean,
  biasFilter: BiasFilter,
): L.PathOptions {
  const country = iso ? coverageByIso.get(iso) : undefined
  const isSelected = iso !== null && iso === selectedIso

  if (!country) {
    return {
      color: '#1f2937',
      weight: 0.4,
      fillColor: '#111827',
      fillOpacity: showUncovered ? 0.25 : 0,
      opacity: showUncovered ? 1 : 0,
    }
  }

  if (biasMode) {
    const tier = getCountryBiasTier(country.iso)
    const tierColor = BIAS_TIER_COLORS[tier]
    const biasMatch = countryMatchesBiasFilter(country.iso, biasFilter)
    return {
      color: isSelected ? '#f7d046' : biasMatch ? '#0b1220' : '#1f2937',
      weight: isSelected ? 2.4 : biasMatch ? 1 : 0.4,
      fillColor: tierColor,
      fillOpacity: biasMatch ? (isSelected ? 0.95 : 0.82) : 0.07,
      opacity: 1,
    }
  }

  const meta = getMetaInfo(metaFilter)
  const metaMatch = countryMatchesMeta(country.iso, metaFilter)
  const filterMatch = matchesFilters(country, levels, driving, region, null)

  if (metaFilter && meta) {
    return {
      color: isSelected ? '#f7d046' : metaMatch ? '#0b1220' : '#1f2937',
      weight: isSelected ? 2.4 : metaMatch ? 1 : 0.4,
      fillColor: metaMatch ? meta.color : '#1e293b',
      fillOpacity: metaMatch ? (isSelected ? 0.95 : 0.82) : 0.06,
      opacity: 1,
    }
  }

  const visible = filterMatch
  return {
    color: isSelected ? '#f7d046' : '#0b1220',
    weight: isSelected ? 2.2 : 0.7,
    fillColor: LEVEL_COLORS[country.level],
    fillOpacity: visible ? (isSelected ? 0.92 : 0.72) : 0.08,
    opacity: 1,
  }
}

export function CoverageMap({
  selectedIso,
  onSelect,
  levels,
  driving,
  region,
  showUncovered,
  metaFilter,
  biasMode,
  biasFilter,
}: CoverageMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const geoLayerRef = useRef<L.GeoJSON | null>(null)
  const markersRef = useRef<L.LayerGroup | null>(null)
  const markerByIsoRef = useRef(new Map<string, L.CircleMarker>())
  const [ready, setReady] = useState(false)
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  const filterRef = useRef({
    selectedIso,
    levels,
    driving,
    region,
    showUncovered,
    metaFilter,
    biasMode,
    biasFilter,
  })
  filterRef.current = {
    selectedIso,
    levels,
    driving,
    region,
    showUncovered,
    metaFilter,
    biasMode,
    biasFilter,
  }

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      worldCopyJump: true,
      minZoom: 2,
      maxZoom: 8,
      zoomControl: false,
      attributionControl: true,
    }).setView([20, 10], 2)

    L.control.zoom({ position: 'topright' }).addTo(map)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 8,
    }).addTo(map)

    const markers = L.layerGroup().addTo(map)
    markersRef.current = markers
    mapRef.current = map

    let cancelled = false

    void fetch('/data/countries.geojson')
      .then((res) => res.json())
      .then((geojson: GeoJSON.FeatureCollection) => {
        if (cancelled || !mapRef.current) return

        const layer = L.geoJSON(geojson, {
          style: (feature) => {
            const iso = feature ? featureIso(feature.properties as GeoProps) : null
            const f = filterRef.current
            return styleFor(
              iso,
              f.selectedIso,
              f.levels,
              f.driving,
              f.region,
              f.showUncovered,
              f.metaFilter,
              f.biasMode,
              f.biasFilter,
            )
          },
          onEachFeature: (feature, featureLayer) => {
            const props = feature.properties as GeoProps
            const iso = featureIso(props)
            const country = iso ? coverageByIso.get(iso) : undefined
            let label = country
              ? `${country.nameJa} · ${country.nameEn}`
              : String(props.NAME_JA || props.NAME || '')

            if (country && filterRef.current.biasMode) {
              const tier = getCountryBiasTier(country.iso)
              const share = getCountryBiasShare(country.iso)
              label += ` · ${BIAS_TIER_LABELS[tier]}`
              if (share != null) label += ` (${share}%)`
            }

            featureLayer.bindTooltip(label, {
              sticky: true,
              opacity: 0.95,
              className: 'map-tooltip',
            })

            featureLayer.on({
              mouseover: (e) => {
                const path = e.target as L.Path
                path.setStyle({ weight: 1.8, fillOpacity: 0.9 })
                path.bringToFront()
              },
              mouseout: (e) => {
                geoLayerRef.current?.resetStyle(e.target)
              },
              click: (e) => {
                L.DomEvent.stopPropagation(e)
                onSelectRef.current(iso, country ? undefined : String(props.NAME_JA || props.NAME || ''))
              },
            })
          },
        }).addTo(map)

        geoLayerRef.current = layer

        const coveredInPolygons = new Set<string>()
        layer.eachLayer((l) => {
          const feature = (l as L.GeoJSON & { feature?: GeoJSON.Feature }).feature
          if (!feature) return
          const iso = featureIso(feature.properties as GeoProps)
          if (iso && coverageByIso.has(iso)) coveredInPolygons.add(iso)
        })

        const markerByIso = new Map<string, L.CircleMarker>()
        for (const country of COUNTRIES) {
          if (coveredInPolygons.has(country.iso) || !country.fallbackView) continue
          const color = LEVEL_COLORS[country.level]
          const marker = L.circleMarker([country.fallbackView.lat, country.fallbackView.lng], {
            radius: 7,
            color: '#0b1220',
            weight: 1,
            fillColor: color,
            fillOpacity: 0.95,
          })
          marker.bindTooltip(`${country.nameJa} · ${country.nameEn}`, {
            className: 'map-tooltip',
          })
          marker.on('click', (e) => {
            L.DomEvent.stopPropagation(e)
            onSelectRef.current(country.iso)
          })
          marker.addTo(markers)
          markerByIso.set(country.iso, marker)
        }
        markerByIsoRef.current = markerByIso
        map.invalidateSize()
        setReady(true)
      })

    map.on('click', () => onSelectRef.current(null))

    return () => {
      cancelled = true
      map.remove()
      mapRef.current = null
      geoLayerRef.current = null
      markersRef.current = null
    }
  }, [])

  useEffect(() => {
    const layer = geoLayerRef.current
    if (!layer) return
    layer.setStyle((feature) => {
      const iso = feature ? featureIso(feature.properties as GeoProps) : null
      return styleFor(
        iso,
        selectedIso,
        levels,
        driving,
        region,
        showUncovered,
        metaFilter,
        biasMode,
        biasFilter,
      )
    })

    const meta = getMetaInfo(metaFilter)
    for (const [iso, marker] of markerByIsoRef.current) {
      const country = coverageByIso.get(iso)
      if (!country) continue

      if (biasMode) {
        const tier = getCountryBiasTier(iso)
        const biasMatch = countryMatchesBiasFilter(iso, biasFilter)
        marker.setStyle({
          fillColor: BIAS_TIER_COLORS[tier],
          fillOpacity: biasMatch ? 0.95 : 0.12,
          opacity: biasMatch ? 1 : 0.25,
          radius: country.iso === selectedIso ? 10 : 7,
          color: country.iso === selectedIso ? '#f7d046' : '#0b1220',
        })
        continue
      }

      const metaMatch = countryMatchesMeta(iso, metaFilter)
      const visible = metaFilter ? metaMatch : matchesFilters(country, levels, driving, region, null)
      marker.setStyle({
        fillColor: metaFilter && meta ? meta.color : LEVEL_COLORS[country.level],
        fillOpacity: visible ? 0.95 : 0.12,
        opacity: visible ? 1 : 0.25,
        radius: country.iso === selectedIso ? 10 : 7,
        color: country.iso === selectedIso ? '#f7d046' : '#0b1220',
      })
    }
  }, [selectedIso, levels, driving, region, showUncovered, metaFilter, biasMode, biasFilter, ready])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !ready) return

    const bounds = L.latLngBounds([])
    const extendMatching = (iso: string, lat?: number, lng?: number) => {
      if (biasMode) {
        if (!countryMatchesBiasFilter(iso, biasFilter)) return
      } else if (metaFilter) {
        if (!countryMatchesMeta(iso, metaFilter)) return
      } else if (iso !== selectedIso) {
        return
      }

      if (lat != null && lng != null) {
        bounds.extend([lat, lng])
        return
      }

      geoLayerRef.current?.eachLayer((l) => {
        const feature = (l as L.Layer & { feature?: GeoJSON.Feature }).feature
        if (!feature) return
        if (featureIso(feature.properties as GeoProps) !== iso) return
        if ('getBounds' in l) {
          const b = (l as L.Polygon).getBounds()
          if (b.isValid()) bounds.extend(b)
        }
      })
    }

    if (biasMode && biasFilter.kind !== 'all') {
      for (const country of COUNTRIES) {
        if (country.fallbackView) {
          extendMatching(country.iso, country.fallbackView.lat, country.fallbackView.lng)
        } else {
          extendMatching(country.iso)
        }
      }
      if (bounds.isValid()) {
        map.fitBounds(bounds.pad(0.12), { maxZoom: biasFilter.kind === 'country' ? 5 : 4, animate: true })
      }
      return
    }

    if (metaFilter) {
      for (const country of COUNTRIES) {
        if (!countryMatchesMeta(country.iso, metaFilter)) continue
        if (country.fallbackView) {
          bounds.extend([country.fallbackView.lat, country.fallbackView.lng])
        }
      }
      geoLayerRef.current?.eachLayer((l) => {
        const feature = (l as L.Layer & { feature?: GeoJSON.Feature }).feature
        if (!feature) return
        const iso = featureIso(feature.properties as GeoProps)
        if (!iso || !countryMatchesMeta(iso, metaFilter)) return
        if ('getBounds' in l) {
          const b = (l as L.Polygon).getBounds()
          if (b.isValid()) bounds.extend(b)
        }
      })
      if (bounds.isValid()) {
        map.fitBounds(bounds.pad(0.12), { maxZoom: 4, animate: true })
      }
      return
    }

    if (!selectedIso) return
    extendMatching(selectedIso)
    const country = coverageByIso.get(selectedIso)
    if (country?.fallbackView && bounds.isValid()) {
      map.setView([country.fallbackView.lat, country.fallbackView.lng], country.fallbackView.zoom, {
        animate: true,
      })
      return
    }
    if (bounds.isValid()) {
      map.fitBounds(bounds.pad(0.2), { maxZoom: 5, animate: true })
    }
  }, [selectedIso, metaFilter, biasMode, biasFilter, ready])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !ready) return
    const timer = window.setTimeout(() => map.invalidateSize(), 100)
    return () => window.clearTimeout(timer)
  }, [metaFilter, biasMode, biasFilter, ready])

  return <div ref={containerRef} className="map-canvas" />
}
