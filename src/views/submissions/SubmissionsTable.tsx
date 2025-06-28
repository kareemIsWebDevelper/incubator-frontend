"use client";

import { FormSubmissionType } from "@/types/apps/formsTypes";
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
const columnHelper = createColumnHelper<FormSubmissionType>();

const SubmissionsTable = ({
  submissions,
}: {
  submissions: FormSubmissionType[];
}) => {
  // States
  const [data] = useState(submissions);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState(data);
  const [organization, setOrganization] = useState<string>("");
  const [program, setProgram] = useState<string>("");
  const [startup, setStartup] = useState<string>("");

  // Get unique values for filters
  const uniqueOrganizations = useMemo(() => {
    return Array.from(
      new Set(data.map((item) => item.organization_name))
    ).sort();
  }, [data]);

  const uniquePrograms = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.program_name))).sort();
  }, [data]);

  const uniqueStartups = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.startup_name))).sort();
  }, [data]);

  useEffect(() => {
    const filtered = data?.filter((submission) => {
      if (organization && submission.organization_name !== organization)
        return false;
      if (program && submission.program_name !== program) return false;
      if (startup && submission.startup_name !== startup) return false;
      return true;
    });
    setFilteredData(filtered);
  }, [organization, program, startup, data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("submission_id", {
        header: "Submission ID",
        cell: ({ row }) => (
          <Typography className="font-medium" color="text.primary">
            {row.original.submission_id}
          </Typography>
        ),
      }),
      columnHelper.accessor("submitted_by", {
        header: "Submitted By",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.submitted_by}
          </Typography>
        ),
      }),
      columnHelper.accessor("startup_name", {
        header: "Startup",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.startup_name}
          </Typography>
        ),
      }),
      columnHelper.accessor("organization_name", {
        header: "Organization",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.organization_name}
          </Typography>
        ),
      }),
      columnHelper.accessor("program_name", {
        header: "Program",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.program_name}
          </Typography>
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
      columnHelper.accessor("step_name", {
        header: "Step",
        cell: ({ row }) => (
          <Typography color="text.primary">{row.original.step_name}</Typography>
        ),
      }),
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: { original: FormSubmissionType } }) => (
          <div className="flex items-center gap-2">
            <Tooltip title="View">
              <IconButton size="small">
                <i className="tabler-eye text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton size="small">
                <i className="tabler-download text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small">
                <i className="tabler-trash text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="More">
              <IconButton size="small">
                <i className="tabler-menu-2 text-textSecondary" />
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
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="max-sm:is-full sm:is-[200px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Organizations</MenuItem>
            {uniqueOrganizations.map((org) => (
              <MenuItem key={org} value={org}>
                {org}
              </MenuItem>
            ))}
          </CustomTextField>
          <CustomTextField
            select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="max-sm:is-full sm:is-[200px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Programs</MenuItem>
            {uniquePrograms.map((prog) => (
              <MenuItem key={prog} value={prog}>
                {prog}
              </MenuItem>
            ))}
          </CustomTextField>
          <CustomTextField
            select
            value={startup}
            onChange={(e) => setStartup(e.target.value)}
            className="max-sm:is-full sm:is-[200px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Startups</MenuItem>
            {uniqueStartups.map((start) => (
              <MenuItem key={start} value={start}>
                {start}
              </MenuItem>
            ))}
          </CustomTextField>
          <DebouncedInput
            value={globalFilter ?? ""}
            className="max-sm:is-full min-is-[250px]"
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search Submissions"
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
  );
};

export default SubmissionsTable;
