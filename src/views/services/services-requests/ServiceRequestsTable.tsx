"use client";

// React Imports
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
import ManageServiceRequestDialog from "./ManageServiceRequestDialog";
import SendMessageDialog from "./SendMessageDialog";

// Style Imports
import tableStyles from "@core/styles/table.module.css";
import { useParams } from "next/navigation";
import moment from "moment";
import Autocomplete from "@/@core/components/mui/Autocomplete";
import { isMobile } from "@/utils";

// Service Request Type definition
interface Vendor {
  name: string;
  email: string;
  phone: string;
}

interface ServiceRequestType {
  serviceName: string;
  comment: string;
  vendor: Vendor;
  createdAt: string;
}

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
const columnHelper = createColumnHelper<ServiceRequestType>();

const ServiceRequestsTable = ({
  data,
}: {
  data: Array<ServiceRequestType>;
}) => {
  // Hooks
  const params = useParams();
  const { lang: locale } = params;

  // States
  const [tableData, setTableData] = useState(data);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [vendorFilter, setVendorFilter] = useState<string | null>("");
  const [dateFilter, setDateFilter] = useState<string>("all"); // Options: "all", "recent", "old"
  const [filteredData, setFilteredData] = useState(data);
  const [selectedRequest, setSelectedRequest] =
    useState<ServiceRequestType | null>(null);
  const [openManageDialog, setOpenManageDialog] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);

  // Date filter options
  const dateFilterOptions = [
    { value: "all", label: "All Dates" },
    { value: "recent", label: "Recent First" },
    { value: "old", label: "Old First" },
  ];

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  // Get unique vendor names for the filter dropdown
  const vendorOptions = useMemo(() => {
    const vendorSet = new Set<string>();

    data.forEach((request) => {
      vendorSet.add(request.vendor.name);
    });

    return Array.from(vendorSet);
  }, [data]);

  useEffect(() => {
    const filtered = tableData?.filter((request) => {
      // Filter by vendor if selected
      if (vendorFilter && request.vendor.name !== vendorFilter) {
        return false;
      }

      return true;
    });

    // Apply sorting based on date filter
    if (dateFilter !== "all" && filtered) {
      const sortedData = [...filtered].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        
        return dateFilter === "recent" ? dateB - dateA : dateA - dateB;
      });
      
      setFilteredData(sortedData);
    } else {
      setFilteredData(filtered);
    }
  }, [vendorFilter, tableData, dateFilter]);

  const handleManage = (request: ServiceRequestType) => {
    setSelectedRequest(request);
    setOpenManageDialog(true);
  };

  const handleMessage = (request: ServiceRequestType) => {
    setSelectedRequest(request);
    setOpenMessageDialog(true);
  };

  const handleSendMessage = (formData: any, request: ServiceRequestType) => {
    // Here you would typically send an API request to send the message
    console.log("Message sent:", formData, "to vendor:", request.vendor);

    // For demo purposes, we'll just log the action
    alert(`Message sent to ${request.vendor.name}: ${formData.subject}`);
  };

  const handleApprove = (request: ServiceRequestType) => {
    // Here you would typically send an API request to approve the service request
    console.log("Service request approved:", request);

    // For demo purposes, we'll just log the action
    alert(`Service request for ${request.serviceName} has been approved.`);
  };

  const handleDisapprove = (request: ServiceRequestType) => {
    // Here you would typically send an API request to disapprove the service request
    console.log("Service request disapproved:", request);

    // For demo purposes, we'll just remove it from the table data
    const updatedData = tableData.filter(
      (item) =>
        !(
          item.serviceName === request.serviceName &&
          item.vendor.name === request.vendor.name &&
          item.createdAt === request.createdAt
        )
    );
    setTableData(updatedData);
    setFilteredData(updatedData);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("serviceName", {
        header: "Service Name",
        cell: ({ row }) => (
          <Typography className="font-medium" color="text.primary">
            {row.original.serviceName}
          </Typography>
        ),
      }),
      columnHelper.accessor("comment", {
        header: "Comment",
        cell: ({ row }) => (
          <Typography color="text.primary" className="max-w-[200px] truncate">
            {row.original.comment}
          </Typography>
        ),
      }),
      columnHelper.accessor("vendor.name", {
        header: "Vendor",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.vendor.name}
          </Typography>
        ),
      }),
      columnHelper.accessor("vendor.email", {
        header: "Email",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {row.original.vendor.email}
          </Typography>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: "Created Date",
        cell: ({ row }) => (
          <Typography color="text.primary">
            {moment(row.original.createdAt).format("DD/MM/YYYY HH:mm")}
          </Typography>
        ),
      }),
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: { original: ServiceRequestType } }) => (
          <div className="flex items-center gap-2">
            <Tooltip title="Manage">
              <IconButton
                size="small"
                onClick={() => handleManage(row.original)}
              >
                <i className="tabler-settings text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Send Message">
              <IconButton
                size="small"
                onClick={() => handleMessage(row.original)}
              >
                <i className="tabler-message text-textSecondary" />
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
          <Autocomplete
            options={vendorOptions}
            value={vendorFilter}
            onChange={(event, newValue) => setVendorFilter(newValue)}
            fullWidth={isMobile ? true : false}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                placeholder="Select a vendor"
                className="max-sm:is-full sm:is-[200px]"
              />
            )}
          />
          <CustomTextField
            select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="max-sm:is-full sm:is-[150px]"
            placeholder="Date Filter"
          >
            {dateFilterOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </CustomTextField>
          <DebouncedInput
            value={globalFilter ?? ""}
            className="max-sm:is-full min-is-[250px]"
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search Requests"
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
      <ManageServiceRequestDialog
        open={openManageDialog}
        onClose={() => setOpenManageDialog(false)}
        serviceRequest={selectedRequest}
        onApprove={handleApprove}
        onDisapprove={handleDisapprove}
      />
      <SendMessageDialog
        open={openMessageDialog}
        onClose={() => setOpenMessageDialog(false)}
        serviceRequest={selectedRequest}
        onSend={handleSendMessage}
      />
    </Card>
  );
};

export default ServiceRequestsTable;
