import { Routes, Route } from 'react-router-dom'
import NotFound from '@/components/NotFound'
import Dashboard from '@/components/Dashboard'
import AuthorizationList from '@/components/AuthorizationList'
import AuthorizationDetails from '@/components/AuthorizationDetails'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/search" element={<AuthorizationList />} />
      <Route path="/authorization/:id" element={<AuthorizationDetails />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  )
}
