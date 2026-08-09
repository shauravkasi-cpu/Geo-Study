/// <reference types="vite/client" />

declare module 'world-atlas/countries-110m.json' {
  import type { Topology } from 'topojson-specification'
  const topology: Topology
  export default topology
}

declare module 'react-simple-maps' {
  import type { ComponentType, ReactNode, SVGProps } from 'react'

  export interface ComposableMapProps extends SVGProps<SVGSVGElement> {
    projection?: string
    projectionConfig?: Record<string, number>
    width?: number
    height?: number
  }

  export interface ZoomableGroupProps {
    center?: [number, number]
    zoom?: number
    minZoom?: number
    maxZoom?: number
    onMoveStart?: (event: { coordinates: [number, number]; zoom: number }) => void
    onMove?: (event: { coordinates: [number, number]; zoom: number }) => void
    onMoveEnd?: (event: { coordinates: [number, number]; zoom: number }) => void
    children?: ReactNode
  }

  export interface GeographyProps {
    geography: unknown
    style?: {
      default?: React.CSSProperties
      hover?: React.CSSProperties
      pressed?: React.CSSProperties
    }
    onClick?: (event: React.MouseEvent) => void
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>
  export const Geographies: ComponentType<{
    geography: unknown
    children: (props: { geographies: unknown[] }) => ReactNode
  }>
  export const Geography: ComponentType<GeographyProps>
  export const Marker: ComponentType<{
    coordinates: [number, number]
    children?: ReactNode
  }>
  export const Graticule: ComponentType<SVGProps<SVGPathElement>>
}
