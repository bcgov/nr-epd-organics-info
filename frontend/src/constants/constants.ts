/**
 * The minimum number of characters required before performing a text search.
 */
export const MIN_SEARCH_LENGTH = 3

/**
 * How long to wait before performing a search.
 */
export const SEARCH_DELAY = 300
/**
 * The zoom level when zooming to a place.
 */
export const DEFAULT_PLACE_ZOOM = 13

/**
 * The zoom level when zooming to an authorization.
 */
export const DEFAULT_AUTHORIZATION_ZOOM = 13

/**
 * The map bottom drawer component is 320px in height
 * in its initial state. It can be expanded to full height.
 */
export const MAP_BOTTOM_DRAWER_HEIGHT = 320
export const MAP_BOTTOM_DRAWER_HEIGHT_SEARCH_BY = 160

export const MAP_CONTROLS_RIGHT_XL = 64
export const MAP_CONTROLS_RIGHT_LG = 48
export const MAP_CONTROLS_RIGHT_SM = 24
export const MAP_CONTROLS_BOTTOM_LG = 40
export const MAP_CONTROLS_BOTTOM_SM = 24

export enum BottomDrawerContentEnum {
  dataLayers = 'dataLayers',
  pointSearch = 'pointSearch',
  polygonSearch = 'polygonSearch',
  searchBy = 'searchBy',
  filterBy = 'filterBy',
}
