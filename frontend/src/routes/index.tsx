import { Routes, Route } from 'react-router-dom'
import NotFound from '@/components/NotFound'
import Dashboard from '@/components/Dashboard'
import DataTable from '@/components/DataTable'
import LeafletMapWithPoint from '@/components/MapView'
import AuthorizationList from '@/components/AuthorizationList'
import AuthorizationDetails from '@/components/AuthorizationDetails'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/table" element={<DataTable />} />
      <Route path="/search" element={<AuthorizationList />} />
      <Route path="/authorization/:id" element={<AuthorizationDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
