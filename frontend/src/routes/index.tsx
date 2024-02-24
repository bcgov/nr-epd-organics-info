import { Routes, Route } from 'react-router-dom'
import NotFound from '@/components/NotFound'
import Dashboard from '@/components/Dashboard'
import DataTable from '@/components/DataTable'
import LeafletMapWithPoint from '@/components/MapView'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/table" element={<DataTable />} />
      <Route path="/map" element={<LeafletMapWithPoint />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
