"use client";

// React Imports
import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";

// Type Imports
import { ServiceCategoryType } from "@/types/ServiceTypes";
import { OrgType } from "@/types/OrgTypes";

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

// Component Imports
import {
  Card,
  CardContent,
  Typography,
  TablePagination,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import classnames from "classnames";

// Custom Component Imports
import CustomTextField from "@core/components/mui/TextField";
import TablePaginationComponent from "@components/TablePaginationComponent";
import WarningDialog from "@/components/dialogs/WarningDialog";

// Style Imports
import tableStyles from "@core/styles/table.module.css";

// Define extended type for ServiceCategoryTable
type ExtendedServiceCategoryType = ServiceCategoryType & {
  organization?: OrgType;
  startupName?: string;
  createdAt: string;
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
const columnHelper = createColumnHelper<ExtendedServiceCategoryType>();

const ServiceCategoriesTable = ({
  data,
  onEdit,
}: {
  data: Array<ExtendedServiceCategoryType>;
  onEdit: (category: ExtendedServiceCategoryType) => void;
}) => {
  // Hooks
  const params = useParams();
  const { lang: locale } = params;

  // States
  const [tableData, setTableData] = useState(data);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [organization, setOrganization] = useState<string>("");
  const [filteredData, setFilteredData] = useState(data);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ExtendedServiceCategoryType | null>(
    null
  );

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  // Get unique organization names for the filter dropdown
  const organizationOptions = useMemo(() => {
    const orgSet = new Set<string>();

    data.forEach((category) => {
      if (category.organization?.name) {
        orgSet.add(category.organization.name);
      }
    });

    return Array.from(orgSet);
  }, [data]);

  useEffect(() => {
    const filtered = tableData?.filter((category) => {
      // Filter by organization if selected
      if (organization && category.organization) {
        if (category.organization.name !== organization) return false;
      }

      return true;
    });

    setFilteredData(filtered);
  }, [organization, tableData]);

  const handleDelete = (category: ExtendedServiceCategoryType) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedCategory) {
      // Remove the category from the table data
      const updatedData = tableData.filter(
        (category) => category.id !== selectedCategory.id
      );
      setTableData(updatedData);
      setFilteredData(updatedData);
    }
    setOpenDeleteDialog(false);
    setSelectedCategory(null);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Category Name",
        cell: ({ row }) => (
          <Typography className="font-medium" color="text.primary">
            {row.original.name}
          </Typography>
        ),
      }),
      columnHelper.accessor((row) => row.organization?.name || "", {
        id: "organization",
        header: "Organization",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.organization?.name || "N/A"}
          </Typography>
        ),
      }),
      columnHelper.accessor("startupName", {
        header: "Startup Name",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.startupName || "N/A"}
          </Typography>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: "Created Date",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </Typography>
        ),
      }),
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: { original: ExtendedServiceCategoryType } }) => (
          <div className="flex items-center gap-2">
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={(e) => {
                  const filteredCategory = data.filter(
                    (category) => category.id === row.original.id
                  );
                  e.stopPropagation();
                  onEdit(filteredCategory[0]);
                }}
              >
                <i className="tabler-edit text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => handleDelete(row.original)}
              >
                <i className="tabler-trash text-textSecondary" />
              </IconButton>
            </Tooltip>
          </div>
        ),
        enableSorting: false,
      },
    ],
    [data, onEdit]
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
            {organizationOptions.map((org) => (
              <MenuItem key={org} value={org}>
                {org}
              </MenuItem>
            ))}
          </CustomTextField>
          <DebouncedInput
            value={globalFilter ?? ""}
            className="max-sm:is-full min-is-[250px]"
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search Categories"
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
      <WarningDialog
        type="Delete"
        title="Delete Category"
        message={`Are you sure you want to delete the category "${selectedCategory?.name}"?`}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
      />
    </Card>
  );
};

export default ServiceCategoriesTable;