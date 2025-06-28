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
import { QuestionCategoryType } from "@/types/questionCategoryTypes";

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
const columnHelper = createColumnHelper<QuestionCategoryType>();

const QuestionsCategoriesTable = ({
  categoriesData,
  onEdit,
  onView,
}: {
  categoriesData: Array<QuestionCategoryType>;
  onEdit: (category: QuestionCategoryType) => void;
  onView: (category: QuestionCategoryType) => void;
}) => {
  // Hooks
  const params = useParams();
  const { lang: locale } = params;

  // States
  const [data] = useState(categoriesData);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data?.filter((category) => {
      if (categoryFilter && category.category !== categoryFilter) return false;
      return true;
    });
    setFilteredData(filtered);
  }, [categoryFilter, data]);

  // Helper function to truncate content
  const truncateContent = (content: string, maxLength: number = 60) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  // Helper function to get category chip color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Business":
        return "primary";
      case "Technology":
        return "info";
      case "Finance":
        return "success";
      case "Marketing":
        return "warning";
      case "Management":
        return "secondary";
      case "Legal":
        return "error";
      default:
        return "default";
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Category Name",
        cell: ({ row }) => (
          <Typography className="font-medium w-48 whitespace-pre-wrap" color="text.primary">
            {truncateContent(row.original.name, 50)}
          </Typography>
        ),
      }),
      // columnHelper.accessor("category", {
      //   header: "Category",
      //   cell: ({ row }) => (
      //     <Chip
      //       variant="tonal"
      //       className="capitalize"
      //       label={row.original.category}
      //       size="small"
      //       color={getCategoryColor(row.original.category) as any}
      //     />
      //   ),
      // }),
      columnHelper.accessor("numberOfQuestions", {
        header: "Questions Count",
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {row.original.numberOfQuestions}
          </Typography>
        ),
      }),
      columnHelper.accessor("organization", {
        header: "Organization",
        cell: ({ row }) => {
          const organization = row.original.organization;
          if (!organization) {
            return (
              <Typography color="text.secondary" variant="body2">
                No organization
              </Typography>
            );
          }
          
          return (
            <div className="flex items-center gap-3 w-60 whitespace-pre-wrap">
              <img
                src={organization.logo}
                alt={organization.name}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/image-placeholder.jpg';
                }}
              />
              <div className="flex flex-col">
                <Typography color="text.primary" className="font-medium">
                  {truncateContent(organization.name, 30)}
                </Typography>
                <Typography variant="caption" className="line-clamp-1" color="text.secondary">
                  {truncateContent(organization.description || '', 40)}
                </Typography>
              </div>
            </div>
          );
        },
      }),
      // columnHelper.accessor("description", {
      //   header: "Description",
      //   cell: ({ row }) => (
      //     <Typography color="text.primary" className="w-64">
      //       {row.original.description ? truncateContent(row.original.description, 80) : "No description"}
      //     </Typography>
      //   ),
      // }),
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
        cell: ({ row }: { row: { original: QuestionCategoryType } }) => (
          <div className="flex items-center gap-2">
            {/* <Tooltip title="View">
              <IconButton size="small" onClick={() => onView(row.original)}>
                <i className="tabler-eye text-textSecondary" />
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => onEdit(row.original)}>
                <i className="tabler-edit text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" onClick={() => handleDeleteClick(row.original)}>
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
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategoryType | null>(null);

  const confirmDelete = () => {
    if (selectedCategory) {
      // Logic to delete the category
      setFilteredData((prev) =>
        prev.filter((category) => category.id !== selectedCategory.id)
      );
      setOpenDeleteDialog(false);
      setSelectedCategory(null);
    }
  };

  const handleDeleteClick = (category: QuestionCategoryType) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    // Reset the selected category when the delete dialog is closed
    if (!openDeleteDialog) {
      setSelectedCategory(null);
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
          {/* <CustomTextField
            select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="max-sm:is-full sm:is-[180px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Management">Management</MenuItem>
            <MenuItem value="Legal">Legal</MenuItem>
            <MenuItem value="Product">Product</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Methodology">Methodology</MenuItem>
          </CustomTextField> */}
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
        title="Delete Category"
        message={`Are you sure you want to delete the category "${selectedCategory?.name}"?`}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
      />
    </Card>
  );
};

export default QuestionsCategoriesTable;
