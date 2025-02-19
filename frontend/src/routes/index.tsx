import { Routes, Route } from 'react-router-dom'
import Dashboard from '@/pages/dashboard/Dashboard'
import AuthorizationList from '@/pages/authorizationList/AuthorizationList'
import AuthorizationDetails from '@/pages/authorizationDetails/AuthorizationDetails'
import MapView from '@/pages/map/MapView'
import ContactUs from '@/pages/contactUs/ContactUs'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/search" element={<AuthorizationList />} />
      <Route path="/authorization/:id" element={<AuthorizationDetails />} />
      <Route path="/map" element={<MapView />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  )
}
