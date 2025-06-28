"use client";

import type React from "react";
import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

const ProjectTabs = ({ children }: { children: React.ReactNode[] }) => {
  const [activeTab, setActiveTab] = useState("details");

  // Ensure children is an array
  const childrenArray = Array.isArray(children) ? children : [children];

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <TabContext value={activeTab}>
      <Box sx={{ borderColor: "divider" }} className="bg-white">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="fullWidth"
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          <Tab
            value="details"
            label={
              <div className="flex items-center gap-2">
                <i className="tabler-file-description h-4 w-4" />
                <span className="hidden sm:inline">Details</span>
              </div>
            }
          />
          <Tab
            value="programs"
            label={
              <div className="flex items-center gap-2">
                <i className="tabler-components h-4 w-4" />
                <span className="hidden sm:inline">Programs</span>
              </div>
            }
          />
          <Tab
            value="team"
            label={
              <div className="flex items-center gap-2">
                <i className="tabler-users h-4 w-4" />
                <span className="hidden sm:inline">Team</span>
              </div>
            }
          />
        </Tabs>
      </Box>

      <TabPanel value="details" sx={{ mt: 3, p: 0 }}>
        {childrenArray[0]}
      </TabPanel>

      <TabPanel value="programs" sx={{ mt: 3, p: 0 }}>
        {childrenArray[1]}
      </TabPanel>

      <TabPanel value="team" sx={{ mt: 3, p: 0 }}>
        {childrenArray[2]}
      </TabPanel>
    </TabContext>
  );
};

export default ProjectTabs;
