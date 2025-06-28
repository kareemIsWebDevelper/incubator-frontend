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
import { 
  Card, 
  Tooltip, 
  CardContent, 
  Typography, 
  TablePagination, 
  Chip, 
  MenuItem, 
  Box, 
  Avatar,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  ListItemText
} from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// Component Imports
import CustomTextField from "@core/components/mui/TextField";
import TablePaginationComponent from "@components/TablePaginationComponent";
import OptionMenu from "@core/components/option-menu";
import AssignJudgersDialog from "./AssignJudgersDialog";
import StartupDetailsDialog from "./StartupDetailsDialog";
import EvaluationDetailsDialog from "./EvaluationDetailsDialog";
import AddSessionDialog from "./AddSessionDialog";
import WarningDialog from "@components/dialogs/WarningDialog";

// Style Imports
import tableStyles from "@core/styles/table.module.css";
import classnames from "classnames";

// Type Imports
import { FinalScreeningStartupType, JudgerAssignmentType } from "@/types/finalScreeningTypes";

interface FinalScreeningTableProps {
  data: FinalScreeningStartupType[];
  judgers: string[];
  onAssignJudgers?: (assignments: JudgerAssignmentType[]) => void;
  onUpdate?: (updatedStartup: FinalScreeningStartupType) => void;
  onDelete?: (startupId: string) => void;
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

const FinalScreeningTable: React.FC<FinalScreeningTableProps> = ({
  data,
  judgers,
  onAssignJudgers,
  onUpdate,
  onDelete,
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [stepFilter, setStepFilter] = useState("");
  const [bulkJudgerSelection, setBulkJudgerSelection] = useState<string[]>([]);
  const [showBulkAssignment, setShowBulkAssignment] = useState(false);
  const [assignJudgersDialogOpen, setAssignJudgersDialogOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<FinalScreeningStartupType | null>(null);
  const [startupDetailsDialogOpen, setStartupDetailsDialogOpen] = useState(false);
  const [evaluationDetailsDialogOpen, setEvaluationDetailsDialogOpen] = useState(false);
  const [addSessionDialogOpen, setAddSessionDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Filter data based on filters
  const filteredData = useMemo(() => {
    return data.filter((startup) => {
      const sectorMatch = !sectorFilter || startup.sector === sectorFilter;
      const statusMatch = !statusFilter || startup.evaluationStatus === statusFilter;
      const programMatch = !programFilter || startup.currentProgram === programFilter;
      const stepMatch = !stepFilter || startup.currentStep === stepFilter;

      return sectorMatch && statusMatch && programMatch && stepMatch;
    });
  }, [data, sectorFilter, statusFilter, programFilter, stepFilter]);

  // Get unique values for filters
  const uniqueSectors = useMemo(
    () => [...new Set(data.map((startup) => startup.sector))],
    [data]
  );
  const uniqueStatuses = useMemo(
    () => [...new Set(data.map((startup) => startup.evaluationStatus))],
    [data]
  );
  const uniquePrograms = useMemo(
    () => [...new Set(data.map((startup) => startup.currentProgram).filter(Boolean))],
    [data]
  );
  const uniqueSteps = useMemo(
    () => [...new Set(data.map((startup) => startup.currentStep).filter(Boolean))],
    [data]
  );

  // Reset filters function
  const resetFilters = () => {
    setSectorFilter("");
    setStatusFilter("");
    setProgramFilter("");
    setStepFilter("");
    setGlobalFilter("");
  };

  // Bulk assignment handlers
  const handleBulkAssignJudgers = () => {
    if (bulkJudgerSelection.length === 0) return;

    const selectedStartupIds = Object.keys(rowSelection).filter(
      (key) => rowSelection[key as keyof typeof rowSelection]
    );

    if (selectedStartupIds.length === 0) return;

    const assignments: JudgerAssignmentType[] = selectedStartupIds.map((startupId) => ({
      startupId,
      judgerIds: bulkJudgerSelection,
    }));

    if (onAssignJudgers) {
      onAssignJudgers(assignments);
    }

    // Reset selection
    setRowSelection({});
    setBulkJudgerSelection([]);
    setShowBulkAssignment(false);
  };

  const handleIndividualJudgerAssignment = (startupId: string, judgerIds: string[]) => {
    const assignments: JudgerAssignmentType[] = [{
      startupId,
      judgerIds,
    }];

    if (onAssignJudgers) {
      onAssignJudgers(assignments);
    }
  };

  const handleOpenAssignDialog = (startup: FinalScreeningStartupType) => {
    setSelectedStartup(startup);
    setAssignJudgersDialogOpen(true);
  };

  const handleCloseAssignDialog = () => {
    setAssignJudgersDialogOpen(false);
    setSelectedStartup(null);
  };

  const handleAssignDialogSubmit = (judgerIds: string[]) => {
    if (selectedStartup) {
      handleIndividualJudgerAssignment(selectedStartup.id, judgerIds);
    }
  };

  const handleOpenDetailsDialog = (startup: FinalScreeningStartupType) => {
    setSelectedStartup(startup);
    setStartupDetailsDialogOpen(true);
  };

  const handleCloseDetailsDialog = () => {
    setStartupDetailsDialogOpen(false);
    setSelectedStartup(null);
  };

  const handleOpenAssignFromDetails = () => {
    setStartupDetailsDialogOpen(false);
    setAssignJudgersDialogOpen(true);
  };

  const handleOpenEvaluationDialog = (startup: FinalScreeningStartupType) => {
    setSelectedStartup(startup);
    setEvaluationDetailsDialogOpen(true);
  };

  const handleCloseEvaluationDialog = () => {
    setEvaluationDetailsDialogOpen(false);
    setSelectedStartup(null);
  };

  const handleOpenAddSessionDialog = (startup: FinalScreeningStartupType) => {
    setSelectedStartup(startup);
    setAddSessionDialogOpen(true);
  };

  const handleCloseAddSessionDialog = () => {
    setAddSessionDialogOpen(false);
    setSelectedStartup(null);
  };

  const handleAddSessionSubmit = (sessionData: any) => {
    console.log("Creating session for startup:", selectedStartup?.name, "with data:", sessionData);
    // Here you would typically make an API call to create the session
    // For now, we'll just log the data
  };

  const handleOpenDeleteDialog = (startup: FinalScreeningStartupType) => {
    setSelectedStartup(startup);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedStartup(null);
  };

  const handleConfirmDelete = () => {
    if (selectedStartup && onDelete) {
      // Call the delete handler passed from parent
      onDelete(selectedStartup.id);
      console.log("Deleting startup:", selectedStartup.name);
    }
    setDeleteDialogOpen(false);
    setSelectedStartup(null);
  };

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "not-started":
        return "default";
      case "in-progress":
        return "info";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "not-started":
        return "Not Started";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  // Table column helper
  const columnHelper = createColumnHelper<FinalScreeningStartupType>();

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      }),
      columnHelper.accessor("name", {
        header: "Startup",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar
              src={row.original.logo}
              alt={row.original.name}
              sx={{ width: 40, height: 40 }}
            >
              {row.original.name.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <Typography variant="body2" fontWeight="medium">
                {row.original.name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {row.original.sector}
              </Typography>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("founders", {
        header: "Founders",
        cell: ({ row }) => (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {row.original.founders.slice(0, 2).map((founder, index) => (
              <Typography key={index} variant="body2">
                {founder}
              </Typography>
            ))}
            {row.original.founders.length > 2 && (
              <Typography variant="caption" color="textSecondary">
                +{row.original.founders.length - 2} more
              </Typography>
            )}
          </Box>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("assignedJudgers", {
        header: "Assigned Judgers",
        cell: ({ row }) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {row.original.assignedJudgers.length === 0 ? (
              <Typography variant="caption" color="textSecondary">
                No judgers assigned
              </Typography>
            ) : (
              <>
                {row.original.assignedJudgers.slice(0, 3).map((judger, index) => (
                  <Tooltip key={index} title={judger}>
                    <Avatar sx={{ width: 30, height: 30, fontSize: "0.7rem", marginInlineEnd: 1 }}>
                      {judger
                        .split(" ")
                        .map((name) => name.charAt(0))
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
                {row.original.assignedJudgers.length > 3 && (
                  <Tooltip
                    title={`${row.original.assignedJudgers.length - 3} more judgers`}
                  >
                    <Avatar sx={{ width: 24, height: 24, fontSize: "0.7rem" }}>
                      +{row.original.assignedJudgers.length - 3}
                    </Avatar>
                  </Tooltip>
                )}
              </>
            )}
          </Box>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("evaluationStatus", {
        header: "Status",
        cell: ({ row }) => (
          <Chip
            variant="tonal"
            label={getStatusLabel(row.original.evaluationStatus)}
            className="capitalize text-xs font-bold"
            color={getStatusColor(row.original.evaluationStatus) as any}
            size="small"
          />
        ),
      }),
      columnHelper.accessor("finalScore", {
        header: "Score",
        cell: ({ row }) => (
          <div>
            {row.original.finalScore !== undefined ? (
              <Typography variant="body2" fontWeight="medium">
                {row.original.finalScore.toFixed(1)}
              </Typography>
            ) : (
              <Typography variant="caption" color="textSecondary">
                Not evaluated
              </Typography>
            )}
          </div>
        ),
      }),
      // columnHelper.accessor("rank", {
      //   header: "Rank",
      //   cell: ({ row }) => (
      //     <div>
      //       {row.original.rank !== undefined ? (
      //         <Chip
      //           label={`#${row.original.rank}`}
      //           variant="outlined"
      //           size="small"
      //           color="primary"
      //         />
      //       ) : (
      //         <Typography variant="caption" color="textSecondary">
      //           Not ranked
      //         </Typography>
      //       )}
      //     </div>
      //   ),
      // }),
      columnHelper.accessor("currentProgram", {
        header: "Current Program & Step",
        cell: ({ row }) => (
          <div>
            {row.original.currentProgram && row.original.currentStep ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Chip
                  label={row.original.currentProgram}
                  variant="outlined"
                  size="small"
                  color="primary"
                  sx={{ alignSelf: "flex-start" }}
                />
                <Typography variant="caption" color="textSecondary">
                  {row.original.currentStep}
                </Typography>
              </Box>
            ) : (
              <Typography variant="caption" color="textSecondary">
                Not assigned
              </Typography>
            )}
          </div>
        ),
      }),
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
                  onClick: () => handleOpenDetailsDialog(row.original),
                },
              },
              {
                text: "Assign Judgers",
                icon: "tabler-user-plus",
                menuItemProps: {
                  onClick: () => handleOpenAssignDialog(row.original),
                },
              },
              {
                text: "View Evaluation",
                icon: "tabler-chart-bar",
                menuItemProps: {
                  onClick: () => handleOpenEvaluationDialog(row.original),
                },
              },
              {
                text: "Add Session",
                icon: "tabler-calendar-plus",
                menuItemProps: {
                  onClick: () => handleOpenAddSessionDialog(row.original),
                  disabled: row.original.assignedJudgers.length === 0,
                },
              },
              {
                text: "Delete",
                icon: "tabler-trash",
                menuItemProps: {
                  onClick: () => handleOpenDeleteDialog(row.original),
                  className: "text-error",
                },
              },
            ]}
          />
        ),
        enableSorting: false,
      }),
    ],
    [handleOpenDetailsDialog, handleOpenAssignDialog, handleOpenEvaluationDialog, handleOpenAddSessionDialog, handleOpenDeleteDialog]
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

  const selectedRowCount = Object.keys(rowSelection).filter(
    (key) => rowSelection[key as keyof typeof rowSelection]
  ).length;

  return (
    <>
      {/* Bulk Assignment Section */}
      {selectedRowCount > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <Typography variant="h6">
                {selectedRowCount} startup{selectedRowCount > 1 ? 's' : ''} selected
              </Typography>
              <div className="flex items-center gap-2">
                {!showBulkAssignment ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<i className="tabler-users" />}
                    onClick={() => setShowBulkAssignment(true)}
                  >
                    Assign Judgers
                  </Button>
                ) : (
                  <>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                      <InputLabel>Select Judgers</InputLabel>
                      <Select
                        // size="small"
                        multiple
                        value={bulkJudgerSelection}
                        onChange={(e) => setBulkJudgerSelection(e.target.value as string[])}
                        input={<OutlinedInput label="Select Judgers" />}
                        renderValue={(selected) => `${selected.length} judgers selected`}
                      >
                        {judgers.map((judger) => (
                          <MenuItem key={judger} value={judger}>
                            <Checkbox checked={bulkJudgerSelection.indexOf(judger) > -1} />
                            <ListItemText primary={judger} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBulkAssignJudgers}
                      disabled={bulkJudgerSelection.length === 0}
                    >
                      Assign
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowBulkAssignment(false);
                        setBulkJudgerSelection([]);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
            {/* Sector Filter */}
            <CustomTextField
              select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="max-sm:is-full sm:is-[140px]"
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="">All Sectors</MenuItem>
              {uniqueSectors.map((sector) => (
                <MenuItem key={sector} value={sector}>
                  {sector}
                </MenuItem>
              ))}
            </CustomTextField>

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
                <MenuItem key={status} value={status}>
                  {getStatusLabel(status)}
                </MenuItem>
              ))}
            </CustomTextField>

            {/* Program Filter */}
            <CustomTextField
              select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="max-sm:is-full sm:is-[140px]"
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="">All Programs</MenuItem>
              {uniquePrograms.map((program) => (
                <MenuItem key={program} value={program}>
                  {program}
                </MenuItem>
              ))}
            </CustomTextField>

            {/* Step Filter */}
            <CustomTextField
              select
              value={stepFilter}
              onChange={(e) => setStepFilter(e.target.value)}
              className="max-sm:is-full sm:is-[140px]"
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="">All Steps</MenuItem>
              {uniqueSteps.map((step) => (
                <MenuItem key={step} value={step}>
                  {step}
                </MenuItem>
              ))}
            </CustomTextField>

            {/* Global Search */}
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search startups..."
              className="max-sm:is-full sm:is-[250px]"
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

      {/* Assign Judgers Dialog */}
      <AssignJudgersDialog
        open={assignJudgersDialogOpen}
        onClose={handleCloseAssignDialog}
        onSubmit={handleAssignDialogSubmit}
        startup={selectedStartup}
        judgers={judgers}
      />

      {/* Startup Details Dialog */}
      <StartupDetailsDialog
        open={startupDetailsDialogOpen}
        onClose={handleCloseDetailsDialog}
        startup={selectedStartup}
        onAssignJudgers={handleOpenAssignFromDetails}
        onViewEvaluation={() => handleOpenEvaluationDialog(selectedStartup!)}
      />

      {/* Evaluation Details Dialog */}
      <EvaluationDetailsDialog
        open={evaluationDetailsDialogOpen}
        onClose={handleCloseEvaluationDialog}
        startup={selectedStartup}
      />

      {/* Add Session Dialog */}
      <AddSessionDialog
        open={addSessionDialogOpen}
        onClose={handleCloseAddSessionDialog}
        onSubmit={handleAddSessionSubmit}
        startup={selectedStartup}
      />

      {/* Delete Confirmation Dialog */}
      <WarningDialog
        type="Delete"
        title="Delete Startup"
        message={`Are you sure you want to delete "${selectedStartup?.name}" from the final screening? This action cannot be undone.`}
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default FinalScreeningTable;
