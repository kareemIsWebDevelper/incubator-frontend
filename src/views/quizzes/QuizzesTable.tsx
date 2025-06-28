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
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import type { RankingInfo } from "@tanstack/match-sorter-utils";
import {
  Card,
  CardContent,
  Typography,
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
import QuestionManagerDialog from "./QuestionManagerDialog";

// Style Imports
import tableStyles from "@core/styles/table.module.css";

// Types
import { QuizType } from "@/types/quizTypes";
import moment from "moment";

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
const columnHelper = createColumnHelper<QuizType>();

interface QuizzesTableProps {
  quizzesData: Array<QuizType>;
  onEdit: (quiz: QuizType) => void;
  onDelete: (quiz: QuizType) => void;
}

const QuizzesTable = ({ quizzesData, onEdit, onDelete }: QuizzesTableProps) => {
  // States
  const [data, setData] = useState(quizzesData || []);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState(data);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [organizationFilter, setOrganizationFilter] = useState<string>("");
  const [pageSize, setPageSize] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openQuestionManager, setOpenQuestionManager] = useState(false);

  // Update data when quizzesData prop changes
  useEffect(() => {
    if (Array.isArray(quizzesData)) {
      const sortedData = quizzesData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return b.id.localeCompare(a.id);
      });
      setData(sortedData);
      console.log("Updated quizzes data:", sortedData.length, "items");
    } else {
      setData([]);
    }
  }, [quizzesData]);

  // Filter data based on selected filters
  useEffect(() => {
    const filtered = data?.filter((quiz) => {
      if (statusFilter && quiz.status !== statusFilter) return false;
      if (organizationFilter && quiz.organization?.name !== organizationFilter)
        return false;
      return true;
    }) || [];
    setFilteredData(filtered);
  }, [statusFilter, organizationFilter, data]);

  // Helper function to get status chip color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      default:
        return "default";
    }
  };

  // Handle menu click
  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    quiz: QuizType
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedQuiz(quiz);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    // Don't clear selectedQuiz here as it might be needed for delete dialog
  };

  // Handle edit
  const handleEdit = () => {
    if (selectedQuiz) {
      onEdit(selectedQuiz);
    } else {
      console.error("No quiz selected for editing");
    }
    handleMenuClose();
    // Clear selected quiz after edit
    setSelectedQuiz(null);
  };

  // Handle delete dialog open
  const handleDeleteClick = () => {
    if (selectedQuiz) {
      console.log("Opening delete dialog for quiz:", selectedQuiz.id, selectedQuiz.title);
      setOpenDeleteDialog(true);
    } else {
      console.error("No quiz selected for deletion");
    }
    handleMenuClose();
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (selectedQuiz) {
      console.log("Deleting quiz:", selectedQuiz.id);
      onDelete(selectedQuiz);
    } else {
      console.error("No quiz selected for deletion confirmation");
    }
    // Always close dialog and reset state
    setOpenDeleteDialog(false);
    setSelectedQuiz(null);
  };

  // Handle manage questions
  const handleManageQuestions = () => {
    if (selectedQuiz) {
      console.log("Managing questions for quiz:", selectedQuiz.id, selectedQuiz.title);
      setOpenQuestionManager(true);
    } else {
      console.error("No quiz selected for question management");
    }
    handleMenuClose();
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "Title & Description",
        size: 250,
        cell: ({ row }) => (
          <div className="flex flex-col min-w-0 max-w-[280px]">
            <Typography
              className="font-medium truncate"
              color="text.primary"
              title={row.original.title}
            >
              {row.original.title}
            </Typography>
            {row.original.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                className="line-clamp-2 text-xs leading-tight"
                title={row.original.description}
              >
                {row.original.description.length > 80
                  ? `${row.original.description.substring(0, 80)}...`
                  : row.original.description}
              </Typography>
            )}
          </div>
        ),
      }),
      columnHelper.accessor("organization", {
        header: "Organization",
        size: 180,
        cell: ({ row }) => (
          <Typography
            variant="body2"
            className="font-medium truncate"
            color="text.primary"
            title={row.original.organization?.name || "N/A"}
          >
            {row.original.organization?.name || "N/A"}
          </Typography>
        ),
      }),
      columnHelper.accessor("program", {
        header: "Program",
        size: 180,
        cell: ({ row }) => (
          <Typography
            variant="body2"
            className="font-medium truncate"
            color="text.primary"
            title={row.original.program?.name || "N/A"}
          >
            {row.original.program?.name || "N/A"}
          </Typography>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        size: 120,
        cell: ({ row }) => (
          <Chip
            variant="tonal"
            className="capitalize"
            label={row.original.status}
            size="small"
            color={getStatusColor(row.original.status) as any}
          />
        ),
      }),
      columnHelper.accessor("startDate", {
        header: "Duration",
        size: 170,
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <i className="tabler-calendar-event text-xl text-textSecondary" />
              <Typography
                variant="body2"
                color="text.primary"
                className="whitespace-nowrap"
              >
                {row.original.startDate
                  ? moment(row.original.startDate).format("MMM D, YYYY HH:mm")
                  : "N/A"}
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <i className="tabler-calendar-check text-xl text-textSecondary" />
              <Typography
                variant="body2"
                color="text.secondary"
                className="whitespace-nowrap"
              >
                {row.original.endDate
                  ? moment(row.original.endDate).format("MMM D, YYYY HH:mm")
                  : "Ongoing"}
              </Typography>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("participants", {
        header: "Participants",
        size: 110,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <i className="tabler-users text-xl text-textSecondary" />
            <Typography className="font-medium" color="text.primary">
              {row.original.participants}
            </Typography>
          </div>
        ),
      }),
      columnHelper.accessor("passPercentage", {
        header: "Pass %",
        size: 80,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Typography className="font-medium" color="text.primary">
              {row.original.passPercentage}%
            </Typography>
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        size: 90,
        cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton
              size="small"
              onClick={(e) => handleMenuClick(e, row.original)}
            >
              <i className="tabler-dots-vertical text-[22px]" />
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
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex: 0, pageSize });
        setPageSize(newState.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: false,
    // Ensure table re-renders when data changes
    autoResetPageIndex: false,
  });

  // Get unique organizations for filter
  const uniqueOrganizations = Array.from(
    new Set(
      data
        .filter((quiz) => quiz.organization?.name)
        .map((quiz) => quiz.organization.name)
    )
  );

  return (
    <>
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
          <div className="flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-y-2 sm:gap-x-3">
            <CustomTextField
              select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="max-sm:is-full sm:is-[140px]"
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
            </CustomTextField>
            <CustomTextField
              select
              value={organizationFilter}
              onChange={(e) => setOrganizationFilter(e.target.value)}
              className="max-sm:is-full sm:is-[180px]"
              SelectProps={{ displayEmpty: true }}
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
              className="max-sm:is-full min-is-[250px]"
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search Quizzes"
            />
          </div>
        </CardContent>
        <div className="overflow-x-auto">
          <table className={`${tableStyles.table} min-w-full table-fixed`}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ width: header.column.getSize() }}
                      className="text-left"
                    >
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
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map((row) => (
                  <tr
                    key={row.id}
                    className={classnames({
                      selected: row.getIsSelected(),
                    })}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className="align-top"
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
          </table>
        </div>
        <TablePaginationComponent table={table} />
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          handleMenuClose();
          // Clear selected quiz when menu closes without action
          if (!openDeleteDialog && !openQuestionManager) {
            setSelectedQuiz(null);
          }
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // Ensure menu closes properly
        disableRestoreFocus
      >
        <MenuList>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <i className="tabler-edit text-[22px]" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleManageQuestions}>
            <ListItemIcon>
              <i className="tabler-list-check text-[22px]" />
            </ListItemIcon>
            <ListItemText>Manage Questions</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} className="text-error">
            <ListItemIcon>
              <i className="tabler-trash text-[22px] text-error" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Delete Warning Dialog */}
      <WarningDialog
        type="Delete"
        title="Delete Quiz"
        message={`Are you sure you want to delete "${selectedQuiz?.title}"? This action cannot be undone.`}
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setSelectedQuiz(null); // Clear selected quiz when dialog is closed
        }}
        onConfirm={handleDeleteConfirm}
      />

      {/* Question Manager Dialog */}
      <QuestionManagerDialog
        open={openQuestionManager}
        setOpen={(open) => {
          setOpenQuestionManager(open);
          // Clear selected quiz when dialog closes
          if (!open) {
            setSelectedQuiz(null);
          }
        }}
        quiz={selectedQuiz}
      />
    </>
  );
};

export default QuizzesTable;
