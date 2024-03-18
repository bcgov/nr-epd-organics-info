import { Card, CardActions, CardContent, Grid, Link, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'
import { Stack } from '@mui/system'
import { useNavigate } from 'react-router'

export default function Dashboard() {
  const headerCard = (
    <>
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'BC Sans',
            fontWeight: 700,
            fontSize: 48,
            color: '#000000',
          }}
          component="div"
        >
          Compost and Biosolids
        </Typography>
        <Typography>
          Find an authorized compost and biosolid facility in British Columbia
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="large"
          sx={{
            boxSizing: 'border-box',
            border: '1px solid #353433',
            borderRadius: '4px',
            color: '#000000',
          }}
          onClick={() => {
            console.log('map');
          }}
        >
          Search on a map
        </Button>
        <Button
          size="large"
          sx={{
            boxSizing: 'border-box',
            border: '1px solid #353433',
            borderRadius: '4px',
            color: '#000000',
          }}
          onClick={() => {
            buttonClicked('/search')
          }}
        >
          List all authorizations
        </Button>
      </CardActions>
    </>
  )
  const infoCard = (
    <CardContent>
      <Typography
        sx={{
          fontFamily: 'BC Sans',
          fontWeight: 400,
          fontSize: 28,
          color: '#000000',
        }}
        component="div"
      >
        Organic Recycling in B.C.
      </Typography>
      <Typography component="div">
        <Link
          sx={{ color: '#000000' }}
          href={
            'https://www2.gov.bc.ca/gov/content/environment/waste-management/food-and-organic-waste/regulations-guidelines'
          }
          target={'_blank'}
        >
          {' '}
          <span style={{ textDecoration: 'underline' }}>
              British Columbia's Organic Matter Recycling Regulation (OMRR):
            </span>
        </Link>
        <ul>
          <li>
            Governs the construction and operation of compost facilities
          </li>
          {' '}
          <li>
            Regulates the production, distribution, storage, sale and use of
            biosolids and compost
          </li>
          {' '}
          <li>Controls how compost facilities are built and operated</li>
          {' '}
        </ul>
        The B.C. government has a plan to update the regulation to:
        <ul>
          <li>Better protect of human and environment health</li>
          <li>Increase engagement with Indigenous communities</li>
          <li> Improve transparency around organic matter management</li>
        </ul>{' '}
        Learn about the planned changes in the{' '}
        <Link
          sx={{ color: '#000000' }}
          href={
            'https://www2.gov.bc.ca/assets/gov/environment/waste-management/organic-waste/reports-and-papers/omrr-public-update-june-2022.pdf'
          }
          target={'_blank'}
        >
            <span style={{ textDecoration: 'underline' }}>
              project update report
            </span>
        </Link>
      </Typography>
    </CardContent>
  )
  const navigate = useNavigate()
  const buttonClicked = (route: any) => {
    navigate(route, { state: { data: undefined } }) // reset the state
  }
  return (
    <Stack sx={{marginTop:'-3.4em'}}>
      <Card
        sx={{
          padding: '1em 0.475em 0.5em',
          backgroundColor: '#D1CFCD',
        }}
      >
        {headerCard}
      </Card>
      <Card
        sx={{
          padding: '1em 0.475em 0.5em',
          backgroundColor: '#ECEAE8',
        }}
      >
        {infoCard}
      </Card>
    </Stack>
  )
}
