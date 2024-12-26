import {
  Card,
  CardActions,
  Grid,
  Stack,
  Theme,
  Typography,
} from '@mui/material'
import { SxProps } from '@mui/system'
import clsx from 'clsx'

import OmrrData from '@/interfaces/omrr'
import { formatLatOrLng } from '@/utils/utils'
import { AuthorizationStatusChip } from './AuthorizationStatusChip'
import { ViewFacilityDetailsButton } from './ViewFacilityDetailsButton'

import './AuthorizationListItem.css'

interface Props {
  item: OmrrData
  fullDetails?: boolean
  showAddress?: boolean
  className?: string
  sx?: SxProps<Theme>
}

export function AuthorizationListItem({
  item,
  fullDetails = false,
  showAddress = false,
  className,
  sx,
}: Readonly<Props>) {
  const {
    'Authorization Number': number,
    'Regulated Party': name,
    'Authorization Type': type,
    'Authorization Status': status,
  } = item

  return (
    <Card
      className={clsx('authorization-list-item', className)}
      variant="outlined"
      component="li"
      sx={sx}
    >
      <Typography component="div" fontSize={14} marginBottom="8px">
        Authorization #: {number}
      </Typography>
      <Typography
        component="div"
        fontSize={20}
        fontWeight="bold"
        marginBottom="16px"
      >
        {name}
      </Typography>

      <Grid container>
        {fullDetails && (
          <>
            <LabelValue
              label="Effective/Issue Date"
              value={item['Effective/Issue Date']}
            />
            <LabelValue
              label="Last Amendment Date"
              value={item['Last Amendment Date']}
            />
          </>
        )}

        {showAddress ? (
          <>
            <LabelValue
              label="Facility Location"
              value={item['Facility Location']}
            />
            <LabelValue label="Authorization Type" value={type} />
          </>
        ) : (
          <LabelValue label="Authorization Type" value={type} fullWidth />
        )}

        {fullDetails && (
          <>
            {!showAddress && (
              <LabelValue
                label="Facility Location"
                value={item['Facility Location']}
                fullWidth
              />
            )}
            <LabelValue
              label="Latitude"
              value={formatLatOrLng(item.Latitude)}
            />
            <LabelValue
              label="Longitude"
              value={formatLatOrLng(item.Longitude)}
            />
          </>
        )}
      </Grid>

      <Stack direction="row" gap="16px" alignItems="center">
        <Typography component="div">Status:</Typography>
        <AuthorizationStatusChip status={status} />
        <CardActions
          sx={{
            padding: 0,
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <ViewFacilityDetailsButton item={item} />
        </CardActions>
      </Stack>
    </Card>
  )
}

interface LabelValueProps {
  label: string
  value: string | number | undefined
  fullWidth?: boolean
}

function LabelValue({
  label,
  value,
  fullWidth = false,
}: Readonly<LabelValueProps>) {
  // Don't display if the value isn't valid
  if (
    value === undefined ||
    value === null ||
    value === '' ||
    (typeof value === 'number' && isNaN(value))
  ) {
    return null
  }
  return (
    <Grid
      item
      xs={12}
      md={fullWidth ? undefined : 6}
      flexDirection="column"
      gap="4px"
      marginBottom="24px"
    >
      <Typography
        component="div"
        fontSize={14}
        fontWeight="bold"
        marginBottom="4px"
      >
        {label}
      </Typography>
      <Typography component="div">{value}</Typography>
    </Grid>
  )
}
