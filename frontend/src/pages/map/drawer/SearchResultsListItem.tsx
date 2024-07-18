import { Card, CardActions, Grid, Stack, Typography } from '@mui/material'

import OmrrData from '@/interfaces/omrr'
import { AuthorizationStatusChip } from '@/components/AuthorizationStatusChip'
import { ViewFacilityDetailsButton } from '@/components/ViewFacilityDetailsButton'
import { formatLatOrLng, truncateDate } from '@/utils/utils'

interface Props {
  item: OmrrData
  fullDetails?: boolean
}

export function SearchResultListItem({ item, fullDetails = false }: Props) {
  const {
    'Authorization Number': number,
    'Regulated Party': name,
    'Authorization Type': type,
    'Authorization Status': status,
  } = item

  return (
    <Card
      className="search-result-list-item"
      variant="outlined"
      role="listitem"
    >
      <Typography component="div" fontSize={14} marginBottom="8px">
        Authorization #: <u>{number}</u>
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
            <SearchResultLabel
              label="Effective/Issue Date"
              value={truncateDate(item['Effective/Issue Date'])}
            />
            <SearchResultLabel
              label="Last Amendment Date"
              value={truncateDate(item['Last Amendment Date'])}
            />
          </>
        )}

        <SearchResultLabel label="Authorization Type" value={type} fullWidth />

        {fullDetails && (
          <>
            <SearchResultLabel
              label="Facility Location"
              value={item['Facility Location']}
              fullWidth
            />
            <SearchResultLabel
              label="Latitude"
              value={formatLatOrLng(item.Latitude)}
            />
            <SearchResultLabel
              label="Longitude"
              value={formatLatOrLng(item.Longitude)}
            />
          </>
        )}
      </Grid>

      <Stack direction="row" gap="16px" alignItems="center">
        <Typography component="div">Status:</Typography>
        <AuthorizationStatusChip status={status} />
        <div className="spacer" />
        <CardActions sx={{ padding: 0 }}>
          <ViewFacilityDetailsButton item={item} />
        </CardActions>
      </Stack>
    </Card>
  )
}

interface SearchResultLabelProps {
  label: string
  value: string | number
  fullWidth?: boolean
}

function SearchResultLabel({
  label,
  value,
  fullWidth = false,
}: SearchResultLabelProps) {
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
