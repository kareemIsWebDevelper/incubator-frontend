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
import WarningDialog from "@components/dialogs/WarningDialog";

// Style Imports
import tableStyles from "@core/styles/table.module.css";

// Types
import { SurveyType } from "@/types/surveyTypes";

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
const columnHelper = createColumnHelper<SurveyType>();

interface SurveysTableProps {
  surveysData: Array<SurveyType>;
  onEdit: (survey: SurveyType) => void;
  onView: (survey: SurveyType) => void;
  onDelete: (survey: SurveyType) => void;
  onManageQuestions: (survey: SurveyType) => void;
  onViewDetails: (survey: SurveyType) => void;
  onViewResults: (survey: SurveyType) => void;
}

const SurveysTable = ({
  surveysData,
  onEdit,
  onView,
  onDelete,
  onManageQuestions,
  onViewDetails,
  onViewResults,
}: SurveysTableProps) => {
  // States
  const [data, setData] = useState(surveysData || []);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState(data);
  const [organizationFilter, setOrganizationFilter] = useState<string>("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyType | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Update data when surveysData prop changes
  useEffect(() => {
    // Sort surveys by creation date (newest first) or by ID if createdAt is not available
    const sortedData = (surveysData || []).sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      // Fallback to ID comparison for newly created surveys
      return b.id.localeCompare(a.id);
    });
    setData(sortedData);
  }, [surveysData]);

  // Filter data based on selected filters
  useEffect(() => {
    const filtered = (data || []).filter((survey) => {
      if (
        organizationFilter &&
        survey.organization?.name !== organizationFilter
      )
        return false;
      return true;
    });
    setFilteredData(filtered);
  }, [organizationFilter, data]);

  // Get unique values for filters
  const uniqueOrganizations = useMemo(() => {
    return Array.from(
      new Set(
        (data || []).map((item) => item.organization?.name).filter(Boolean)
      )
    ).sort();
  }, [data]);

  // Helper function to get status chip color
  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "active":
  //       return "success";
  //     case "draft":
  //       return "warning";
  //     case "inactive":
  //       return "secondary";
  //     case "archived":
  //       return "error";
  //     default:
  //       return "default";
  //   }
  // };

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number = 30) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    survey: SurveyType
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSurvey(survey);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSurvey(null);
  };

  const handleEdit = () => {
    if (selectedSurvey) {
      onEdit(selectedSurvey);
      handleMenuClose();
    }
  };

  const handleDelete = () => {
    if (selectedSurvey) {
      setOpenDeleteDialog(true);
      handleMenuClose();
    }
  };

  const handleManageQuestions = () => {
    if (selectedSurvey) {
      onManageQuestions(selectedSurvey);
      handleMenuClose();
    }
  };

  const handleViewDetails = () => {
    if (selectedSurvey) {
      onViewDetails(selectedSurvey);
      handleMenuClose();
    }
  };

  const handleViewResults = () => {
    if (selectedSurvey) {
      onViewResults(selectedSurvey);
      handleMenuClose();
    }
  };

  const confirmDelete = () => {
    if (selectedSurvey) {
      onDelete(selectedSurvey);
      setOpenDeleteDialog(false);
      setSelectedSurvey(null);
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "Survey Title",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <Typography className="font-medium" color="text.primary">
                {truncateText(row.original.title, 40)}
              </Typography>
              {row.original.description && (
                <Typography variant="body2" color="text.secondary">
                  {truncateText(row.original.description, 50)}
                </Typography>
              )}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("organization", {
        header: "Organization",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.organization.name}
          </Typography>
        ),
      }),
      columnHelper.accessor("tags", {
        header: "Tags",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.tags.slice(0, 2).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))}
            {row.original.tags.length > 2 && (
              <Chip
                label={`+${row.original.tags.length - 2}`}
                size="small"
                variant="outlined"
              />
            )}
          </div>
        ),
      }),
      columnHelper.accessor("questions", {
        header: "Questions",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.questions.length} questions
          </Typography>
        ),
      }),
      // columnHelper.accessor("status", {
      //   header: "Status",
      //   cell: ({ row }) => (
      //     <Chip
      //       label={row.original.status}
      //       size="small"
      //       variant="outlined"
      //       color={getStatusColor(row.original.status) as any}
      //       sx={{ textTransform: "capitalize" }}
      //     />
      //   ),
      // }),
      columnHelper.accessor("totalResponses", {
        header: "Responses",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.totalResponses || 0}
          </Typography>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton
              size="small"
              onClick={(e) => handleMenuClick(e, row.original)}
            >
              <i className="tabler-dots-vertical text-[22px] text-textSecondary" />
            </IconButton>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    []
  );

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
        </div>

        <div className="flex gap-4 flex-col !items-start max-sm:is-full sm:flex-row sm:items-center">
          <CustomTextField
            select
            fullWidth
            id="organization-filter"
            value={organizationFilter}
            onChange={(e) => setOrganizationFilter(e.target.value)}
            className="min-is-[200px]"
            SelectProps={{
              displayEmpty: true,
            }}
          >
            <MenuItem value="">All Organizations</MenuItem>
            {uniqueOrganizations.map((org) => (
              <MenuItem key={org} value={org}>
                {org}
              </MenuItem>
            ))}
          </CustomTextField>
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search Surveys"
            className="min-is-[250px]"
          />
        </div>
      </CardContent>

      <div className="overflow-x-auto">
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          "flex items-center": header.column.getIsSorted(),
                          "cursor-pointer select-none":
                            header.column.getCanSort(),
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <Icon className="ms-1 tabler-chevron-up text-xl" />
                          ),
                          desc: (
                            <Icon className="ms-1 tabler-chevron-down text-xl" />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
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
                  No data available
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
                      <td key={cell.id}>
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

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
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
          <MenuItem onClick={handleViewDetails}>
            <ListItemIcon>
              <i className="tabler-eye text-[22px]" />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
          {/* <MenuItem onClick={handleViewResults}>
            <ListItemIcon>
              <i className="tabler-chart-bar text-[22px]" />
            </ListItemIcon>
            <ListItemText>See Survey Results</ListItemText>
          </MenuItem> */}
          <MenuItem onClick={handleManageQuestions}>
            <ListItemIcon>
              <i className="tabler-list text-[22px]" />
            </ListItemIcon>
            <ListItemText>Manage Questions</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <i className="tabler-edit text-[22px]" />
            </ListItemIcon>
            <ListItemText>Edit Survey</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <i className="tabler-trash text-[22px]" />
            </ListItemIcon>
            <ListItemText>Delete Survey</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Delete Dialog */}
      <WarningDialog
        type="Delete"
        title="Delete Survey"
        message={`Are you sure you want to delete the survey "${selectedSurvey?.title}"?`}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
      />
    </Card>
  );
};

export default SurveysTable;
