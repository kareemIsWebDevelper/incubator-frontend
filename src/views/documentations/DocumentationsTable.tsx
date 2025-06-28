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

// Style Imports
import tableStyles from "@core/styles/table.module.css";
import { useParams } from "next/navigation";
import WarningDialog from "@/components/dialogs/WarningDialog";

// Type Imports
import { DocumentationType } from "@/types/DocumentationTypes";

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
const columnHelper = createColumnHelper<DocumentationType>();

const DocumentationsTable = ({
  documentationsData,
  onEdit,
  onView,
}: {
  documentationsData: Array<DocumentationType>;
  onEdit: (documentation: DocumentationType) => void;
  onView: (documentation: DocumentationType) => void;
}) => {
  // Hooks
  const params = useParams();
  const { lang: locale } = params;

  // States
  const [data] = useState(documentationsData);
  const [showContentFor, setShowContentFor] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data?.filter((documentation) => {
      if (showContentFor && documentation.showContentFor !== showContentFor)
        return false;
      return true;
    });
    setFilteredData(filtered);
  }, [showContentFor, data]);

  // Helper function to truncate HTML content
  const truncateContent = (htmlContent: string, maxLength: number = 100) => {
    const textContent = htmlContent.replace(/<[^>]*>/g, "");
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };

  // Helper function to get content type chip color
  const getContentTypeColor = (showContentFor: string) => {
    switch (showContentFor) {
      case "mentors":
        return "primary";
      case "judgers":
        return "secondary";
      case "users":
        return "info";
      case "managers":
        return "warning";
      case "all":
        return "success";
      default:
        return "default";
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "Title",
        cell: ({ row }) => (
          <Typography className="font-medium" color="text.primary">
            {row.original.title}
          </Typography>
        ),
      }),
      columnHelper.accessor("content", {
        header: "Content",
        cell: ({ row }) => (
          <Typography color="text.primary" className="whitespace-pre-wrap w-72">
            {truncateContent(row.original.content, 80)}
          </Typography>
        ),
      }),
      columnHelper.accessor("showContentFor", {
        header: "Content For",
        cell: ({ row }) => (
          <Chip
            variant="tonal"
            className="capitalize"
            label={row.original.showContentFor}
            size="small"
            color={getContentTypeColor(row.original.showContentFor) as any}
          />
        ),
      }),
      columnHelper.accessor("arrange", {
        header: "Order",
        cell: ({ row }) => (
          <Typography color="text.primary">{row.original.arrange}</Typography>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: "Created At",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </Typography>
        ),
      }),
      columnHelper.accessor("updatedAt", {
        header: "Updated At",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {new Date(row.original.updatedAt).toLocaleDateString()}
          </Typography>
        ),
      }),
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: { original: DocumentationType } }) => (
          <div className="flex items-center gap-2">
            <Tooltip title="View">
              <IconButton size="small" onClick={() => onView(row.original)}>
                <i className="tabler-eye text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => onEdit(row.original)}>
                <i className="tabler-edit text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => handleDeleteClick(row.original)}
              >
                <i className="tabler-trash text-textSecondary" />
              </IconButton>
            </Tooltip>
          </div>
        ),
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
  const [selectedDocumentation, setSelectedDocumentation] =
    useState<DocumentationType | null>(null);

  const confirmDelete = () => {
    if (selectedDocumentation) {
      // Logic to delete the documentation
      setFilteredData((prev) =>
        prev.filter(
          (documentation) => documentation.id !== selectedDocumentation.id
        )
      );
      setOpenDeleteDialog(false);
      setSelectedDocumentation(null);
    }
  };

  const handleDeleteClick = (documentation: DocumentationType) => {
    setSelectedDocumentation(documentation);
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    // Reset the selected documentation when the delete dialog is closed
    if (!openDeleteDialog) {
      setSelectedDocumentation(null);
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
            value={showContentFor}
            onChange={(e) => setShowContentFor(e.target.value)}
            className="max-sm:is-full sm:is-[160px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Users</MenuItem>
            <MenuItem value="mentors">Mentors</MenuItem>
            <MenuItem value="judgers">Judgers</MenuItem>
            <MenuItem value="users">Users</MenuItem>
            <MenuItem value="managers">Managers</MenuItem>
            {/* <MenuItem value="all">All Users</MenuItem> */}
          </CustomTextField>
          <DebouncedInput
            value={globalFilter ?? ""}
            className="max-sm:is-full min-is-[250px]"
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search Documentations"
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
        title="Delete Documentation"
        message={`Are you sure you want to delete the documentation "${selectedDocumentation?.title}"?`}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
      />
    </Card>
  );
};

export default DocumentationsTable;
