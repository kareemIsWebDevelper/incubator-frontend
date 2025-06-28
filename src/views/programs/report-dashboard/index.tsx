"use client";

import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import SummaryTab from "./SummeryTab";
import PerformanceTab from "./PerformanceTab";
import MentorshipTab from "./MentorshipTab";
import WorkshopsTab from "./WorkshopTab";
import FinalEvaluationTab from "./FinalEvaluationTab";

// Import Tab Content Components
// import SummaryTab from './SummaryTab';
// import MentorshipTab from './MentorshipTab';
// import WorkshopsTab from './WorkshopsTab';
// import FinalEvalTab from './FinalEvalTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Helper for TabPanel
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`main-dashboard-tabpanel-${index}`}
      aria-labelledby={`main-dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, pb: 3 }}>
          {" "}
          {/* Added padding to tab panel content */}
          {children}
        </Box>
      )}
    </div>
  );
}

const chartFont = { fontFamily: "Cairo, sans-serif" };
const chartColors = [
  "#0d6efd",
  "#198754",
  "#ffc107",
  "#6f42c1",
  "#fd7e14",
  "#dc3545",
  "#0dcaf0",
];

const ProgramReportDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabsConfig = [
    {
      label: "Program Summary",
      icon: (
        <i
          className="tabler tabler-file-text"
          style={{ fontSize: "1.5rem" }}
        ></i>
      ),
      component: <SummaryTab chartColors={chartColors} chartFont={chartFont} />,
    },
    {
      label: "Company Performance",
      icon: (
        <i
          className="tabler tabler-chart-line"
          style={{ fontSize: "1.5rem" }}
        ></i>
      ),
      component: <PerformanceTab chartColors={chartColors} chartFont={chartFont} />
    },
    {
      label: "Mentorship and Consulting",
      icon: (
        <i
          className="tabler tabler-brand-my-oppo"
          style={{ fontSize: "1.5rem" }}
        ></i>
      ),
      component: <MentorshipTab chartColors={chartColors} chartFont={chartFont} />
    },
    {
      label: "Workshops",
      icon: (
        <i
          className="tabler tabler-brand-craft"
          style={{ fontSize: "1.5rem" }}
        ></i>
      ),
      component: <WorkshopsTab />
    },
    {
      label: "Final Evaluation",
      icon: (
        <i className="tabler tabler-trophy" style={{ fontSize: "1.5rem" }}></i>
      ),
      component: <FinalEvaluationTab />
    },
  ];

  return (
    <Grid>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Program Report Dashboard
      </Typography>

      <Card>
        <CardContent>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="Main dashboard tabs"
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ marginBottom: 4, paddingBottom: 2 }}
          >
            {tabsConfig.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
                id={`main-dashboard-tab-${index}`}
                aria-controls={`main-dashboard-tabpanel-${index}`}
              />
            ))}
          </Tabs>
          {tabsConfig.map((tab, index) => (
            <TabPanel key={index} value={activeTab} index={index}>
              {tab.component}
            </TabPanel>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProgramReportDashboard;
