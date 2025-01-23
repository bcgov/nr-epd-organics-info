import { render, screen } from '@testing-library/react'

import OmrrData, { omrrDataBooleanFields } from '@/interfaces/omrr'
import { OPERATION_TYPE_COMPOST_FACILITY } from '@/interfaces/omrr-filter'
import { createMockOmrrData } from '@/mocks/mock-omrr-data'
import { DetailsSection } from './DetailsSection'

describe('Test suite for DetailsSection', () => {
  it('should render DetailsSection for old Notification', () => {
    const notification: OmrrData = createMockOmrrData('Notification')
    render(<DetailsSection item={notification} />)

    screen.getByText('Authorization Details')
    screen.getByText('Authorization Type')
    screen.getByText('Notification')
    screen.getByText('Regulation')
    screen.getByRole('link', { name: 'Organic Matter Recycling Regulation' })
    screen.getByText(/^Please note that authorizations issued/)
  })

  it('should render DetailsSection for a Permit', () => {
    const wasteDischargeRegulation = 'Schedule 2 - Composting Operations'
    const notification: OmrrData = createMockOmrrData('Permit', {
      'Waste Discharge Regulation': wasteDischargeRegulation,
    })
    render(<DetailsSection item={notification} />)

    screen.getByText('Authorization Details')
    screen.getByText('Authorization Type')
    screen.getByText('Permit')
    screen.getByText('Schedule')
    screen.getByText(wasteDischargeRegulation)
    screen.getByText('Regulation')
    screen.getByRole('link', { name: 'Waste Discharge Regulation' })
    screen.getByText(
      /^Permits, Operational Certificates, and Approvals are necessary/,
    )
  })

  it('should render DetailsSection for Notification Compost operation', () => {
    const materialLandApplied = 'Class A Compost'
    const capacity = '36,000 tonnes per year'
    const notification: OmrrData = createMockOmrrData('Notification', {
      'Operation Type': OPERATION_TYPE_COMPOST_FACILITY,
      'Material Land Applied': materialLandApplied,
      'Facility Design Capacity (t/y)': capacity,
    })
    render(<DetailsSection item={notification} />)

    screen.getByText('Authorization Details')
    screen.getByText('Authorization Type')
    screen.getByText('Notification')
    screen.getByText('Operation Type')
    screen.getByText(OPERATION_TYPE_COMPOST_FACILITY)
    screen.getByText('Regulation')
    screen.getByRole('link', { name: 'Organic Matter Recycling Regulation' })
    screen.getByText('Type of Compost Produced')
    screen.getByText(materialLandApplied)
    screen.getByText('Facility Design Capacity (tonnes per year)')
    screen.getByText(capacity)

    screen.getByText('Organic Matter Used for Composting')
    omrrDataBooleanFields.forEach((key) => {
      screen.getByText(key)
    })
  })

  it('should render DetailsSection for Notification Compost operation with all checked', () => {
    const notification: OmrrData = createMockOmrrData('Notification', {
      'Operation Type': OPERATION_TYPE_COMPOST_FACILITY,
    })
    omrrDataBooleanFields.forEach((key) => {
      ;(notification as any)[key] = true
    })
    render(<DetailsSection item={notification} />)

    screen.getByText('Authorization Details')
    screen.getByText('Authorization Type')
    screen.getByText('Notification')
    screen.getByText('Operation Type')
    screen.getByText(OPERATION_TYPE_COMPOST_FACILITY)
    screen.getByText('Type of Compost Produced')
    screen.getByText('Facility Design Capacity (tonnes per year)')
    screen.getByText('Unknown')

    screen.getByText('Organic Matter Used for Composting')
  })

  it('should render DetailsSection for Notification Land Application', () => {
    const materialLandApplied = 'Class B Biosolids'
    const notification: OmrrData = createMockOmrrData('Notification', {
      'Operation Type': 'Land Application Biosolids',
      'Material Land Applied': materialLandApplied,
      'Intended Dates of Land Application': 'September 1, 2008',
    })
    render(<DetailsSection item={notification} />)

    screen.getByText('Authorization Details')
    screen.getByText('Authorization Type')
    screen.getByText('Notification')
    screen.getByText('Operation Type')
    screen.getByText('Land Application Biosolids')
    screen.getByText('Regulation')
    screen.getByRole('link', { name: 'Organic Matter Recycling Regulation' })
    screen.getByText('Material Land Applied')
    screen.getByText(materialLandApplied)
    screen.getByText('Intended Dates of Land Application')
    screen.getByText('September 1, 2008')
  })
})
