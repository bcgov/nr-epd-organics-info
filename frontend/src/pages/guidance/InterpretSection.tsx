import { Stack, Typography } from '@mui/material'

export function InterpretSection() {
  return (
    <Stack
      direction="column"
      className="interpret-section"
      component="section"
      sx={{
        padding: {
          xs: '40px 24px',
          md: '80px 76px;',
        },
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        className="interpret-heading-large"
      >
        How to interpret
      </Typography>
      <div className="interpret-yellow-bar" />
      <Typography className="interpret-text">
        Organics Info shows public data on authorizations for compost facilities
        and biosolid land application in B.C. in one place. The portal is
        intended to support transparency and provide publicly accessible
        information on regulated parties.{' '}
      </Typography>
      <Typography
        variant="h6"
        component="h6"
        className="interpret-heading-small"
      >
        Limitations
      </Typography>
      <Typography className="interpret-text">
        At this time, only existing permits, approvals, or operational
        certificates and applications for amendments are displayed. New
        applications for permits, approvals or operational certificates are not
        displayed. Organics Info does not include data on compliance inspections
        or environmental data.
      </Typography>
      <Typography
        variant="h6"
        component="h6"
        className="interpret-heading-small"
      >
        Definitions
      </Typography>
      <Typography className="interpret-text">
        <b>Active</b>: the facility is operating or land application is actively
        occurring and the authorization is active.
        <br />
        <b>Inactive</b>: the facility is no longer active or land application is
        no longer taking place.
      </Typography>
    </Stack>
  )
}
