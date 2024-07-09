import { Routes, Route } from 'react-router-dom'
import Dashboard from '@/pages/dashboard/Dashboard'
import AuthorizationList from '@/components/AuthorizationList'
import AuthorizationDetails from '@/components/AuthorizationDetails'
import MapView from '@/components/MapView'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/search" element={<AuthorizationList />} />
      <Route path="/map" element={<MapView />} />
      <Route path="/authorization/:id" element={<AuthorizationDetails />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  )
}
