"use client";

import React from 'react'

// MUI Imports
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Third-party Imports
import classnames from "classnames";

import type { ThemeColor } from "@core/types";

// Components Imports
import OptionMenu from "@core/components/option-menu";
import CustomAvatar from "@core/components/mui/Avatar";

type DataType = {
  serviceName: string;
  serviceType: string;
  serviceId: string;
  avatarIcon?: string;
  avatarColor?: ThemeColor;
};

const data: DataType[] = [
  {
    serviceName: "training-room",
    serviceType: "logistics-services",
    serviceId: "1",
    avatarIcon: "tabler-school",
    avatarColor: "primary",
  },
  {
    serviceName: "meeting-room",
    serviceType: "managerial-services",
    serviceId: "2",
    avatarIcon: "tabler-users",
    avatarColor: "success",
  },
  {
    serviceName: "tech-and-development",
    serviceType: "technology-services",
    serviceId: "3",
    avatarIcon: "tabler-code",
    avatarColor: "info",
  },
  {
    serviceName: "consulting",
    serviceType: "consulting-services",
    serviceId: "4",
    avatarIcon: "tabler-briefcase",
    avatarColor: "warning",
  },
  {
    serviceName: "marketing",
    serviceType: "marketing-services",
    serviceId: "5",
    avatarIcon: "tabler-speakerphone",
    avatarColor: "error",
  },
  {
    serviceName: "customer-support",
    serviceType: "support-services",
    serviceId: "6",
    avatarIcon: "tabler-headphones",
    avatarColor: "secondary",
  },
];

const LatestServices = () => {
  const handleViewService = (serviceId: string, serviceName: string) => {
    console.log(`Viewing service: ${serviceName} (ID: ${serviceId})`);
    // Add navigation logic here
  };

  return (
    <Card className="bs-full flex flex-col">
      <CardHeader
        title="Latest Services"
        subheader={`Total ${data.length} services available`}
        action={<OptionMenu options={["View all services", "Add new service"]} />}
        className="-mb-4"
      />
      <CardContent className="flex grow flex-col justify-between max-sm:gap-5">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4 py-1">
            <CustomAvatar
              skin="light"
              variant="rounded"
              color={item.avatarColor}
              size={34}
            >
              <i className={classnames(item.avatarIcon, "text-[22px]")} />
            </CustomAvatar>
            <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full">
              <div className="flex flex-col">
                <Typography className="font-medium" color="text.primary">
                  {item.serviceName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Typography>
                <Typography variant="body2">{item.serviceType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Typography>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<i className="tabler-eye" />}
                  onClick={() => handleViewService(item.serviceId, item.serviceName)}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LatestServices