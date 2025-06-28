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

// Define the type for assessment rows
export type AssessmentType = {
  id: string;
  user_name: string;
  start_date: string;
  end_date: string;
  created_at: string;
  status: "completed" | "in-progress" | "pending";
};

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
const columnHelper = createColumnHelper<AssessmentType>();

const AssessmentsTable = ({
  assessmentsData,
  onEdit,
}: {
  assessmentsData: Array<AssessmentType>;
  onEdit: (assessment: AssessmentType) => void;
}) => {
  // Hooks
  const params = useParams();
  const { lang: locale } = params;

  // States
  const [data] = useState(assessmentsData);
  const [status, setStatus] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data?.filter((assessment) => {
      if (status && assessment.status !== status) return false;
      return true;
    });
    setFilteredData(filtered);
  }, [status, data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("user_name", {
        header: "User Name",
        cell: ({ row }) => (
          <Typography className="font-medium" color="text.primary">
            {row.original.user_name}
          </Typography>
        ),
      }),
      columnHelper.accessor("start_date", {
        header: "Start Date",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.start_date}
          </Typography>
        ),
      }),
      columnHelper.accessor("end_date", {
        header: "End Date",
        cell: ({ row }) => (
          <Typography color="text.primary">{row.original.end_date}</Typography>
        ),
      }),
      columnHelper.accessor("created_at", {
        header: "Created At",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.created_at}
          </Typography>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => (
          <Chip
            variant="tonal"
            className="capitalize"
            label={row.original.status}
            size="small"
            color={
              row.original.status === "completed"
                ? "success"
                : row.original.status === "in-progress"
                  ? "warning"
                  : "default"
            }
          />
        ),
      }),
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: { original: AssessmentType } }) => (
          <div className="flex items-center gap-2">
            <Tooltip title="Show">
              <IconButton size="small">
                <i className="tabler-eye text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" onClick={() => onEdit(row.original)}>
              <IconButton size="small">
                <i className="tabler-edit text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" onClick={() => handleDeleteClick(row.original)}>
              <IconButton size="small">
                <i className="tabler-trash text-textSecondary" />
              </IconButton>
            </Tooltip>
          </div>
        ),
        enableSorting: false,
      },
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
  const [selectedAssessment, setSelectedAssessment] =
    useState<AssessmentType | null>(null);

  const confirmDelete = () => {
    if (selectedAssessment) {
      // Logic to delete the assessment
      setFilteredData((prev) =>
        prev.filter((assessment) => assessment.id !== selectedAssessment.id)
      );
      setOpenDeleteDialog(false);
      setSelectedAssessment(null);
    }
  };

  const handleDeleteClick = (assessment: AssessmentType) => {
    setSelectedAssessment(assessment);
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    // Reset the selected assessment when the delete dialog is closed
    if (!openDeleteDialog) {
      setSelectedAssessment(null);
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="max-sm:is-full sm:is-[160px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </CustomTextField>
          <DebouncedInput
            value={globalFilter ?? ""}
            className="max-sm:is-full min-is-[250px]"
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search Assessments"
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
        title="Delete Assessment"
        message={`Are you sure you want to delete the assessment?`}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
      />
    </Card>
  );
};

export default AssessmentsTable;
