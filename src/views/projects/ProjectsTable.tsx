"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import type { TextFieldProps } from "@mui/material/TextField";
import classnames from "classnames";
import { rankItem } from "@tanstack/match-sorter-utils";

// Styled Components
const Icon = styled("i")({});

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
} from "@tanstack/react-table";
import type { ColumnDef, FilterFn, Table } from "@tanstack/react-table";
import type { RankingInfo } from "@tanstack/match-sorter-utils";
import CustomTextField from "@core/components/mui/TextField";
import TablePaginationComponent from "@components/TablePaginationComponent";
import tableStyles from "@core/styles/table.module.css";
import WarningDialog from "@/components/dialogs/WarningDialog";
import { ProjectType } from "@/types/projectTypes";

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

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

const columnHelper = createColumnHelper<ProjectType>();

const ProjectsTable = ({
  projects,
  onEdit,
  onDelete,
}: {
  projects: ProjectType[];
  onEdit?: (project: ProjectType) => void;
  onDelete?: (projectId: string) => void;
}) => {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang || 'en'; // Default to 'en' if language param is not available
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState(projects);
  const [globalFilter, setGlobalFilter] = useState("");
  const [programFilter, setProgramFilter] = useState<string>("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  // Extract unique programs from projects for filter dropdown
  const uniquePrograms = useMemo(() => {
    const programsSet = new Set<string>();
    projects.forEach((project) => {
      project.programs?.forEach((program) => {
        if (program.id && program.name) {
          programsSet.add(program.id);
        }
      });
    });
    return Array.from(programsSet).map((programId) => {
      const foundProgram = projects
        .flatMap((p) => p.programs)
        .find((prog) => prog.id === programId);
      return { id: programId, name: foundProgram?.name || "" };
    });
  }, [projects]);

  // Filter data when program filter changes
  useEffect(() => {
    if (programFilter) {
      const filteredProjects = projects.filter((project) =>
        project.programs?.some((program) => program.id === programFilter)
      );
      setData(filteredProjects);
    } else {
      setData(projects);
    }
  }, [programFilter, projects]);

  const handleEdit = (project: ProjectType) => {
    if (onEdit) {
      onEdit(project);
    } else {
      // Default behavior if no onEdit prop is provided
      console.log("Edit project:", project);
      // You can implement navigation to edit page or open an edit dialog
    }
  };

  const handleDelete = (project: ProjectType) => {
    setSelectedProject(project);
    setOpenDeleteDialog(true);
  };

  const handleManage = (projectId: string) => {
    router.push(`/${lang}/projects/${projectId}`);
  };

  const confirmDelete = () => {
    if (selectedProject) {
      if (onDelete) {
        onDelete(selectedProject.id);
      } else {
        // Default behavior if no onDelete prop is provided
        console.log("Delete project:", selectedProject);
        // Remove the project from the table data
        const updatedData = data.filter(
          (project) => project.id !== selectedProject.id
        );
        setData(updatedData);
      }
    }
    setOpenDeleteDialog(false);
    setSelectedProject(null);
  };

  const columns = useMemo<ColumnDef<ProjectType, any>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      columnHelper.accessor("name", {
        header: "Name",
        cell: ({ row }) => (
          <Typography className="font-medium" color="text.primary">
            {row.original.name}
          </Typography>
        ),
      }),
      columnHelper.accessor("programs", {
        header: "Programs",
        cell: ({ row }) => (
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            <span className="truncate line-clamp-1 w-[200px]">
              {row.original.programs?.map((p) => p.name).join(", ")}
            </span>
          </Stack>
        ),
      }),
      columnHelper.accessor("programsCount", {
        header: "Programs Count",
        cell: ({ row }) => (
          <Typography>{row.original.programsCount}</Typography>
        ),
      }),
      columnHelper.accessor("teamMembers", {
        header: "Team Members",
        // cell: ({ row }) => <Typography>{row.original.teamMembers}</Typography>,
      }),
      columnHelper.accessor("id", {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(row.original);
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
            <Tooltip title="Manage">
              <IconButton
                size="small"
                onClick={() => handleManage(row.original.id)}
              >
                <i className="tabler-settings text-textSecondary" />
              </IconButton>
            </Tooltip>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
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
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
            className="max-sm:is-full sm:is-[200px]"
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Programs</MenuItem>
            {uniquePrograms.map((program) => (
              <MenuItem key={program.id} value={program.id}>
                {program.name}
              </MenuItem>
            ))}
          </CustomTextField>
          <DebouncedInput
            value={globalFilter ?? ""}
            className="max-sm:is-full min-is-[250px]"
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search Project"
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
                .map((row) => {
                  return (
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
                  );
                })}
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
        title="Delete Project"
        message={`Are you sure you want to delete the project "${selectedProject?.name}"?`}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
      />
    </Card>
  );
};

export default ProjectsTable;
