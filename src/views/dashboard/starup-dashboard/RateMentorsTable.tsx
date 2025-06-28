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
  Rating,
  Button,
} from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import classnames from "classnames";

// Component Imports
import CustomTextField from "@core/components/mui/TextField";
import TablePaginationComponent from "@components/TablePaginationComponent";
import CustomAvatar from "@core/components/mui/Avatar";
import RateMentorDialog from "./RateMentorDialog";

// Style Imports
import tableStyles from "@core/styles/table.module.css";
import { Mentor, MentorRating } from "@/types/MentorTypes";

// Util Imports
import { getInitials } from "@/utils/getInitials";

// Extend table types
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
const columnHelper = createColumnHelper<Mentor>();

interface RateMentorsTableProps {
  mentorsData: Array<Mentor>;
  onRatingSubmit: (rating: MentorRating) => void;
  existingRatings?: Array<MentorRating>;
}

const RateMentorsTable = ({
  mentorsData,
  onRatingSubmit,
  existingRatings = [],
}: RateMentorsTableProps) => {
  // States
  const [data, setData] = useState(mentorsData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  // Dialog states
  const [rateDialogOpen, setRateDialogOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  useEffect(() => {
    if (mentorsData) {
      setData(mentorsData);
      setFilteredData(mentorsData);
    }
  }, [mentorsData]);

  // Helper function to get existing rating for a mentor
  const getMentorRating = (mentorId: number): MentorRating | undefined => {
    return existingRatings.find((rating) => rating.mentorId === mentorId);
  };

  // Handle rating action
  const handleRateMentor = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setRateDialogOpen(true);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setRateDialogOpen(false);
    setSelectedMentor(null);
  };

  // Handle rating submission
  const handleRatingSubmit = (rating: MentorRating) => {
    onRatingSubmit(rating);
    handleDialogClose();
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Mentor",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <CustomAvatar
              src={row.original.image_url || ""}
              size={40}
              alt={row.original.name}
            >
              {!row.original.image_url ? getInitials(row.original.name) : null}
            </CustomAvatar>
            <div>
              <Typography className="font-medium" color="text.primary">
                {row.original.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {row.original.title}
              </Typography>
            </div>
          </div>
        ),
      }),
      // columnHelper.accessor("mentorExpertises", {
      //   header: "Expertise",
      //   cell: ({ row }) => (
      //     <div className="flex flex-wrap gap-1">
      //       {row.original.mentorExpertises.slice(0, 3).map((expertise, index) => (
      //         <Chip
      //           key={index}
      //           label={expertise.title}
      //           size="small"
      //           variant="outlined"
      //         />
      //       ))}
      //       {row.original.mentorExpertises.length > 3 && (
      //         <Chip
      //           label={`+${row.original.mentorExpertises.length - 3} more`}
      //           size="small"
      //           variant="outlined"
      //           color="secondary"
      //         />
      //       )}
      //     </div>
      //   ),
      // }),
      // columnHelper.accessor("programCount", {
      //   header: "Programs",
      //   cell: ({ row }) => (
      //     <Typography color="text.primary">{row.original.programCount}</Typography>
      //   ),
      // }),
      {
        id: "rating",
        header: "Rating",
        cell: ({ row }: { row: { original: Mentor } }) => {
          const existingRating = getMentorRating(row.original.id);
          return (
            <div className="flex items-center gap-2">
              <Rating
                value={existingRating?.rating || 0}
                onChange={(_, newValue) => {
                  if (newValue) {
                    const ratingData: MentorRating = {
                      id: existingRating?.id || crypto.randomUUID(),
                      mentorId: row.original.id,
                      rating: newValue,
                      attendance: existingRating?.attendance || false,
                      notes: existingRating?.notes || "",
                      createdAt:
                        existingRating?.createdAt || new Date().toISOString(),
                    };
                    handleRatingSubmit(ratingData);
                  }
                }}
                size="small"
                precision={1}
              />
              {existingRating && (
                <>
                  <Typography variant="body2" color="text.secondary">
                    ({existingRating.rating})
                  </Typography>
                  {existingRating.attendance && (
                    <Chip
                      label="Present"
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  )}
                </>
              )}
            </div>
          );
        },
        enableSorting: false,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: { original: Mentor } }) => {
          const existingRating = getMentorRating(row.original.id);
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="tonal"
                size="small"
                startIcon={<i className="tabler-star" />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRateMentor(row.original);
                }}
                color={existingRating ? "primary" : "warning"}
              >
                {existingRating ? "Edit" : "Rate"}
              </Button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [existingRatings]
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
        pageSize: 6,
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
    <>
      <Card className="h-full flex flex-col">
        <CardContent className="flex justify-between flex-col gap-4 items-start sm:flex-row sm:items-center flex-shrink-0">
          <div className="flex items-center gap-2">
            <Typography>Show</Typography>
            <CustomTextField
              select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="max-sm:is-full sm:is-[70px]"
            >
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="25">25</MenuItem>
              <MenuItem value="50">50</MenuItem>
            </CustomTextField>
          </div>
          <div className="flex gap-4 flex-col !items-start max-sm:is-full sm:flex-row sm:flex-wrap sm:items-center">
            {/* Global Search */}
            <DebouncedInput
              value={globalFilter ?? ""}
              className="max-sm:is-full min-is-[250px]"
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search Mentors..."
            />
          </div>
        </CardContent>
        <div className="overflow-x-auto overflow-y-auto flex-1" style={{ maxHeight: 'calc(5 * 80px + 60px)' }}>
          <table className={tableStyles.table}>
            <thead className="sticky top-0 bg-white z-10">
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
                    No mentors available
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
        <div className="flex-shrink-0">
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
        </div>
      </Card>

      {/* Rate Mentor Dialog */}
      <RateMentorDialog
        open={rateDialogOpen}
        onClose={handleDialogClose}
        mentor={selectedMentor}
        onSubmit={handleRatingSubmit}
        existingRating={
          selectedMentor ? getMentorRating(selectedMentor.id) : null
        }
      />
    </>
  );
};

export default RateMentorsTable;
