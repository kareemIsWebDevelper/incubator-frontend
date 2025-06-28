import { Grid, Typography } from "@mui/material";
import ServiceRequestsTable from "./ServiceRequestsTable";

// Define the Vendor and ServiceRequestType interfaces
interface Vendor {
  name: string;
  email: string;
  phone: string;
}

interface ServiceRequestType {
  serviceName: string;
  comment: string;
  vendor: Vendor;
  createdAt: string;
}

const ServiceRequests = () => {
  // Sample data for service requests
  const serviceRequests: ServiceRequestType[] = [
    {
      serviceName: "Plumbing",
      comment: "Leaking sink needs urgent fixing.",
      vendor: {
        name: "John Doe",
        email: "john@plumbtech.com",
        phone: "+1234567890",
      },
      createdAt: "2025-05-10T09:30:00Z",
    },
    {
      serviceName: "Electrical",
      comment: "Need ceiling fan installation.",
      vendor: {
        name: "Jane Smith",
        email: "jane@electrofix.com",
        phone: "+1234567891",
      },
      createdAt: "2025-05-11T14:45:00Z",
    },
    {
      serviceName: "Cleaning",
      comment: "Weekly house cleaning service.",
      vendor: {
        name: "Alice Johnson",
        email: "alice@cleanforce.com",
        phone: "+1234567892",
      },
      createdAt: "2025-05-12T10:00:00Z",
    },
    {
      serviceName: "Gardening",
      comment: "Lawn needs trimming and weeding.",
      vendor: {
        name: "Bob Green",
        email: "bob@gardenpro.com",
        phone: "+1234567893",
      },
      createdAt: "2025-05-13T08:15:00Z",
    },
    {
      serviceName: "Painting",
      comment: "Need wall painting for 3 rooms.",
      vendor: {
        name: "Carlos Painter",
        email: "carlos@freshcoat.com",
        phone: "+1234567894",
      },
      createdAt: "2025-05-14T16:20:00Z",
    },
    {
      serviceName: "AC Repair",
      comment: "AC not cooling properly.",
      vendor: {
        name: "Diana Cool",
        email: "diana@airfix.com",
        phone: "+1234567895",
      },
      createdAt: "2025-05-15T13:40:00Z",
    },
    {
      serviceName: "IT Support",
      comment: "Computer running slow, needs cleanup.",
      vendor: {
        name: "Eli Tech",
        email: "eli@techhelp.com",
        phone: "+1234567896",
      },
      createdAt: "2025-05-16T11:10:00Z",
    },
    {
      serviceName: "Pest Control",
      comment: "Seeing ants and cockroaches in kitchen.",
      vendor: {
        name: "Fiona Pest",
        email: "fiona@bugbusters.com",
        phone: "+1234567897",
      },
      createdAt: "2025-05-17T07:50:00Z",
    },
    {
      serviceName: "Carpentry",
      comment: "Need a custom bookshelf made.",
      vendor: {
        name: "George Wood",
        email: "george@woodcraft.com",
        phone: "+1234567898",
      },
      createdAt: "2025-05-18T12:25:00Z",
    },
    {
      serviceName: "Security",
      comment: "Install CCTV cameras around property.",
      vendor: {
        name: "Helen Guard",
        email: "helen@safewatch.com",
        phone: "+1234567899",
      },
      createdAt: "2025-05-19T15:00:00Z",
    },
  ];

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Service Requests
        </Typography>
        {/* <Typography variant="body1" color="text.secondary">
          Manage and track all service requests
        </Typography> */}
      </Grid>

      <Grid item xs={12}>
        {/* Service Requests Table */}
        <ServiceRequestsTable data={serviceRequests} />
      </Grid>
    </Grid>
  );
};

export default ServiceRequests;
