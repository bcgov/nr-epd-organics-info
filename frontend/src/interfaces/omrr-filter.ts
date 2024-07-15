import OmrrData from './omrr'

export interface OmrrFilter {
  value: string
  label: string
  field: keyof OmrrData
  on: boolean
  disabled?: boolean
}

export const AUTH_TYPE_NOTIFICATION = 'notification'
export const AUTH_TYPE_COMPOST_FACILITY = 'compostFacility'
export const AUTH_TYPE_LAND_APPLICATION = 'landApplicationBioSolids'
export const AUTH_TYPE_PERMIT = 'permit'
export const AUTH_TYPE_APPROVAL = 'approval'
export const AUTH_TYPE_OPERATIONAL_CERTIFICATE = 'operationalCertificate'

export const facilityTypeFilters: OmrrFilter[] = [
  {
    value: AUTH_TYPE_NOTIFICATION,
    label: 'Notification',
    field: 'Authorization Type',
    on: false,
  },
  {
    value: AUTH_TYPE_COMPOST_FACILITY,
    label: 'Compost Production Facility',
    field: 'Operation Type',
    on: false,
    disabled: true,
  },
  {
    value: AUTH_TYPE_LAND_APPLICATION,
    label: 'Land Application Biosolids',
    field: 'Operation Type',
    on: false,
    disabled: true,
  },
  {
    value: AUTH_TYPE_PERMIT,
    label: 'Permit',
    field: 'Authorization Type',
    on: false,
  },
  {
    value: AUTH_TYPE_APPROVAL,
    label: 'Approval',
    field: 'Authorization Type',
    on: false,
  },
  {
    value: AUTH_TYPE_OPERATIONAL_CERTIFICATE,
    label: 'Operational Certificate',
    field: 'Authorization Type',
    on: false,
  },
]
