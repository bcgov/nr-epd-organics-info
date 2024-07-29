import { OmrrApplicationStatus } from '@/interfaces/omrr-application-status'

export const mockOmrrApplicationStatusResponse: OmrrApplicationStatus[] = [
  {
    Status: 'In Review',
    'Authorization Number': 108485,
    'Job Tracking Number': 386999,
    'Authorization Type': 'Permit',
    'Job Type': 'Authorization Amendment',
    'Received Date': '2019-09-27',
  },
  {
    Status: 'Pending Final Application',
    'Authorization Number': 108536,
    'Job Tracking Number': 433877,
    'Authorization Type': 'Permit',
    'Job Type': 'Authorization Amendment',
    'Received Date': '2024-03-07',
  },
  {
    Status: 'Preliminary Application Review',
    'Authorization Number': 109112,
    'Job Tracking Number': 424330,
    'Authorization Type': 'Permit',
    'Job Type': 'Authorization Amendment',
    'Received Date': '2023-04-17',
  },
]
