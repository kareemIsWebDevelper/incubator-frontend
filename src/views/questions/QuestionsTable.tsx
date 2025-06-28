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

// Style Imports
import tableStyles from "@core/styles/table.module.css";
import { useParams } from "next/navigation";
import WarningDialog from "@/components/dialogs/WarningDialog";

// Type Imports
import { QuestionType } from "@/types/questionTypes";

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
const columnHelper = createColumnHelper<QuestionType>();

const QuestionsTable = ({
  questionsData,
  onEdit,
  onView,
}: {
  questionsData: Array<QuestionType>;
  onEdit: (question: QuestionType) => void;
  onView: (question: QuestionType) => void;
}) => {
  // Hooks
  const params = useParams();
  const { lang: locale } = params;

  // States
  const [data] = useState(questionsData);
  const [questionType, setQuestionType] = useState<string>("");
  const [questionGroup, setQuestionGroup] = useState<string>("");
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data?.filter((question) => {
      if (questionType && question.type !== questionType) return false;
      if (questionGroup && question.questionGroup !== questionGroup) return false;
      if (difficultyLevel && question.difficultyLevel !== difficultyLevel) return false;
      return true;
    });
    setFilteredData(filtered);
  }, [questionType, questionGroup, difficultyLevel, data]);

  // Helper function to truncate content
  const truncateContent = (content: string, maxLength: number = 60) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  // Helper function to get question type chip color
  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case "Multiple choice question":
        return "primary";
      case "True/false question":
        return "secondary";
      case "Short answer":
        return "info";
      case "Essay":
        return "warning";
      default:
        return "default";
    }
  };

  // Helper function to get difficulty level chip color
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "error";
      default:
        return "default";
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "Question Title",
        cell: ({ row }) => (
          <Typography className="font-medium w-48 whitespace-pre-wrap" color="text.primary">
            {truncateContent(row.original.title, 50)}
          </Typography>
        ),
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: ({ row }) => (
          <Chip
            variant="tonal"
            className="capitalize"
            label={row.original.type}
            size="small"
            color={getQuestionTypeColor(row.original.type) as any}
          />
        ),
      }),
      columnHelper.accessor("questionGroup", {
        header: "Group",
        cell: ({ row }) => (
          <Chip
            variant="outlined"
            className="capitalize"
            label={row.original.questionGroup}
            size="small"
          />
        ),
      }),
      columnHelper.accessor("questionCategory", {
        header: "Category",
        cell: ({ row }) => (
          <Typography color="text.primary" className="capitalize">
            {row.original.questionCategory}
          </Typography>
        ),
      }),
      columnHelper.accessor("difficultyLevel", {
        header: "Difficulty",
        cell: ({ row }) => (
          <Chip
            variant="tonal"
            className="capitalize"
            label={row.original.difficultyLevel}
            size="small"
            color={getDifficultyColor(row.original.difficultyLevel) as any}
          />
        ),
      }),
      // columnHelper.accessor("tags", {
      //   header: "Tags",
      //   cell: ({ row }) => (
      //     <div className="flex flex-wrap gap-1 max-w-48">
      //       {row.original.tags.slice(0, 2).map((tag, index) => (
      //         <Chip
      //           key={index}
      //           variant="outlined"
      //           label={tag}
      //           size="small"
      //           className="text-xs"
      //         />
      //       ))}
      //       {row.original.tags.length > 2 && (
      //         <Chip
      //           variant="outlined"
      //           label={`+${row.original.tags.length - 2}`}
      //           size="small"
      //           className="text-xs"
      //         />
      //       )}
      //     </div>
      //   ),
      // }),
      columnHelper.accessor("assignedOrganizations", {
        header: "Organizations",
        cell: ({ row }) => (
          <Typography color="text.primary" className="w-32">
            {row.original.assignedOrganizations.length > 0
              ? `${row.original.assignedOrganizations[0]}${
                  row.original.assignedOrganizations.length > 1
                    ? ` +${row.original.assignedOrganizations.length - 1}`
                    : ""
                }`
              : "None"}
          </Typography>
        ),
      }),
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: { original: QuestionType } }) => {
          const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
          const open = Boolean(anchorEl);

          const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
          };

          const handleClose = () => {
            setAnchorEl(null);
          };

          const handleView = () => {
            onView(row.original);
            handleClose();
          };

          const handleEdit = () => {
            onEdit(row.original);
            handleClose();
          };

          const handleDelete = () => {
            handleDeleteClick(row.original);
            handleClose();
          };

          return (
            <div className="mis-12">
              <IconButton
                size="small"
                onClick={handleClick}
                aria-controls={open ? 'actions-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <i className="tabler-dots-vertical text-textSecondary" />
              </IconButton>
              <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'actions-button',
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleView}>
                  <ListItemIcon>
                    <i className="tabler-eye text-textSecondary" />
                  </ListItemIcon>
                  <ListItemText>View</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleEdit}>
                  <ListItemIcon>
                    <i className="tabler-edit text-textSecondary" />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  <ListItemIcon>
                    <i className="tabler-trash text-textSecondary" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [onEdit, onView]
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

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(null);

  const confirmDelete = () => {
    if (selectedQuestion) {
      // Logic to delete the question
      setFilteredData((prev) =>
        prev.filter((question) => question.id !== selectedQuestion.id)
      );
      setOpenDeleteDialog(false);
      setSelectedQuestion(null);
    }
  };

  const handleDeleteClick = (question: QuestionType) => {
    setSelectedQuestion(question);
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    // Reset the selected question when the delete dialog is closed
    if (!openDeleteDialog) {
      setSelectedQuestion(null);
    }
  }, [openDeleteDialog]);

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
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="max-sm:is-full sm:is-[180px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Multiple choice question">Multiple Choice</MenuItem>
            <MenuItem value="True/false question">True/False</MenuItem>
            <MenuItem value="Short answer">Short Answer</MenuItem>
            <MenuItem value="Essay">Essay</MenuItem>
          </CustomTextField>
          <CustomTextField
            select
            value={questionGroup}
            onChange={(e) => setQuestionGroup(e.target.value)}
            className="max-sm:is-full sm:is-[140px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Groups</MenuItem>
            <MenuItem value="assessment">Assessment</MenuItem>
            <MenuItem value="quiz">Quiz</MenuItem>
            <MenuItem value="survey">Survey</MenuItem>
          </CustomTextField>
          <CustomTextField
            select
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            className="max-sm:is-full sm:is-[120px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </CustomTextField>
          <DebouncedInput
            value={globalFilter ?? ""}
            className="max-sm:is-full min-is-[250px]"
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search Questions"
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

      <WarningDialog
        type="Delete"
        title="Delete Question"
        message={`Are you sure you want to delete the question "${selectedQuestion?.title}"?`}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
      />
    </Card>
  );
};

export default QuestionsTable;
