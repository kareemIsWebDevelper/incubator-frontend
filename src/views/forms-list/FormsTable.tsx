import { FormsType } from "@/types/apps/formsTypes";
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
const columnHelper = createColumnHelper<FormsType>();

const FormsTable = ({ formsData }: { formsData: Array<FormsType> }) => {
  // Hooks
  const params = useParams();
  const { lang: locale } = params;

  // States
  const [data] = useState(formsData);
  const [status, setStatus] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [organization, setOrganization] = useState<string>("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data?.filter((form) => {
      if (status && form.status !== status) return false;
      if (organization && form.assigned_organization !== organization)
        return false;
      return true;
    });
    setFilteredData(filtered);
  }, [status, organization, data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("form_name", {
        header: "Form Name",
        cell: ({ row }) => (
          <Typography className="font-medium" color="text.primary">
            {row.original.form_name}
          </Typography>
        ),
      }),
      columnHelper.accessor("assigned_organization", {
        header: "Organization",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.assigned_organization}
          </Typography>
        ),
      }),
      columnHelper.accessor("submissions", {
        header: "Submissions",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.submissions}
          </Typography>
        ),
      }),
      columnHelper.accessor("last_modified", {
        header: "Last Modified",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.last_modified}
          </Typography>
        ),
      }),
      columnHelper.accessor("created_date", {
        header: "Created Date",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.created_date}
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
            color={row.original.status === "active" ? "success" : "warning"}
          />
        ),
      }),
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: { original: FormsType } }) => (
          <div className="flex items-center gap-2">
            <Tooltip title="Copy">
              <IconButton size="small">
                <i className="tabler-copy text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton size="small">
                <i className="tabler-edit text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small">
                <i className="tabler-trash text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Submissions">
              <IconButton size="small" href={`/${locale}/submissions`}>
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="max-sm:is-full sm:is-[160px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </CustomTextField>
          <CustomTextField
            select
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="max-sm:is-full sm:is-[200px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Organizations</MenuItem>
            <MenuItem value="HR Department">HR Department</MenuItem>
            <MenuItem value="Marketing Team">Marketing Team</MenuItem>
            <MenuItem value="Safety Department">Safety Department</MenuItem>
            <MenuItem value="Training Team">Training Team</MenuItem>
            <MenuItem value="Project Management">Project Management</MenuItem>
            <MenuItem value="Customer Support">Customer Support</MenuItem>
            <MenuItem value="Sales Team">Sales Team</MenuItem>
          </CustomTextField>
          <DebouncedInput
            value={globalFilter ?? ""}
            className="max-sm:is-full min-is-[250px]"
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search Forms"
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

export default FormsTable;
