import OmrrData from './omrr'
import { LatLngTuple } from 'leaflet'

export interface OmrrFilter {
  value: string
  label: string
  field: keyof OmrrData
  on: boolean
  disabled?: boolean
  // If true a starts with match is performed instead of an exact match
  startsWith?: boolean
  nestedFilters?: OmrrFilter[]
}

export const AUTHORIZATION_TYPE_NOTIFICATION = 'notification'
export const OPERATION_TYPE_COMPOST_FACILITY = 'compost production facility'
// Actual values are ['Land Application Biosolids', 'Land Application Compost']
export const OPERATION_TYPE_LAND_APPLICATION = 'land application'
export const AUTHORIZATION_TYPE_PERMIT = 'permit'
export const AUTHORIZATION_TYPE_APPROVAL = 'approval'
export const AUTHORIZATION_TYPE_OPERATIONAL_CERTIFICATE =
  'operational certificate'

export const facilityTypeFilters: OmrrFilter[] = [
  {
    value: AUTHORIZATION_TYPE_NOTIFICATION,
    label: 'Notification',
    field: 'Authorization Type',
    on: false,
    nestedFilters: [
      {
        value: OPERATION_TYPE_COMPOST_FACILITY,
        label: 'Compost Production Facility',
        field: 'Operation Type',
        on: false,
        disabled: true,
      },
      {
        value: OPERATION_TYPE_LAND_APPLICATION,
        label: 'Land Application Biosolids',
        field: 'Operation Type',
        on: false,
        // Compare to start of value instead of exact match
        startsWith: true,
        disabled: true,
      },
    ],
  },
  {
    value: AUTHORIZATION_TYPE_PERMIT,
    label: 'Permit',
    field: 'Authorization Type',
    on: false,
  },
  {
    value: AUTHORIZATION_TYPE_APPROVAL,
    label: 'Approval',
    field: 'Authorization Type',
    on: false,
  },
  {
    value: AUTHORIZATION_TYPE_OPERATIONAL_CERTIFICATE,
    label: 'Operational Certificate',
    field: 'Authorization Type',
    on: false,
  },
]

export interface CircleFilter {
  center?: LatLngTuple
  radius: number
}

export interface PolygonFilter {
  positions: LatLngTuple[]
  finished?: boolean
}
