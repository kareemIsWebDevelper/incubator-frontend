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

type ListHeaderComponentProps = {
  title: string;
  icon: React.ReactElement;
  count: number;
  onAddNewClick?: () => void;
  onSearch?: (searchTerm: string) => void;
  onFilter?: (filterValue: string) => void;
  filterOptions?: { value: string; label: string }[];
  searchPlaceholder?: string;
  filterLabel?: string;
};

const ListHeaderComponent = (props: ListHeaderComponentProps) => {
  const {
    title,
    icon,
    count,
    onAddNewClick,
    onSearch,
    onFilter,
    filterOptions = [],
    searchPlaceholder = "Search...",
    filterLabel = "Filter by",
  } = props;

  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
    if (onSearch) onSearch(newValue);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setFilterValue(newValue);
    if (onFilter) onFilter(newValue);
  };

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
            <Stack direction={{ xs: "row", sm: "row" }} spacing={2}>
              {onFilter && (
                <Button
                  variant="tonal"
                  color="secondary"
                  onClick={() => setShowFilter(!showFilter)}
                  size={isMobile ? "small" : "medium"}
                  className="whitespace-nowrap"
                  sx={{ width: { sm: "130px" } }}
                >
                  <i className="tabler-filter text-primary me-1 text-lg sm:text-xl" />
                  <span className="hidden sm:inline">Filter</span>
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
                  className="w-full md:w-1/4 mt-4 mie-auto"
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

              {onFilter && filterOptions.length > 0 && (
                <FormControl
                  size="small"
                  className={`${isMobile ? "w-full" : "min-w-[200px]"} mt-4`}
                >
                  <InputLabel id="filter-select-label">
                    {filterLabel}
                  </InputLabel>
                  <Select
                    labelId="filter-select-label"
                    value={filterValue}
                    label={filterLabel}
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {filterOptions.map((option) => (
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

export default ListHeaderComponent;
