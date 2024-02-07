import BCGovLogo from '@/assets/gov-bc-logo-horiz.png'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import { HomeRounded } from '@mui/icons-material'
const styles = {
  appBar: {
    color: '#ffffff',
    backgroundColor: '#003366',
    borderBottom: '2px solid rgb(252, 186, 25) !important',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButton: {
    margin: '0.2em',
    padding: '0.2em',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
}
export default function Header() {
  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <img alt="Logo" src={BCGovLogo} />
        <Typography>OMRR Transparency (Alpha)</Typography>
        <a href={'/'} target={'_self'}>
          <IconButton style={{ backgroundColor: '#FFFFFF' }}>
            <HomeRounded color="primary"></HomeRounded>
          </IconButton>
        </a>
      </Toolbar>
    </AppBar>
  )
}
