"use client";

import {
  Button,
  Card,
  Grid,
  useMediaQuery,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import React, { useState } from "react";

type StartupListHeaderProps = {
  title: string;
  icon: React.ReactElement;
  count: number;
  onAddNewClick?: () => void;
  onSearch?: (searchTerm: string) => void;
  onFilterOrganization?: (value: string) => void;
  onFilterState?: (value: string) => void;
  onFilterSector?: (value: string) => void;
  organizationOptions?: { value: string; label: string }[];
  stateOptions?: { value: string; label: string }[];
  sectorOptions?: { value: string; label: string }[];
  searchPlaceholder?: string;
};

const StartupListHeader = (props: StartupListHeaderProps) => {
  const {
    title,
    icon,
    count,
    onAddNewClick,
    onSearch,
    onFilterOrganization,
    onFilterState,
    onFilterSector,
    organizationOptions = [],
    stateOptions = [],
    sectorOptions = [],
    searchPlaceholder = "Search...",
  } = props;

  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [organizationValue, setOrganizationValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [sectorValue, setSectorValue] = useState("");

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
    if (onSearch) onSearch(newValue);
  };

  const handleOrganizationChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setOrganizationValue(newValue);
    if (onFilterOrganization) onFilterOrganization(newValue);
  };

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setStateValue(newValue);
    if (onFilterState) onFilterState(newValue);
  };

  const handleSectorChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setSectorValue(newValue);
    if (onFilterSector) onFilterSector(newValue);
  };

  const hasFilters = onFilterOrganization || onFilterState || onFilterSector;

  return (
    <Card>
      <Box className="p-4">
        <div className="w-full flex flex-col">
          <div className="flex justify-between items-center">
            <Grid item xs={6} sm={2}>
              <div
                className={`flex items-center p-${
                  isMobile ? "2" : "3"
                } bg-gray-50 rounded-lg`}
              >
                <div className="mr-3">{icon}</div>
                <div>
                  <Typography
                    variant="subtitle2"
                    className="font-bold text-primary"
                  >
                    {title}
                  </Typography>
                  <Typography variant="h5" className="text-start">
                    {count}
                  </Typography>
                </div>
              </div>
            </Grid>
            <Stack direction={{ xs: "row", sm: "row" }} spacing={4}>
              {hasFilters && (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => setShowFilter(!showFilter)}
                  // size={isMobile ? "small" : "small"}
                  className="whitespace-nowrap"
                  // sx={{ width: { sm: "130px" } }}
                >
                  <i className="tabler-filter text-primary text-lg" />
                  {/* <span className="hidden sm:inline">Filter</span> */}
                </Button>
              )}
              {onAddNewClick && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onAddNewClick}
                  size={isMobile ? "small" : "medium"}
                  className="whitespace-nowrap"
                  sx={{ width: { sm: "130px" } }}
                >
                  <i className="tabler-plus text-white me-1 text-lg sm:text-xl" />
                  <span className="hidden sm:inline">Add New</span>
                </Button>
              )}
            </Stack>
          </div>

          {showFilter && (
            <div
              className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-4 w-full`}
            >
              {onSearch && (
                <TextField
                  fullWidth
                  size="small"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full md:w-2/5 mt-4 mie-auto"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className="text-secondary"
                      >
                        <i className="tabler-search" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              {onFilterOrganization && organizationOptions.length > 0 && (
                <FormControl
                  size="small"
                  className={`${isMobile ? "w-full" : "min-w-[200px]"} mt-4`}
                >
                  <InputLabel id="organization-select-label">
                    Organization
                  </InputLabel>
                  <Select
                    labelId="organization-select-label"
                    value={organizationValue}
                    label="Organization"
                    onChange={handleOrganizationChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {organizationOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {onFilterState && stateOptions.length > 0 && (
                <FormControl
                  size="small"
                  className={`${isMobile ? "w-full" : "min-w-[200px]"} mt-4`}
                >
                  <InputLabel id="state-select-label">State</InputLabel>
                  <Select
                    labelId="state-select-label"
                    value={stateValue}
                    label="State"
                    onChange={handleStateChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {stateOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {onFilterSector && sectorOptions.length > 0 && (
                <FormControl
                  size="small"
                  className={`${isMobile ? "w-full" : "min-w-[200px]"} mt-4`}
                >
                  <InputLabel id="sector-select-label">Sector</InputLabel>
                  <Select
                    labelId="sector-select-label"
                    value={sectorValue}
                    label="Sector"
                    onChange={handleSectorChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {sectorOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>
          )}
        </div>
      </Box>
    </Card>
  );
};

export default StartupListHeader;
