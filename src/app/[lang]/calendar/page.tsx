// Next Imports
import { Metadata } from "next";

// MUI Imports
import Card from "@mui/material/Card";

// Component Imports
import CalendarWrapper from "@/views/calendar/CalendarWrapper";

// Styled Component Imports
import AppFullCalendar from "@/libs/styles/AppFullCalendar";

// Metadata
export const metadata: Metadata = {
  title: "Calendar",
  description: "Calendar Page",
  keywords: "calendar, events, schedule",
  // openGraph: {
  //   title: 'Calendar',
  //   description: 'Calendar Page',
  //   url: '/calendar',
  //   siteName: 'MyApp',
  //   images: [
  //     {
  //       url: '/images/og-image.png',
  //       width: 1200,
  //       height: 630,
  //       alt: 'Calendar Page',
  //     },
  //   ],
  //   locale: 'en_US',
  // },
};

const CalendarPage = () => {
  return (
    <Card className="overflow-visible">
      <AppFullCalendar className="app-calendar">
        <CalendarWrapper />
      </AppFullCalendar>
    </Card>
  );
};

export default CalendarPage;
