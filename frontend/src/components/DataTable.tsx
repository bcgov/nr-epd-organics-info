import apiService from '@/service/api-service'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { AxiosResponse } from '~/axios'
import TextField from '@mui/material/TextField'
const columns: GridColDef[] = [
  {
    field: 'Authorization Number',
    headerName: 'Authorization Number',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Authorization Type',
    headerName: 'Authorization Type',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Regulated Party',
    headerName: 'Regulated Party',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Authorization Status',
    headerName: 'Authorization Status',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Effective/Issue Date',
    headerName: 'Effective/Issue Date',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Last Amendment Date',
    headerName: 'Last Amendment Date',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Facility Location',
    headerName: 'Facility Location',
    sortable: true,
    filterable: true,
    flex: 1,
  },

  {
    field: 'Latitude',
    headerName: 'Latitude',
    sortable: true,
    filterable: true,
    flex: 1,
  },

  {
    field: 'Longitude',
    headerName: 'Longitude',
    sortable: true,
    filterable: true,
    flex: 1,
  },

]

export default function DataTable() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    apiService
      .getAxiosInstance()
      .get('/omrr')
      .then((response: AxiosResponse) => {
        setData(response?.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  const [selectedRow, setSelectedRow] = useState(null)

  const handleClose = () => {
    setSelectedRow(null)
  }
  // @ts-ignore
  return (
    <div
      style={{
        minHeight: '45em',
        maxHeight: '45em',
        width: '100%',
        marginLeft: '4em',
      }}
    >
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        experimentalFeatures={{ ariaV7: true }}
        checkboxSelection={false}
        rows={data}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        getRowId={(row) => row['Authorization Number']}
        onRowClick={(params) => setSelectedRow(params.row)}
      />
      <Dialog open={!!selectedRow} onClose={handleClose}>
        <DialogTitle>Row Details</DialogTitle>
        <DialogContent>
          <Table>
            <TableBody>
              {selectedRow &&
                Object.entries(selectedRow).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
