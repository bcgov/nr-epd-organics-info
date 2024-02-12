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
    field: 'Status',
    headerName: 'Status',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Company',
    headerName: 'Company',
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
    field: 'Discharge Type',
    headerName: 'Discharge Type',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'BC Industry Code (BCENIC)',
    headerName: 'BC Industry Code (BCENIC)',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'EMS Site #, Type and Desc.',
    headerName: 'EMS Site #, Type and Desc.',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  /* {
    field: 'Comparative Priority Index',
    headerName: 'Comparative Priority Index',
    sortable: true,
    filterable: true,
  },
  {
    field: 'WDR Regulation',
    headerName: 'WDR Regulation',
    sortable: true,
    filterable: true,
  },
  {
    field: 'WDR Description',
    headerName: 'WDR Description',
    sortable: true,
    filterable: true,
  },
  {
    field: 'Facility Type/Description',
    headerName: 'Facility Type/Description',
    sortable: true,
    filterable: true,
  },
  {
    field: 'Discharge Point/Source',
    headerName: 'Discharge Point/Source',
    sortable: true,
    filterable: true,
  }, */
  {
    field: 'Discharge Contaminant',
    headerName: 'Discharge Contaminant',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  /* {
    field: 'Discharge Min',
    headerName: 'Discharge Min',
    sortable: true,
    filterable: true,
  },
  {
    field: 'Discharge Avg',
    headerName: 'Discharge Avg',
    sortable: true,
    filterable: true,
  },
  {
    field: 'Discharge Max',
    headerName: 'Discharge Max',
    sortable: true,
    filterable: true,
  },
  {
    field: 'Discharge Start Date',
    headerName: 'Discharge Start Date',
    sortable: true,
    filterable: true,
  },
  {
    field: 'Discharge End Date',
    headerName: 'Discharge End Date',
    sortable: true,
    filterable: true,
  },
  {
    field: 'Proposed Treatment + Disposal',
    headerName: 'Proposed Treatment + Disposal',
    sortable: true,
    filterable: true,
  }, */
  {
    field: 'Administrative Area',
    headerName: 'Administrative Area',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Program Area',
    headerName: 'Program Area',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Regional District',
    headerName: 'Regional District',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Nearest Municipality',
    headerName: 'Nearest Municipality',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Facility Address',
    headerName: 'Facility Address',
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
  {
    field: 'Issue Date',
    headerName: 'Issue Date',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Expiry Date',
    headerName: 'Expiry Date',
    sortable: true,
    filterable: true,
    flex: 1,
  },
]

export default function DataTable() {
  const [data, setData] = useState<any>([
    {
      id: 1,
      'Authorization Number': 1,
      Status: 'Active',
      Company: 'COMPANY A',
      'Authorization Type':
        'Oil & Gas Waste Regulation (Facility Registration)',
      'Discharge Type': 'Air',
      'BC Industry Code (BCENIC)':
        'Primary: 211100 Oil & Gas - Extraction   Secondary: 211110 Oil & Gas - Processing Plants',
      'EMS Site #, Type and Desc.': 'E333591: STACK -  Permitted Discharge',
      'Comparative Priority Index': 'Low',
      'WDR Regulation': 'Schedule 1',
      'WDR Description': 'Oil and Natural Gas Industry - Large',
      'Facility Type/Description': 'Waterhub ',
      'Discharge Point/Source': 'One (1) Caterpillar G3512 Generator',
      'Discharge Contaminant': 'Nitrous Oxide',
      'Discharge Min': null,
      'Discharge Avg': '          4.877 t/y',
      'Discharge Max': null,
      'Discharge Start Date': '2024-02-01',
      'Discharge End Date': '3999-12-31',
      'Proposed Treatment + Disposal': 'Discharge To Air',
      'Administrative Area': 'BC Energy Regulator',
      'Program Area': 'Authorizations',
      'Regional District': 'Peace River ',
      'Nearest Municipality': 'Fort St. John (OGC)',
      'Facility Address': 'facilities 1',
      Latitude: 56.30521,
      Longitude: 121.978231,
      'Issue Date': '2023-11-08',
      'Expiry Date': '2024-02-06',
    },
    {
      id: 2,
      'Authorization Number': 2,
      Status: 'Active',
      Company: 'COMPANY A',
      'Authorization Type':
        'Oil & Gas Waste Regulation (Facility Registration)',
      'Discharge Type': 'Air',
      'BC Industry Code (BCENIC)':
        'Primary: 211100 Oil & Gas - Extraction   Secondary: 211110 Oil & Gas - Processing Plants',
      'EMS Site #, Type and Desc.': 'E333591: STACK -  Permitted Discharge',
      'Comparative Priority Index': 'Low',
      'WDR Regulation': 'Schedule 1',
      'WDR Description': 'Oil and Natural Gas Industry - Large',
      'Facility Type/Description': 'Waterhub ',
      'Discharge Point/Source': 'One (1) Caterpillar G3512 Generator',
      'Discharge Contaminant': 'Nitrous Oxide',
      'Discharge Min': null,
      'Discharge Avg': '          4.877 t/y',
      'Discharge Max': null,
      'Discharge Start Date': '2024-02-01',
      'Discharge End Date': '3999-12-31',
      'Proposed Treatment + Disposal': 'Discharge To Air',
      'Administrative Area': 'BC Energy Regulator',
      'Program Area': 'Authorizations',
      'Regional District': 'Peace River ',
      'Nearest Municipality': 'Fort St. John (OGC)',
      'Facility Address': 'facilities 1',
      Latitude: 56.30521,
      Longitude: 121.978231,
      'Issue Date': '2023-11-08',
      'Expiry Date': '2024-02-06',
    },
    {
      id: 3,
      'Authorization Number': 3,
      Status: 'Active',
      Company: 'COMPANY A',
      'Authorization Type':
        'Oil & Gas Waste Regulation (Facility Registration)',
      'Discharge Type': 'Air',
      'BC Industry Code (BCENIC)':
        'Primary: 211100 Oil & Gas - Extraction   Secondary: 211110 Oil & Gas - Processing Plants',
      'EMS Site #, Type and Desc.': 'E333591: STACK -  Permitted Discharge',
      'Comparative Priority Index': 'Low',
      'WDR Regulation': 'Schedule 1',
      'WDR Description': 'Oil and Natural Gas Industry - Large',
      'Facility Type/Description': 'Waterhub ',
      'Discharge Point/Source': 'One (1) Caterpillar G3512 Generator',
      'Discharge Contaminant': 'Nitrous Oxide',
      'Discharge Min': null,
      'Discharge Avg': '          4.877 t/y',
      'Discharge Max': null,
      'Discharge Start Date': '2024-02-01',
      'Discharge End Date': '3999-12-31',
      'Proposed Treatment + Disposal': 'Discharge To Air',
      'Administrative Area': 'BC Energy Regulator',
      'Program Area': 'Authorizations',
      'Regional District': 'Peace River ',
      'Nearest Municipality': 'Fort St. John (OGC)',
      'Facility Address': 'facilities 1',
      Latitude: 56.30521,
      Longitude: 121.978231,
      'Issue Date': '2023-11-08',
      'Expiry Date': '2024-02-06',
    },
    {
      id: 4,
      'Authorization Number': 4,
      Status: 'Active',
      Company: 'COMPANY A',
      'Authorization Type':
        'Oil & Gas Waste Regulation (Facility Registration)',
      'Discharge Type': 'Air',
      'BC Industry Code (BCENIC)':
        'Primary: 211100 Oil & Gas - Extraction   Secondary: 211110 Oil & Gas - Processing Plants',
      'EMS Site #, Type and Desc.': 'E333591: STACK -  Permitted Discharge',
      'Comparative Priority Index': 'Low',
      'WDR Regulation': 'Schedule 1',
      'WDR Description': 'Oil and Natural Gas Industry - Large',
      'Facility Type/Description': 'Waterhub ',
      'Discharge Point/Source': 'One (1) Caterpillar G3512 Generator',
      'Discharge Contaminant': 'Nitrous Oxide',
      'Discharge Min': null,
      'Discharge Avg': '          4.877 t/y',
      'Discharge Max': null,
      'Discharge Start Date': '2024-02-01',
      'Discharge End Date': '3999-12-31',
      'Proposed Treatment + Disposal': 'Discharge To Air',
      'Administrative Area': 'BC Energy Regulator',
      'Program Area': 'Authorizations',
      'Regional District': 'Peace River ',
      'Nearest Municipality': 'Fort St. John (OGC)',
      'Facility Address': 'facilities 1',
      Latitude: 56.30521,
      Longitude: 121.978231,
      'Issue Date': '2023-11-08',
      'Expiry Date': '2024-02-06',
    },
    {
      id: 5,
      'Authorization Number': 5,
      Status: 'Active',
      Company: 'COMPANY A',
      'Authorization Type':
        'Oil & Gas Waste Regulation (Facility Registration)',
      'Discharge Type': 'Air',
      'BC Industry Code (BCENIC)':
        'Primary: 211100 Oil & Gas - Extraction   Secondary: 211110 Oil & Gas - Processing Plants',
      'EMS Site #, Type and Desc.': 'E333591: STACK -  Permitted Discharge',
      'Comparative Priority Index': 'Low',
      'WDR Regulation': 'Schedule 1',
      'WDR Description': 'Oil and Natural Gas Industry - Large',
      'Facility Type/Description': 'Waterhub ',
      'Discharge Point/Source': 'One (1) Caterpillar G3512 Generator',
      'Discharge Contaminant': 'Nitrous Oxide',
      'Discharge Min': null,
      'Discharge Avg': '          4.877 t/y',
      'Discharge Max': null,
      'Discharge Start Date': '2024-02-01',
      'Discharge End Date': '3999-12-31',
      'Proposed Treatment + Disposal': 'Discharge To Air',
      'Administrative Area': 'BC Energy Regulator',
      'Program Area': 'Authorizations',
      'Regional District': 'Peace River ',
      'Nearest Municipality': 'Fort St. John (OGC)',
      'Facility Address': 'facilities 1',
      Latitude: 56.30521,
      Longitude: 121.978231,
      'Issue Date': '2023-11-08',
      'Expiry Date': '2024-02-06',
    },
    {
      id: 6,
      'Authorization Number': 6,
      Status: 'Active',
      Company: 'COMPANY A',
      'Authorization Type':
        'Oil & Gas Waste Regulation (Facility Registration)',
      'Discharge Type': 'Air',
      'BC Industry Code (BCENIC)':
        'Primary: 211100 Oil & Gas - Extraction   Secondary: 211110 Oil & Gas - Processing Plants',
      'EMS Site #, Type and Desc.': 'E333591: STACK -  Permitted Discharge',
      'Comparative Priority Index': 'Low',
      'WDR Regulation': 'Schedule 1',
      'WDR Description': 'Oil and Natural Gas Industry - Large',
      'Facility Type/Description': 'Waterhub ',
      'Discharge Point/Source': 'One (1) Caterpillar G3512 Generator',
      'Discharge Contaminant': 'Nitrous Oxide',
      'Discharge Min': null,
      'Discharge Avg': '          4.877 t/y',
      'Discharge Max': null,
      'Discharge Start Date': '2024-02-01',
      'Discharge End Date': '3999-12-31',
      'Proposed Treatment + Disposal': 'Discharge To Air',
      'Administrative Area': 'BC Energy Regulator',
      'Program Area': 'Authorizations',
      'Regional District': 'Peace River ',
      'Nearest Municipality': 'Fort St. John (OGC)',
      'Facility Address': 'facilities 1',
      Latitude: 56.30521,
      Longitude: 121.978231,
      'Issue Date': '2023-11-08',
      'Expiry Date': '2024-02-06',
    },
    {
      id: 7,
      'Authorization Number': 7,
      Status: 'Active',
      Company: 'COMPANY A',
      'Authorization Type':
        'Oil & Gas Waste Regulation (Facility Registration)',
      'Discharge Type': 'Air',
      'BC Industry Code (BCENIC)':
        'Primary: 211100 Oil & Gas - Extraction   Secondary: 211110 Oil & Gas - Processing Plants',
      'EMS Site #, Type and Desc.': 'E333591: STACK -  Permitted Discharge',
      'Comparative Priority Index': 'Low',
      'WDR Regulation': 'Schedule 1',
      'WDR Description': 'Oil and Natural Gas Industry - Large',
      'Facility Type/Description': 'Waterhub ',
      'Discharge Point/Source': 'One (1) Caterpillar G3512 Generator',
      'Discharge Contaminant': 'Nitrous Oxide',
      'Discharge Min': null,
      'Discharge Avg': '          4.877 t/y',
      'Discharge Max': null,
      'Discharge Start Date': '2024-02-01',
      'Discharge End Date': '3999-12-31',
      'Proposed Treatment + Disposal': 'Discharge To Air',
      'Administrative Area': 'BC Energy Regulator',
      'Program Area': 'Authorizations',
      'Regional District': 'Peace River ',
      'Nearest Municipality': 'Fort St. John (OGC)',
      'Facility Address': 'facilities 1',
      Latitude: 56.30521,
      Longitude: 121.978231,
      'Issue Date': '2023-11-08',
      'Expiry Date': '2024-02-06',
    },
    {
      id: 8,
      'Authorization Number': 8,
      Status: 'Active',
      Company: 'COMPANY A',
      'Authorization Type':
        'Oil & Gas Waste Regulation (Facility Registration)',
      'Discharge Type': 'Air',
      'BC Industry Code (BCENIC)':
        'Primary: 211100 Oil & Gas - Extraction   Secondary: 211110 Oil & Gas - Processing Plants',
      'EMS Site #, Type and Desc.': 'E333591: STACK -  Permitted Discharge',
      'Comparative Priority Index': 'Low',
      'WDR Regulation': 'Schedule 1',
      'WDR Description': 'Oil and Natural Gas Industry - Large',
      'Facility Type/Description': 'Waterhub ',
      'Discharge Point/Source': 'One (1) Caterpillar G3512 Generator',
      'Discharge Contaminant': 'Nitrous Oxide',
      'Discharge Min': null,
      'Discharge Avg': '          4.877 t/y',
      'Discharge Max': null,
      'Discharge Start Date': '2024-02-01',
      'Discharge End Date': '3999-12-31',
      'Proposed Treatment + Disposal': 'Discharge To Air',
      'Administrative Area': 'BC Energy Regulator',
      'Program Area': 'Authorizations',
      'Regional District': 'Peace River ',
      'Nearest Municipality': 'Fort St. John (OGC)',
      'Facility Address': 'facilities 1',
      Latitude: 56.30521,
      Longitude: 121.978231,
      'Issue Date': '2023-11-08',
      'Expiry Date': '2024-02-06',
    },
    {
      id: 9,
      'Authorization Number': 9,
      Status: 'Active',
      Company: 'COMPANY A',
      'Authorization Type':
        'Oil & Gas Waste Regulation (Facility Registration)',
      'Discharge Type': 'Air',
      'BC Industry Code (BCENIC)':
        'Primary: 211100 Oil & Gas - Extraction   Secondary: 211110 Oil & Gas - Processing Plants',
      'EMS Site #, Type and Desc.': 'E333591: STACK -  Permitted Discharge',
      'Comparative Priority Index': 'Low',
      'WDR Regulation': 'Schedule 1',
      'WDR Description': 'Oil and Natural Gas Industry - Large',
      'Facility Type/Description': 'Waterhub ',
      'Discharge Point/Source': 'One (1) Caterpillar G3512 Generator',
      'Discharge Contaminant': 'Nitrous Oxide',
      'Discharge Min': null,
      'Discharge Avg': '          4.877 t/y',
      'Discharge Max': null,
      'Discharge Start Date': '2024-02-01',
      'Discharge End Date': '3999-12-31',
      'Proposed Treatment + Disposal': 'Discharge To Air',
      'Administrative Area': 'BC Energy Regulator',
      'Program Area': 'Authorizations',
      'Regional District': 'Peace River ',
      'Nearest Municipality': 'Fort St. John (OGC)',
      'Facility Address': 'facilities 1',
      Latitude: 56.30521,
      Longitude: 121.978231,
      'Issue Date': '2023-11-08',
      'Expiry Date': '2024-02-06',
    },
    {
      id: 10,
      'Authorization Number': 10,
      Status: 'Active',
      Company: 'COMPANY A',
      'Authorization Type':
        'Oil & Gas Waste Regulation (Facility Registration)',
      'Discharge Type': 'Air',
      'BC Industry Code (BCENIC)':
        'Primary: 211100 Oil & Gas - Extraction   Secondary: 211110 Oil & Gas - Processing Plants',
      'EMS Site #, Type and Desc.': 'E333591: STACK -  Permitted Discharge',
      'Comparative Priority Index': 'Low',
      'WDR Regulation': 'Schedule 1',
      'WDR Description': 'Oil and Natural Gas Industry - Large',
      'Facility Type/Description': 'Waterhub ',
      'Discharge Point/Source': 'One (1) Caterpillar G3512 Generator',
      'Discharge Contaminant': 'Nitrous Oxide',
      'Discharge Min': null,
      'Discharge Avg': '          4.877 t/y',
      'Discharge Max': null,
      'Discharge Start Date': '2024-02-01',
      'Discharge End Date': '3999-12-31',
      'Proposed Treatment + Disposal': 'Discharge To Air',
      'Administrative Area': 'BC Energy Regulator',
      'Program Area': 'Authorizations',
      'Regional District': 'Peace River ',
      'Nearest Municipality': 'Fort St. John (OGC)',
      'Facility Address': 'facilities 1',
      Latitude: 56.30521,
      Longitude: 121.978231,
      'Issue Date': '2023-11-08',
      'Expiry Date': '2024-02-06',
    },
  ])

  useEffect(() => {
    apiService
      .getAxiosInstance()
      .get('/health')
      .then((response: AxiosResponse) => {
        console.log(response?.data)
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
