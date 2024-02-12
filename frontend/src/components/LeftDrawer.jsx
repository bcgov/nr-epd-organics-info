import * as React from 'react'
import {
  Button,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from '@mui/material'
import { useNavigate } from 'react-router'
import MapIcon from '@mui/icons-material/Map'
import TableViewIcon from '@mui/icons-material/TableView'
export default function LeftDrawer() {
  const navigate = useNavigate()
  const buttonClicked = (event) => {
    navigate(event.route, { state: { data: undefined } }) // reset the state
  }
  return (
    <div>
      <Drawer color="secondary" variant="permanent">
        <List>
          {[
            {
              key: 'Table',
              route: '/table',
              description: 'See the details in a table format.',
              icon: 'Table',
            },
            {
              key: 'Map',
              route: '/map',
              description: 'See the details in a map view.',
              icon: 'Map',
            },
            /*{
                key: "Search",
                route: "/search",
                icon: "Search",
                description: "Search for a repository",
                disabled: true
              }*/
          ].map((element) => (
            <ListItem color="secondary" key={element.key}>
              <Button
                color="secondary"
                id={element.key}
                onClick={() => buttonClicked(element)}
              >
                <ListItemText primary={element.key} />
                <Tooltip title={element.description}>
                  <Icon style={{ lineHeight: 1 }}>
                    {element.icon === 'Map' && <MapIcon />}
                    {element.icon === 'Table' && <TableViewIcon />}
                  </Icon>
                </Tooltip>
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}
