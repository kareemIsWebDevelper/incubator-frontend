// filepath: /Users/kareemkhaledebraheem/Documents/untitled folder 2/incubator-frontend/src/views/dashboard/LatestEvents.tsx
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

type EventDataType = {
  id: string;
  title: string;
  eventType: string;
  date: string;
  time?: string;
  allDay?: boolean;
  avatarIcon?: string;
  avatarColor?: ThemeColor;
};

const data: EventDataType[] = [
  {
    id: "1",
    title: "Design Review Meeting",
    eventType: "Business",
    date: "2025-06-08",
    time: "10:00 AM",
    allDay: false,
    avatarIcon: "tabler-briefcase",
    avatarColor: "primary",
  },
  {
    id: "2",
    title: "Client Presentation",
    eventType: "Business",
    date: "2025-06-10",
    time: "2:00 PM",
    allDay: false,
    avatarIcon: "tabler-presentation",
    avatarColor: "info",
  },
  {
    id: "3",
    title: "Team Building Workshop",
    eventType: "Personal",
    date: "2025-06-12",
    allDay: true,
    avatarIcon: "tabler-users",
    avatarColor: "success",
  },
  {
    id: "4",
    title: "Product Launch",
    eventType: "Business",
    date: "2025-06-15",
    time: "9:00 AM",
    allDay: false,
    avatarIcon: "tabler-rocket",
    avatarColor: "warning",
  },
  {
    id: "5",
    title: "Training Session",
    eventType: "ETC",
    date: "2025-06-18",
    time: "11:00 AM",
    allDay: false,
    avatarIcon: "tabler-school",
    avatarColor: "secondary",
  },
  {
    id: "6",
    title: "Annual Conference",
    eventType: "Holiday",
    date: "2025-06-20",
    allDay: true,
    avatarIcon: "tabler-calendar-event",
    avatarColor: "error",
  },
];

const LatestEvents = () => {
  const handleViewEvent = (eventId: string, eventTitle: string) => {
    console.log(`Viewing event: ${eventTitle} (ID: ${eventId})`);
    // Add navigation logic here
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="bs-full flex flex-col">
      <CardHeader
        title="Latest Events"
        subheader={`${data.length} upcoming events`}
        action={<OptionMenu options={["View all events", "Add new event", "Calendar view"]} />}
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
                  {item.title}
                </Typography>
                <Typography variant="body2">
                  {formatDate(item.date)} {item.time && !item.allDay ? `• ${item.time}` : item.allDay ? '• All Day' : ''}
                </Typography>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Typography variant="body2" color="text.secondary" className="capitalize">
                  {item.eventType}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<i className="tabler-eye" />}
                  onClick={() => handleViewEvent(item.id, item.title)}
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

export default LatestEvents