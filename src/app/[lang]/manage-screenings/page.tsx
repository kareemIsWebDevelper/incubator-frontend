import { Metadata } from 'next';
import ManageScreenings from '@/views/manage-screenings';

// Metadata
export const metadata: Metadata = {
  title: "Manage Screening",
  description: "Manage Screening Page",
  keywords: "manage, screening, startup, program",
};

const ManageScreeningsPage = () => {
  return (
    <ManageScreenings />
  ) 
}

export default ManageScreeningsPage