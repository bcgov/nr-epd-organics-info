import { Paper } from '@mui/material'
import { AxiosResponse } from '~/axios'
import { useEffect, useState } from 'react'
import apiService from '@/service/api-service'

const columns: string[] = ['Id', 'Name', 'Email']

export default function Dashboard() {
  const [data, setData] = useState([])

  useEffect(() => {
    apiService
      .getAxiosInstance()
      .get('/health')
      .then((response: AxiosResponse) => {
        console.log(response.data)
        setData([])
      })
      .catch((error) => {
        console.error(error)
      })
  }, data)

  //return <MUIDataTable title={'User List'} data={data} columns={columns} />*/
  return (
    <Paper
      elevation={2}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h4>Welcome to OMRR Transparency (Alpha).</h4>
      <span style={{ margin: '1em' }}>
        The Organic Matter Recycling Regulation (OMRR) governs the construction
        and operation of compost facilities, as well as the production,
        distribution, storage, sale, and use of biosolids and compost. OMRR is
        currently undergoing amendments to enhance its effectiveness in human
        and environment health protection. The most recent intentions paper (IP)
        proposes increased transparency and enhancement of Indigenous
        engagement. To support transparency, the ministry proposed requiring all
        composting facilities exempted from permits, approvals, or operational
        certificates, to follow a registration process instead of a notification
        process. The applicant would be required to submit plans, reports, and
        specifications, and any pertinent information requested by a director,
        as part of the registration process. The submitted information would
        then be made publicly available. This information and its posting would
        be subject to the Freedom of Information and Protection of Privacy Act
        (FOIPPA). The primary objective of this project is to develop and
        implement a comprehensive approach that fulfills the Ministry's
        commitments to increased transparency and enhanced Indigenous engagement
        under the OMRR. This initiative focuses on the land application of class
        B compost and class A and class B biosolids, as well as the operations
        of composting facilities not otherwise undergoing permitting processes.
      </span>
    </Paper>
  )
}
