import { Stack, Typography } from '@mui/material'

import { DATA_LAYER_GROUPS } from '@/constants/data-layers'
import { DataLayer, DataLayerGroup } from '@/interfaces/data-layers'

import mapLayersIcon from '@/assets/svgs/guidance-layers.svg'
import otherSourcesIcon from '@/assets/svgs/guidance-sources.svg'

const styles = {
  stack: {
    padding: {
      xs: '40px 24px 80px',
      md: '80px 76px 160px',
    },
  },
  iconRow: {
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
  },
}

export function GuidanceInfo() {
  return (
    <Stack
      direction="column"
      className="guidance-info"
      component="section"
      sx={styles.stack}
    >
      <Stack className="guidance-info-row" sx={styles.iconRow}>
        <img
          src={mapLayersIcon}
          className="guidance-info-icon"
          alt="Map layers icon"
        />
        <div className="guidance-info-column">
          <Typography
            className="guidance-info-heading"
            variant="h6"
            component="h6"
          >
            Map layers
          </Typography>
          <Typography className="guidance-info-text">
            The map shows provincial map layers provided by the B.C. Geographic
            Warehouse. A full list of map layers and link to their metadata in
            the B.C. Data Catalogue are below:
          </Typography>
          <ul className="guidance-info-list guidance-info-text">
            {DATA_LAYER_GROUPS.map((group: DataLayerGroup) => (
              <li key={`DataLayerGroup-${group.name}`}>
                {group.name}
                <ul className="guidance-info-list">
                  {group.layers.map((layer: DataLayer) => {
                    return layer.webUrl ? (
                      <li key={`DataLayerGroup-${layer.name}`}>
                        <a href={layer.webUrl} target="DataLayerWebUrl">
                          {layer.name}
                        </a>
                      </li>
                    ) : null
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Stack>
      <Stack className="guidance-info-row" sx={styles.iconRow}>
        <img
          src={otherSourcesIcon}
          className="guidance-info-icon"
          alt="Other sources of information icon"
        />
        <div className="guidance-info-column">
          <Typography
            className="guidance-info-heading"
            variant="h6"
            component="h6"
          >
            Other sources of information
          </Typography>
          <Typography className="guidance-info-text">
            The information on this site is viewable on the Authorization
            Management System (AMS), which stores documentation for waste
            discharge authorizations. It can be{' '}
            <a
              href="https://www2.gov.bc.ca/gov/content/environment/waste-management/waste-discharge-authorization/find-authorization"
              target="guidance-public"
            >
              publicly searched
            </a>{' '}
            and downloaded from the{' '}
            <a
              href="https://catalogue.data.gov.bc.ca/dataset/waste-discharge-authorizations-all-authorizations"
              target="guidance-download"
            >
              B.C. Data Catalogue
            </a>
            {/* fix sonar warning */}.
          </Typography>
          <Typography className="guidance-info-text">
            The{' '}
            <a href="https://nrced.gov.bc.ca/" target="nrced">
              Natural Resource Compliance and Enforcement Database
            </a>{' '}
            (NRCED) provides information on compliance inspections. Some
            authorizations may have monitoring results uploaded to the{' '}
            <a
              href="https://a100.gov.bc.ca/pub/ems/mainmenu.do;jsessionid=D93FF57B71501543480A46324E6F55C9?userAction=dataResultsCriteria&x=75&y=11"
              target="ems"
            >
              Environmental Monitoring System
            </a>{' '}
            (EMS) and the{' '}
            <a
              href="https://catalogue.data.gov.bc.ca/dataset?tags=EMS"
              target="guidance-catalog"
            >
              B.C. Data Catalogue
            </a>
            {/* fix sonar warning */}.
          </Typography>
        </div>
      </Stack>
    </Stack>
  )
}
