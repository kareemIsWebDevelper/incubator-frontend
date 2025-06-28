import { Metadata } from 'next';
import DashboardRouter from '@/views/dashboard/DashboardRouter'

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Main dashboard overview with key metrics, analytics, and navigation to various application features.",
};

const DashboardPage = () => {
  return (
    <DashboardRouter />
  )
}

export default DashboardPage