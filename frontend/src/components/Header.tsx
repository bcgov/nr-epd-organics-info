// @ts-ignore
import BCGovLogo from '@/assets/gov-bc-logo-horiz.png'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import { HomeRounded, Menu } from '@mui/icons-material'
const styles = {
  appBar: {
    color: '#ffffff',
    backgroundColor: '#053662',
    borderBottom: '0.1em solid rgb(252, 186, 25) !important',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButton: {
    margin: '0.2em',
    padding: '0.2em',
    color: '#ffffff',
    backgroundColor: '#ffffff',
  },
}
export default function Header() {
  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar sx={{ justifyContent: 'space-between' }} id="back-to-top-anchor">
        <img  alt="Logo" src={BCGovLogo} />
        <Typography sx={{
          /* Application Name */

          width: '9.5em',
          height: '2.25em',

          /* regular/H4 */
          fontFamily: 'BC Sans',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '1.5em',
          lineHeight: '2.25em',
          /* identical to box height, or 150% */

          color:' #FFFFFF'



        }}>
          Organics Info
        </Typography>
        <a href={'/'} target={'_self'}>
          <IconButton>
            <Menu color="secondary"></Menu>
          </IconButton>
        </a>
      </Toolbar>
    </AppBar>
  )
}
