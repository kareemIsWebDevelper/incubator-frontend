"use client";

// React Imports
import React, { useState, useMemo, useEffect } from "react";

// TanStack Table Imports
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

// MUI Imports
import { Card, Tooltip } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { TablePagination } from "@mui/material";
import { Chip } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// Component Imports
import CustomTextField from "@core/components/mui/TextField";
import TablePaginationComponent from "@components/TablePaginationComponent";
import ScreeningDetailsDialog from "./ScreeningDetailsDialog";
import EditScreeningDialog from "./EditScreeningDialog";
import ScreeningResultDialog from "./ScreeningResultDialog";
import WarningDialog from "@components/dialogs/WarningDialog";
import OptionMenu from "@core/components/option-menu";

// Style Imports
import tableStyles from "@core/styles/table.module.css";
import classnames from "classnames";

// Type Imports
import { ScreeningType } from "@/types/screeningTypes";

interface ScreeningsTableProps {
  data: ScreeningType[];
  onDelete?: (id: string) => void;
  onUpdate?: (updatedScreening: ScreeningType) => void;
}

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

const ScreeningsTable: React.FC<ScreeningsTableProps> = ({
  data,
  onDelete,
  onUpdate,
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");

  // Dialog states
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [selectedScreening, setSelectedScreening] =
    useState<ScreeningType | null>(null);

  // Filter data based on filters
  const filteredData = useMemo(() => {
    return data.filter((screening) => {
      const statusMatch = !statusFilter || screening.status === statusFilter;
      const typeMatch = !typeFilter || screening.type === typeFilter;
      const programMatch =
        !programFilter ||
        screening.programName
          .toLowerCase()
          .includes(programFilter.toLowerCase());

      return statusMatch && typeMatch && programMatch;
    });
  }, [data, statusFilter, typeFilter, programFilter]);

  // Get unique values for filters
  const uniqueStatuses = useMemo(
    () => [...new Set(data.map((screening) => screening.status))],
    [data]
  );
  const uniqueTypes = useMemo(
    () => [...new Set(data.map((screening) => screening.type))],
    [data]
  );
  const uniquePrograms = useMemo(
    () => [...new Set(data.map((screening) => screening.programName))],
    [data]
  );

  // Reset filters function
  const resetFilters = () => {
    setStatusFilter("");
    setTypeFilter("");
    setProgramFilter("");
    setGlobalFilter("");
  };

  // Dialog handlers
  const handleView = (screening: ScreeningType) => {
    setSelectedScreening(screening);
    setViewDialogOpen(true);
  };

  const handleViewResults = (screening: ScreeningType) => {
    setSelectedScreening(screening);
    setResultDialogOpen(true);
  };

  const handleEdit = (screening: ScreeningType) => {
    setSelectedScreening(screening);
    setViewDialogOpen(false);
    setEditDialogOpen(true);
  };

  const handleDelete = (screening: ScreeningType) => {
    setSelectedScreening(screening);
    setDeleteDialogOpen(true);
  };

  const handleSaveEdit = (updatedScreening: ScreeningType) => {
    if (onUpdate) {
      onUpdate(updatedScreening);
    }
    setEditDialogOpen(false);
    setSelectedScreening(null);
  };

  const handleConfirmDelete = () => {
    if (selectedScreening && onDelete) {
      onDelete(selectedScreening.id);
    }
    setDeleteDialogOpen(false);
    setSelectedScreening(null);
  };

  const handleCloseDialogs = () => {
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setResultDialogOpen(false);
    setSelectedScreening(null);
  };

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "in-progress":
        return "info";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "one-to-all":
        return "One to All";
      case "group-to-group":
        return "Group to Group";
      case "group-to-all":
        return "Group to All";
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Table column helper
  const columnHelper = createColumnHelper<ScreeningType>();

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "Title (Current Step)",
        cell: ({ row }) => (
          <div>
            <Typography variant="body2" fontWeight="medium">
              {row.original.title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {row.original.stepTitle}
            </Typography>
          </div>
        ),
      }),
      columnHelper.accessor("programName", {
        header: "Program",
        cell: ({ row }) => (
          <Typography variant="body2">{row.original.programName}</Typography>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => (
          <Chip
            variant="tonal"
            label={row.original.status.replace("-", " ")}
            className="capitalize text-xs font-bold"
            color={getStatusColor(row.original.status) as any}
            size="small"
          />
        ),
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: ({ row }) => (
          <Chip
            label={getTypeLabel(row.original.type)}
            variant="outlined"
            size="small"
          />
        ),
      }),
      columnHelper.accessor("judgers", {
        header: "Judgers",
        cell: ({ row }) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {row.original.judgers.slice(0, 3).map((judger, index) => (
              <Tooltip key={index} title={judger}>
                <Avatar sx={{ width: 24, height: 24, fontSize: "0.7rem" }}>
                  {judger
                    .split(" ")
                    .map((name) => name.charAt(0))
                    .join("")
                    .slice(0, 1)
                    .toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
            {row.original.judgers.length > 3 && (
              <Tooltip
                title={`${row.original.judgers.length - 3} more judgers`}
              >
                <Avatar sx={{ width: 24, height: 24, fontSize: "0.7rem" }}>
                  +{row.original.judgers.length - 3}
                </Avatar>
              </Tooltip>
            )}
          </Box>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("startDate", {
        header: "Duration",
        cell: ({ row }) => (
          <div>
            <Typography variant="body2" fontWeight="medium">
              {formatDate(row.original.startDate)} -{" "}
              {formatDate(row.original.endDate)}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {(() => {
                const start = new Date(row.original.startDate);
                const end = new Date(row.original.endDate);
                const diffTime = Math.abs(end.getTime() - start.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
              })()}
            </Typography>
          </div>
        ),
      }),
      // columnHelper.accessor("evaluatedStartups", {
      //   header: "Progress",
      //   cell: ({ row }) => {
      //     const progress =
      //       (row.original.evaluatedStartups / row.original.totalStartups) * 100;
      //     const isCompleted = row.original.status === "completed";
      //     return (
      //       <Box
      //         sx={{
      //           display: "flex",
      //           alignItems: "center",
      //           gap: 1,
      //           minWidth: 140,
      //         }}
      //       >
      //         <LinearProgress
      //           variant="determinate"
      //           value={progress}
      //           color={
      //             isCompleted
      //               ? "success"
      //               : progress > 50
      //                 ? "primary"
      //                 : "warning"
      //           }
      //           sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
      //         />
      //         <Typography
      //           variant="caption"
      //           sx={{ minWidth: 45, fontWeight: "medium" }}
      //         >
      //           {row.original.evaluatedStartups}/{row.original.totalStartups}
      //         </Typography>
      //       </Box>
      //     );
      //   },
      // }),
      columnHelper.accessor("id", {
        header: "Actions",
        cell: ({ row }) => (
          <OptionMenu
            iconButtonProps={{ size: "small" }}
            iconClassName="text-textSecondary"
            options={[
              {
                text: "View Details",
                icon: "tabler-eye",
                menuItemProps: {
                  onClick: () => handleView(row.original),
                },
              },
              {
                text: "View Results",
                icon: "tabler-chart-bar",
                menuItemProps: {
                  onClick: () => handleViewResults(row.original),
                },
              },
              {
                text: "Edit",
                icon: "tabler-edit",
                menuItemProps: {
                  onClick: () => handleEdit(row.original),
                },
              },
              {
                text: "Delete",
                icon: "tabler-trash",
                menuItemProps: {
                  onClick: () => handleDelete(row.original),
                  sx: { color: "error.main" },
                },
              },
            ]}
          />
        ),
        enableSorting: false,
      }),
    ],
    [handleView, handleViewResults, handleEdit, handleDelete]
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
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <>
      {/* Summary Cards */}
      {/* <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total Screenings
            </Typography>
            <Typography variant="h4" component="div">
              {data.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              In Progress
            </Typography>
            <Typography variant="h4" component="div" color="info.main">
              {data.filter(s => s.status === 'in-progress').length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Completed
            </Typography>
            <Typography variant="h4" component="div" color="success.main">
              {data.filter(s => s.status === 'completed').length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Pending
            </Typography>
            <Typography variant="h4" component="div" color="warning.main">
              {data.filter(s => s.status === 'pending').length}
            </Typography>
          </CardContent>
        </Card>
      </Box> */}

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
            {/* Status Filter */}
            <CustomTextField
              select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="max-sm:is-full sm:is-[140px]"
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="">All Statuses</MenuItem>
              {uniqueStatuses.map((status) => (
                <MenuItem key={status} value={status} className="capitalize">
                  {status.replace("-", " ")}
                </MenuItem>
              ))}
            </CustomTextField>

            {/* Type Filter */}
            <CustomTextField
              select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="max-sm:is-full sm:is-[160px]"
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="">All Types</MenuItem>
              {uniqueTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {getTypeLabel(type)}
                </MenuItem>
              ))}
            </CustomTextField>

            {/* Program Filter */}
            <CustomTextField
              select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="max-sm:is-full sm:is-[200px]"
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="">All Programs</MenuItem>
              {uniquePrograms.map((program) => (
                <MenuItem key={program} value={program}>
                  {program}
                </MenuItem>
              ))}
            </CustomTextField>

            {/* Global Search */}
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search screenings..."
              className="max-sm:is-full sm:is-[250px]"
            />

            {/* Reset Filters Button */}
            {/* <Button
              variant="outlined"
              onClick={resetFilters}
              size="small"
              className="max-sm:is-full"
            >
              Reset Filters
            </Button> */}
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
      </Card>

      {/* View Dialog */}
      <ScreeningDetailsDialog
        open={viewDialogOpen}
        onClose={handleCloseDialogs}
        screening={selectedScreening}
        onEdit={handleEdit}
      />

      {/* Results Dialog */}
      <ScreeningResultDialog
        open={resultDialogOpen}
        onClose={handleCloseDialogs}
        screening={selectedScreening}
      />

      {/* Edit Dialog */}
      <EditScreeningDialog
        open={editDialogOpen}
        onClose={handleCloseDialogs}
        screening={selectedScreening}
        onSave={handleSaveEdit}
      />

      {/* Delete Confirmation Dialog */}
      <WarningDialog
        type="Delete"
        title="Delete Screening"
        message={`Are you sure you want to delete the screening "${selectedScreening?.title}"? This action cannot be undone.`}
        open={deleteDialogOpen}
        onClose={handleCloseDialogs}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ScreeningsTable;
