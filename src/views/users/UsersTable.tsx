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
import { useParams } from "next/navigation";
import { UserType } from "@/types/UserTypes";

// Util Imports
import { getInitials } from "@/utils/getInitials";

// Use ExtendedUserType for this component
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
const columnHelper = createColumnHelper<UserType>();

const UsersTable = ({ usersData, onEdit }: { usersData: Array<UserType>; onEdit: (user: UserType) => void }) => {
  // Hooks
  const params = useParams();
  const { lang: locale } = params;

  // States
  const [data, setData] = useState(usersData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [gender, setGender] = useState<string>("");
  const [hasCompany, setHasCompany] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (usersData) {
      setData(usersData);
      // setFilteredData(usersData);
    }
  }, [usersData]);

  const handleDelete = (userId: number) => {
    // Filter out the user with the given ID
    const updatedData = data.filter(user => user.id !== userId);
    setData(updatedData);
    // Also update filteredData to reflect changes immediately
    setFilteredData(filteredData.filter(user => user.id !== userId));
  };

  useEffect(() => {
    const filtered = data?.filter((user) => {
      if (gender && user.gender !== gender) return false;
      if (
        hasCompany &&
        ((hasCompany === "yes" && !user.hasCompany) ||
          (hasCompany === "no" && user.hasCompany))
      )
        return false;
      if (role && user.role !== role) return false;
      return true;
    });
    setFilteredData(filtered);
  }, [gender, hasCompany, role, data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "User",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <CustomAvatar 
              src={row.original.image || ''} 
              size={40}
              alt={row.original.name}
            >
              {!row.original.image ? getInitials(row.original.name) : null}
            </CustomAvatar>
            <Typography className="font-medium" color="text.primary">
              {row.original.name}
            </Typography>
          </div>
        ),
      }),
      columnHelper.accessor("gender", {
        header: "Gender",
        cell: ({ row }) => (
          <Typography color="text.primary">{row.original.gender}</Typography>
        ),
      }),
      columnHelper.accessor("hasCompany", {
        header: "Has Company",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.hasCompany ? "Yes" : "No"}
          </Typography>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: ({ row }) => (
          <Typography color="text.primary">{row.original.role}</Typography>
        ),
      }),
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: { original: UserType } }) => (
          <div className="flex items-center gap-2">
            <Tooltip title="Delete">
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Are you sure you want to delete ${row.original.name}?`)) {
                    handleDelete(row.original.id);
                  }
                }}
              >
                <i className="tabler-trash text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(row.original);
                }}
              >
                <i className="tabler-pencil text-textSecondary" />
              </IconButton>
            </Tooltip>
          </div>
        ),
        enableSorting: false,
      },
    ],
    [handleDelete]
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
        <div className="flex gap-4 flex-col !items-start max-sm:is-full sm:flex-row sm:flex-wrap sm:items-center">
          {/* New Gender Filter */}
          <CustomTextField
            select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="max-sm:is-full sm:is-[140px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Genders</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </CustomTextField>

          {/* New Company Filter */}
          <CustomTextField
            select
            value={hasCompany}
            onChange={(e) => setHasCompany(e.target.value)}
            className="max-sm:is-full sm:is-[160px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">Has Company</MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </CustomTextField>

          {/* New Role Filter */}
          <CustomTextField
            select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="max-sm:is-full sm:is-[160px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Not Verified">Not Verified</MenuItem>
          </CustomTextField>

          {/* Global Search */}
          <DebouncedInput
            value={globalFilter ?? ""}
            className="max-sm:is-full min-is-[250px]"
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search Users..."
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

export default UsersTable;
