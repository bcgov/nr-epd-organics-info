import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { RootState } from '@/app/store'
import { resetFilters, setFilters } from '@/features/omrr/omrr-slice'
import DropdownButton from '@/components/DropdownButton'

const styles = {
  resetButton: {
    alignSelf: 'flex-start',
    marginTop: '0.75rem',
    color: 'var(--typography-color-primary)',
    borderColor: 'var(--surface-color-border-dark)',
  },
}

interface CheckboxItem {
  value: string
  label: string
  checked: boolean
  disabled?: boolean
}

export function FilterByButton() {
  const dispatch = useDispatch()
  const {
    notificationFilter,
    compostFacilityFilter,
    compostFacilityFilterDisabled,
    landApplicationBioSolidsFilter,
    landApplicationBioSolidsFilterDisabled,
    permitFilter,
    approvalFilter,
    operationalCertificateFilter,
  } = useSelector((state: RootState) => state.omrr)
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))

  const updateFilters = (filterType: string) => {
    dispatch(setFilters(filterType))
  }

  const onReset = () => {
    dispatch(resetFilters())
  }

  const items: CheckboxItem[] = [
    {
      value: 'notification',
      label: 'Notification',
      checked: notificationFilter,
    },
    {
      value: 'compostFacility',
      label: 'Compost Production Facility',
      checked: compostFacilityFilter,
      disabled: compostFacilityFilterDisabled,
    },
    {
      value: 'landApplicationBioSolids',
      label: 'Land Application Biosolids',
      checked: landApplicationBioSolidsFilter,
      disabled: landApplicationBioSolidsFilterDisabled,
    },
    {
      value: 'permit',
      label: 'Permit',
      checked: permitFilter,
    },
    {
      value: 'approval',
      label: 'Approval',
      checked: approvalFilter,
    },
    {
      value: 'operationalCertificate',
      label: 'Operational Certificate',
      checked: operationalCertificateFilter,
    },
  ]
  const showResetButton = items.some((item) => item.checked)

  const content = (
    <FormGroup sx={{ gap: '0.5rem', paddingLeft: '0.5em' }}>
      {items.map(({ value, label, checked, disabled }) => {
        return (
          <FormControlLabel
            key={`filterByCheckBox-${value}`}
            disabled={disabled}
            control={<Checkbox checked={checked} />}
            label={label}
            onChange={() => updateFilters(value)}
          />
        )
      })}
      {showResetButton && (
        <Button variant="outlined" onClick={onReset} sx={styles.resetButton}>
          Reset Filters
        </Button>
      )}
    </FormGroup>
  )

  return (
    <DropdownButton
      id="mapFilterByButton"
      variant="contained"
      color="secondary"
      size="medium"
      className={clsx('map-button', 'map-button--medium')}
      openClassName="map-button--active"
      dropdownContent={content}
      showArrow={isLarge}
    >
      Filter by Facility Type
    </DropdownButton>
  )
}
