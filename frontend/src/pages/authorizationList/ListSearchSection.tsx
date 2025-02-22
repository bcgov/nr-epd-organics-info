import { useState } from 'react'
import { Box, Button, IconButton, Menu, Stack } from '@mui/material'
import clsx from 'clsx'
import CloseIcon from '@mui/icons-material/Close'

import { FilterByCheckboxGroup } from '@/components/FilterByCheckboxGroup'
import { ListSearchInput } from './ListSearchInput'
import { ListSearchByGroup } from './ListSearchByGroup'

import DownArrow from '@/assets/svgs/fa-caret-down.svg?react'

const styles = {
  container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    gap: '24px',
    alignItems: {
      xs: 'stretch',
      md: 'center',
    },
  },
  searchInput: {
    flex: 1,
  },
  actionButtons: {
    display: 'flex',
    gap: '16px',
    flexShrink: 0,
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    '& .MuiButton-root': {
      height: '63px',
      width: {
        xs: '100%',
        md: 'auto',
      },
      justifyContent: 'space-between',
      padding: '0 16px',
    },
  },
}

export function ListSearchSection({ isMobile }: { isMobile?: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.searchInput}>
        <ListSearchInput isMobile={isMobile} />
      </Box>
      <Box sx={styles.actionButtons}>
        <ListSearchByGroup isMobile={isMobile} />
        <Stack direction="row" gap="16px">
          <Button
            color={isMobile ? 'primary' : 'secondary'}
            variant="contained"
            onClick={handleClick}
            endIcon={
              <DownArrow
                width={10}
                style={{
                  transform: `rotate(${Boolean(anchorEl) ? 180 : 0}deg)`,
                  transition: 'transform 0.2s linear',
                }}
              />
            }
            sx={{ textTransform: 'none' }}
          >
            Filter
          </Button>
        </Stack>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: { xs: '100%', md: '400px' },
            mt: 1,
            position: 'relative',
          },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            display: { xs: 'block', md: 'none' },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ p: 2 }}>
          <FilterByCheckboxGroup className="list-search-checkbox-group" />
        </Box>
      </Menu>
    </Box>
  )
}
