"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  Table,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import type { RankingInfo } from "@tanstack/match-sorter-utils";
import {
  Card,
  CardContent,
  Typography,
  TablePagination,
  Chip,
  MenuItem,
  IconButton,
  Tooltip,
  Button,
  Menu,
  MenuList,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import classnames from "classnames";

// Component Imports
import CustomTextField from "@core/components/mui/TextField";
import TablePaginationComponent from "@components/TablePaginationComponent";
import CustomAvatar from "@core/components/mui/Avatar";

// Style Imports
import tableStyles from "@core/styles/table.module.css";

// Util Imports
import { getInitials } from "@/utils/getInitials";

// Types Imports
import { SurveyResultType } from "@/types/surveysResultsTypes";

// Extend table types
declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// Styled Components
const Icon = styled("i")({});

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<TextFieldProps, "onChange">) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <CustomTextField
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

// Column Definitions
const columnHelper = createColumnHelper<SurveyResultType>();

interface SurveysResultsTableProps {
  resultsData: Array<SurveyResultType>;
}

const SurveysResultsTable = ({ resultsData }: SurveysResultsTableProps) => {
  // States
  const [data, setData] = useState(resultsData || []);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  
  // Filter states
  const [programFilter, setProgramFilter] = useState<string>("");
  const [scopeFilter, setScopeFilter] = useState<string>("");
  const [mentorFilter, setMentorFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  
  // Export menu state
  const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);

  // Update data when resultsData prop changes
  useEffect(() => {
    setData(resultsData || []);
  }, [resultsData]);

  // Filtered data based on filters
  const filteredData = useMemo(() => {
    return data.filter((result) => {
      const programMatch = !programFilter || result.program.name === programFilter;
      const scopeMatch = !scopeFilter || result.scope === scopeFilter;
      const mentorMatch = !mentorFilter || (result.mentor && result.mentor.name === mentorFilter);
      const statusMatch = !statusFilter || result.status === statusFilter;

      return programMatch && scopeMatch && mentorMatch && statusMatch;
    });
  }, [data, programFilter, scopeFilter, mentorFilter, statusFilter]);

  // Get unique values for filters
  const uniquePrograms = useMemo(
    () => [...new Set(data.map((result) => result.program.name))],
    [data]
  );
  const uniqueScopes = useMemo(
    () => [...new Set(data.map((result) => result.scope))],
    [data]
  );
  const uniqueMentors = useMemo(
    () => [...new Set(data.map((result) => result.mentor?.name).filter(Boolean))],
    [data]
  );
  const uniqueStatuses = useMemo(
    () => [...new Set(data.map((result) => result.status))],
    [data]
  );

  // Helper function to get status chip color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "answered":
        return "success";
      case "not-answered":
        return "warning";
      default:
        return "default";
    }
  };

  // Helper function to get scope chip color
  const getScopeColor = (scope: string) => {
    switch (scope) {
      case "mentorship":
        return "primary";
      case "training":
        return "secondary";
      default:
        return "default";
    }
  };

  // Export functions
  const exportToCSV = () => {
    const headers = [
      "User",
      "Email",
      "Startup",
      "Program",
      "Scope",
      "Status",
      "Mentor",
      "Submit Date",
    ];

    const rows = filteredData.map((result) => [
      result.user.name,
      result.user.email,
      result.startup?.name || "N/A",
      result.program.name,
      result.scope,
      result.status,
      result.mentor?.name || "N/A",
      result.submittedAt ? new Date(result.submittedAt).toLocaleString() : "N/A",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `survey-results-${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setExportMenuAnchor(null);
  };

  const exportToExcel = () => {
    const headers = [
      "User",
      "Email",
      "Startup",
      "Program",
      "Scope",
      "Status",
      "Mentor",
      "Submitted At",
    ];

    const rows = filteredData.map((result) => [
      result.user.name,
      result.user.email,
      result.startup?.name || "N/A",
      result.program.name,
      result.scope,
      result.status,
      result.mentor?.name || "N/A",
      result.submittedAt ? new Date(result.submittedAt).toLocaleString() : "N/A",
    ]);

    const htmlContent = `
      <table>
        <thead>
          <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) =>
                `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;

    const blob = new Blob([htmlContent], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `survey-results-${new Date().toISOString().split("T")[0]}.xls`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setExportMenuAnchor(null);
  };

  const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setExportMenuAnchor(event.currentTarget);
  };

  const handleExportMenuClose = () => {
    setExportMenuAnchor(null);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("user", {
        header: "User",
        size: 200,
        cell: ({ row }) => (
          <div className="flex items-center gap-3 min-w-0">
            <CustomAvatar
              src={row.original.user.image || ""}
              size={32}
              alt={row.original.user.name}
            >
              {!row.original.user.image ? getInitials(row.original.user.name) : null}
            </CustomAvatar>
            <div className="min-w-0 flex-1">
              <Typography 
                className="font-medium truncate" 
                color="text.primary"
                title={row.original.user.name}
              >
                {row.original.user.name}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                className="truncate"
                title={row.original.user.email}
              >
                {row.original.user.email}
              </Typography>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("startup", {
        header: "Startup",
        size: 200,
        cell: ({ row }) => (
          <div className="flex items-center gap-3 min-w-0">
            <CustomAvatar
              src={row.original.startup?.logo}
              size={40}
              className="flex-shrink-0"
            >
              {row.original.startup?.name ? getInitials(row.original.startup.name) : "N/A"}
            </CustomAvatar>
            <div className="min-w-0 flex-1">
              <Typography 
                className="font-medium truncate" 
                color="text.primary"
                title={row.original.startup?.name || "N/A"}
              >
                {row.original.startup?.name || "N/A"}
              </Typography>
              {row.original.startup?.sector && (
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  className="truncate"
                  title={row.original.startup.sector}
                >
                  {row.original.startup.sector}
                </Typography>
              )}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("program", {
        header: "Program",
        size: 180,
        cell: ({ row }) => (
          <div className="min-w-0">
            <Typography 
              className="font-medium truncate" 
              color="text.primary"
              title={row.original.program.name}
            >
              {row.original.program.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="truncate">
              {row.original.program.participantCount} participants
            </Typography>
          </div>
        ),
      }),
      columnHelper.accessor("scope", {
        header: "Scope",
        size: 110,
        cell: ({ row }) => (
          <Chip
            label={row.original.scope}
            color={getScopeColor(row.original.scope)}
            variant="tonal"
            size="small"
            className="capitalize"
          />
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        size: 130,
        cell: ({ row }) => (
          <Chip
            label={row.original.status.replace("-", " ")}
            color={getStatusColor(row.original.status)}
            variant="tonal"
            size="small"
            className="capitalize"
          />
        ),
      }),
      columnHelper.accessor("mentor", {
        header: "Mentor",
        size: 160,
        cell: ({ row }) => (
          <div className="min-w-0">
            {row.original.mentor ? (
              <>
                <Typography 
                  className="font-medium truncate" 
                  color="text.primary"
                  title={row.original.mentor.name}
                >
                  {row.original.mentor.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  className="truncate"
                  title={row.original.mentor.title}
                >
                  {row.original.mentor.title}
                </Typography>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                N/A
              </Typography>
            )}
          </div>
        ),
      }),
      columnHelper.accessor("submittedAt", {
        header: "Submitted At",
        size: 120,
        cell: ({ row }) => (
          <div className="min-w-0">
            {row.original.submittedAt ? (
              <>
                <Typography className="font-medium whitespace-nowrap" color="text.primary">
                  {new Date(row.original.submittedAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="whitespace-nowrap">
                  {new Date(row.original.submittedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Not submitted
              </Typography>
            )}
          </div>
        ),
      }),
    ],
    []
  );

  // React Table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <Card>
      <CardContent className="flex justify-between flex-col gap-4 items-start sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Typography>Show</Typography>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="max-sm:is-full sm:is-[70px]"
          >
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="25">25</MenuItem>
            <MenuItem value="50">50</MenuItem>
          </CustomTextField>
          
          {/* Export Button */}
          <Button
            variant="tonal"
            startIcon={<i className="tabler-download" />}
            endIcon={<i className="tabler-chevron-down" />}
            onClick={handleExportMenuOpen}
            className="min-is-[140px] mis-4"
          >
            Export
          </Button>
        </div>
        
        <div className="flex gap-4 flex-col !items-start max-sm:is-full sm:flex-row sm:items-center">
          {/* Program Filter */}
          <CustomTextField
            select
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
            className="max-sm:is-full sm:is-[160px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Programs</MenuItem>
            {uniquePrograms.map((program) => (
              <MenuItem key={program} value={program}>
                {program}
              </MenuItem>
            ))}
          </CustomTextField>
          
          {/* Scope Filter */}
          {/* <CustomTextField
            select
            value={scopeFilter}
            onChange={(e) => setScopeFilter(e.target.value)}
            className="max-sm:is-full sm:is-[120px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Scopes</MenuItem>
            {uniqueScopes.map((scope) => (
              <MenuItem key={scope} value={scope}>
                {scope}
              </MenuItem>
            ))}
          </CustomTextField> */}
          
          {/* Mentor Filter */}
          <CustomTextField
            select
            value={mentorFilter}
            onChange={(e) => setMentorFilter(e.target.value)}
            className="max-sm:is-full sm:is-[160px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Mentors</MenuItem>
            {uniqueMentors.map((mentor) => (
              <MenuItem key={mentor} value={mentor}>
                {mentor}
              </MenuItem>
            ))}
          </CustomTextField>
          
          {/* Status Filter */}
          <CustomTextField
            select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="max-sm:is-full sm:is-[160px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            {uniqueStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status.replace("-", " ")}
              </MenuItem>
            ))}
          </CustomTextField>
          
          {/* Search Input */}
          <DebouncedInput
            value={globalFilter ?? ""}
            className="max-sm:is-full min-is-[250px]"
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search Results"
          />
        </div>
      </CardContent>

      {/* Table */}
      <div className="w-full">
        <div className="overflow-x-auto">
          <table 
            className={tableStyles.table} 
            style={{ 
              tableLayout: 'fixed',
              width: '100%',
              minWidth: '1070px' // Total of all column sizes: 280+160+180+90+110+160+130
            }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th 
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        maxWidth: header.getSize(),
                        minWidth: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={classnames({
                            "flex items-center": header.column.getIsSorted(),
                            "cursor-pointer select-none": header.column.getCanSort(),
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <i className="tabler-chevron-up text-xl" />,
                            desc: <i className="tabler-chevron-down text-xl" />,
                          }[header.column.getIsSorted() as "asc" | "desc"] ??
                            null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan={table.getVisibleFlatColumns().length}
                    className="text-center"
                  >
                    No survey results found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map((row) => (
                    <tr
                      key={row.id}
                      className={classnames({ selected: row.getIsSelected() })}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td 
                          key={cell.id}
                          style={{
                            width: cell.column.getSize(),
                            maxWidth: cell.column.getSize(),
                            minWidth: cell.column.getSize(),
                            overflow: 'hidden',
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      <TablePagination
        component={() => (
          <TablePaginationComponent table={table as Table<unknown>} />
        )}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page);
        }}
      />

      {/* Export Menu */}
      <Menu
        anchorEl={exportMenuAnchor}
        open={Boolean(exportMenuAnchor)}
        onClose={handleExportMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList>
          <MenuItem onClick={exportToCSV}>
            <ListItemIcon>
              <i className="tabler-file-type-csv text-lg" />
            </ListItemIcon>
            <ListItemText>Export as CSV</ListItemText>
          </MenuItem>
          <MenuItem onClick={exportToExcel}>
            <ListItemIcon>
              <i className="tabler-file-type-xls text-lg" />
            </ListItemIcon>
            <ListItemText>Export as Excel</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Card>
  );
};

export default SurveysResultsTable;
