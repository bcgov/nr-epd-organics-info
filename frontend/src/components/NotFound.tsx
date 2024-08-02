import { useNavigate } from 'react-router'
import { Box, Button, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

export default function NotFound() {
  const navigate = useNavigate()
  const buttonClicked = () => {
    navigate('/', { state: { data: undefined } }) // reset the state
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '40em',
      }}
    >
      <Container maxWidth="xs">
        <Grid>
          <Typography variant="h1">404</Typography>
          <Typography variant="h6">
            The page you’re looking for does not exist.
          </Typography>
          <Button
            name="homeBtn"
            id="homeBtn"
            onClick={() => buttonClicked()}
            variant="contained"
          >
            Back Home
          </Button>
        </Grid>
      </Container>
    </Box>
  )
}
