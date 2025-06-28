import React from "react";
import Link from "next/link";
import { Card, Grid, Button, Typography, Box } from "@mui/material";
import NewOrganization from "./NewOrganization";
interface OrganizationsPageHeaderProps {
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
  canCreate?: boolean;
}

const OrganizationsPageHeader: React.FC<OrganizationsPageHeaderProps> = ({
  totalCount,
  activeCount,
  inactiveCount,
  canCreate = false,
}) => {
  return (
    <Card className="mb-6">
      <Box className="p-6">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="mr-3">
                    <i className="tabler-building-skyscraper text-primary" />
                  </div>
                  <div>
                    <Typography
                      variant="subtitle2"
                      className="font-bold text-primary"
                    >
                      Organizations
                    </Typography>
                    <Typography variant="h5" className="text-start">
                      {totalCount}
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="mr-3">
                    <i className="tabler-circle-check text-success" />
                  </div>
                  <div>
                    <Typography
                      variant="subtitle2"
                      className="font-bold text-success"
                    >
                      Active
                    </Typography>
                    <Typography variant="h5" className="text-start">
                      {activeCount}
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="mr-3">
                    <i className="tabler-circle-dot text-warning" />
                  </div>
                  <div>
                    <Typography
                      variant="subtitle2"
                      className="font-bold text-warning"
                    >
                      Inactive
                    </Typography>
                    <Typography variant="h5" className="text-start">
                      {inactiveCount}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <NewOrganization />
        </Grid>
      </Box>
    </Card>
  );
};

export default OrganizationsPageHeader;
