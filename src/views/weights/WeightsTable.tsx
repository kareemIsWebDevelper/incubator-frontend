"use client";

// React Imports
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

// MUI Imports
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Tooltip,
  IconButton,
  Chip,
  LinearProgress,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Table Imports
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  FilterFn,
} from "@tanstack/react-table";
import { rankItem, RankingInfo } from "@tanstack/match-sorter-utils";

// Component Imports
import CustomTextField from "@/@core/components/mui/TextField";
import TablePaginationComponent from "@/components/TablePaginationComponent";
import type { TextFieldProps } from "@mui/material/TextField";
import WarningDialog from "@/components/dialogs/WarningDialog";

// Style Imports
import tableStyles from "@core/styles/table.module.css";

// Type Imports
import { WeightType } from "@/types/weightTypes";

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
const columnHelper = createColumnHelper<WeightType>();

const WeightsTable = ({
  weightsData,
  onEdit,
  onView,
  onDelete,
}: {
  weightsData: Array<WeightType>;
  onEdit: (weight: WeightType) => void;
  onView: (weight: WeightType) => void;
  onDelete: (weight: WeightType) => void;
}) => {
  // Hooks
  const params = useParams();
  const { lang: locale } = params;

  // States
  const [stageFilter, setStageFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [subcategoryFilter, setSubcategoryFilter] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  // Use weightsData directly instead of local state, and apply filters
  const filteredData = useMemo(() => {
    return weightsData?.filter((weight) => {
      if (stageFilter && weight.stageName !== stageFilter) return false;
      if (categoryFilter && weight.category !== categoryFilter) return false;
      if (subcategoryFilter && weight.subcategory !== subcategoryFilter)
        return false;
      return true;
    });
  }, [weightsData, stageFilter, categoryFilter, subcategoryFilter]);

  // Helper function to get stage chip color
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Pre-Seed":
        return "secondary";
      case "Seed":
        return "primary";
      case "Series A":
        return "info";
      case "Series B":
        return "success";
      case "Series C":
        return "warning";
      case "Growth":
        return "error";
      default:
        return "default";
    }
  };

  // Helper function to get category chip color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Business Model":
        return "primary";
      case "Financial":
        return "success";
      case "Technology":
        return "info";
      case "Team & Management":
        return "warning";
      case "Market & Competition":
        return "error";
      case "Legal & Compliance":
        return "secondary";
      default:
        return "default";
    }
  };

  // Helper function to get weight color based on value
  const getWeightColor = (weight: number) => {
    if (weight >= 75) return "success";
    if (weight >= 50) return "warning";
    if (weight >= 25) return "info";
    return "error";
  };

  // Get unique values for filters
  const uniqueStages = useMemo(() => {
    return Array.from(new Set(weightsData.map((item) => item.stageName))).sort();
  }, [weightsData]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(weightsData.map((item) => item.category))).sort();
  }, [weightsData]);

  const uniqueSubcategories = useMemo(() => {
    return Array.from(new Set(weightsData.map((item) => item.subcategory))).sort();
  }, [weightsData]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("stageName", {
        header: "Stage Name",
        cell: ({ row }) => (
          <Chip
            variant="tonal"
            className="capitalize"
            label={row.original.stageName}
            size="small"
            color={getStageColor(row.original.stageName) as any}
          />
        ),
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: ({ row }) => (
          <Chip
            variant="tonal"
            className="capitalize"
            label={row.original.category}
            size="small"
            color={getCategoryColor(row.original.category) as any}
          />
        ),
      }),
      columnHelper.accessor("subcategory", {
        header: "Subcategory",
        cell: ({ row }) => (
          <Typography className="font-medium" color="text.primary">
            {row.original.subcategory}
          </Typography>
        ),
      }),
      columnHelper.accessor("weight", {
        header: "Weight",
        cell: ({ row }) => (
          <Box display="flex" alignItems="center" gap={2} minWidth={120}>
            <LinearProgress
              variant="determinate"
              value={row.original.weight}
              sx={{
                flexGrow: 1,
                height: 6,
                borderRadius: 3,
                [`& .MuiLinearProgress-bar`]: {
                  borderRadius: 3,
                },
              }}
              color={getWeightColor(row.original.weight)}
            />
            <Typography variant="body2" color="text.primary" minWidth={35}>
              {row.original.weight}%
            </Typography>
          </Box>
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
        cell: ({ row }: { row: { original: WeightType } }) => (
          <div className="flex items-center gap-2">
            <Tooltip title="View">
              <IconButton size="small" onClick={() => onView(row.original)}>
                <Icon className="tabler-eye text-[22px] text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => onEdit(row.original)}>
                <Icon className="tabler-edit text-[22px] text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => handleDeleteClick(row.original)}
              >
                <Icon className="tabler-trash text-[22px] text-textSecondary" />
              </IconButton>
            </Tooltip>
          </div>
        ),
        enableSorting: false,
      },
    ],
    [onEdit, onView, onDelete]
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
  const [selectedWeight, setSelectedWeight] = useState<WeightType | null>(null);

  const confirmDelete = () => {
    if (selectedWeight) {
      onDelete(selectedWeight);
      setOpenDeleteDialog(false);
      setSelectedWeight(null);
    }
  };

  const handleDeleteClick = (weight: WeightType) => {
    setSelectedWeight(weight);
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    // Reset the selected weight when the delete dialog is closed
    if (!openDeleteDialog) {
      setSelectedWeight(null);
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
          {/* Stage Filter */}
          <CustomTextField
            select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="max-sm:is-full sm:is-[180px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Stages</MenuItem>
            {uniqueStages.map((stage) => (
              <MenuItem key={stage} value={stage}>
                {stage}
              </MenuItem>
            ))}
          </CustomTextField>

          {/* Category Filter */}
          <CustomTextField
            select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="max-sm:is-full sm:is-[180px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {uniqueCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </CustomTextField>

          {/* Subcategory Filter */}
          <CustomTextField
            select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            className="max-sm:is-full sm:is-[200px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Subcategories</MenuItem>
            {uniqueSubcategories.map((subcategory) => (
              <MenuItem key={subcategory} value={subcategory}>
                {subcategory}
              </MenuItem>
            ))}
          </CustomTextField>

          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search weights..."
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
                  <th
                    key={header.id}
                    draggable={header.column.getCanSort()}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() &&
                        ({
                          asc: <Icon className="tabler-chevron-up text-xl" />,
                          desc: (
                            <Icon className="tabler-chevron-down text-xl" />
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                          <Icon className="tabler-selector text-xl" />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No weights found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <TablePaginationComponent table={table as any} />

      <WarningDialog
        type="Delete"
        title="Delete Weight"
        message={`Are you sure you want to delete the weight for "${selectedWeight?.subcategory}" in "${selectedWeight?.category}"?`}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
      />
    </Card>
  );
};

export default WeightsTable;
