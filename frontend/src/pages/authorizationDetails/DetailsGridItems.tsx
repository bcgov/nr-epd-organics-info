import { Grid, Typography } from '@mui/material'

import OmrrData, { omrrDataBooleanFields } from '@/interfaces/omrr'
import { DetailsGridLabel } from './DetailsGridLabel'

import CheckIcon from '@/assets/svgs/fa-check.svg?react'
import CloseIcon from '@/assets/svgs/fa-close.svg?react'

interface Props {
  item: OmrrData
}

export function PermitApprovalOperationalCertificateGridItems({
  item,
}: Readonly<Props>) {
  return (
    <>
      <DetailsGridLabel label="Regulation" md={6}>
        <a
          href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/45_320_2004"
          target="discharge-regulation"
        >
          Waste Discharge Regulation
        </a>
      </DetailsGridLabel>
      <DetailsGridLabel label="Schedule" md={6}>
        {item['Waste Discharge Regulation'] ?? ''}
      </DetailsGridLabel>
      <Grid item xs={12}>
        <Typography className="details-note">
          Permits, Operational Certificates, and Approvals are necessary for
          composting operations that handle 5,000 tonnes or more of finished
          compost per year from food waste or biosolids, as specified in the
          Organic Matter Recycling Regulation.
        </Typography>
      </Grid>
    </>
  )
}

const RecyclingRegulationLink = () => (
  <a
    href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/18_2002"
    target="recycling-regulation"
  >
    Organic Matter Recycling Regulation
  </a>
)

export function NotificationGridItems() {
  return (
    <>
      <DetailsGridLabel label="Regulation" md={6}>
        <RecyclingRegulationLink />
      </DetailsGridLabel>
      <Grid item xs={12}>
        <Typography className="details-note">
          Please note that authorizations issued prior to 2007 are currently
          categorized as historical data. The Authorization Management System
          (AMS), which houses authorization documentation, has constraints on
          the historical data it provides. For additional information, please
          contact us.
        </Typography>
      </Grid>
    </>
  )
}

export function NotificationCompostGridItems({ item }: Readonly<Props>) {
  return (
    <>
      <DetailsGridLabel label="Operation Type" md={6}>
        {item['Operation Type']}
      </DetailsGridLabel>
      <DetailsGridLabel label="Regulation" md={6}>
        <RecyclingRegulationLink />
      </DetailsGridLabel>
      <DetailsGridLabel label="Type of Compost Produced" md={6}>
        {item['Material Land Applied'] ?? ''}
      </DetailsGridLabel>
      <DetailsGridLabel
        label="Facility Design Capacity (tonnes per year)"
        md={6}
      >
        {item['Facility Design Capacity (t/y)'] ?? 'Unknown'}
      </DetailsGridLabel>
      <OrganicMatterGridItem item={item} />
    </>
  )
}

export function NotificationLandApplicationGridItems({
  item,
}: Readonly<Props>) {
  return (
    <>
      <DetailsGridLabel label="Operation Type" md={6}>
        {item['Operation Type']}
      </DetailsGridLabel>
      <DetailsGridLabel label="Regulation" md={6}>
        <RecyclingRegulationLink />
      </DetailsGridLabel>
      <DetailsGridLabel label="Material Land Applied" md={6}>
        {item['Material Land Applied'] ?? ''}
      </DetailsGridLabel>
      <DetailsGridLabel label="Intended Dates of Land Application" md={6}>
        {item['Intended Dates of Land Application'] ?? ''}
      </DetailsGridLabel>
    </>
  )
}

/**
 * Displays a list of checkboxes and "x" for all the organic matter booleans.
 */
function OrganicMatterGridItem({ item }: Readonly<Props>) {
  return (
    <Grid
      item
      xs={12}
      sx={{
        padding: {
          xs: '24px',
          md: '24px 40px 32px',
        },
      }}
      className="organic-matter-grid"
    >
      <Typography className="organic-matter-title">
        Organic Matter Used for Composting
      </Typography>
      <Grid
        container
        sx={{
          gap: {
            xs: '16px 0',
            md: '24px 0',
          },
        }}
        className="organic-matter-checkbox-grid"
      >
        {omrrDataBooleanFields.map((key) => {
          const isChecked = Boolean(item[key])
          return (
            <Grid
              key={`CheckRow-${key}`}
              item
              xs={12}
              md={6}
              lg={4}
              xxl={3}
              className="organic-matter-checkbox-item"
            >
              {isChecked ? (
                <CheckIcon
                  data-testid="organic-matter-checked-icon"
                  className="organic-matter-checkbox-icon"
                />
              ) : (
                <CloseIcon
                  data-testid="organic-matter-unchecked-icon"
                  className="organic-matter-checkbox-icon"
                />
              )}
              <span className="organic-matter-checkbox-label">{key}</span>
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}
