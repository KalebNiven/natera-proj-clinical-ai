import { Search } from '@/components/icons/forms';
import {
  ArrowUp,
  NoData,
  PaginationEnd,
  PaginationLeft,
  PaginationRight,
  PaginationStart,
} from '@/components/icons/table';
import { type CaseData, type Status } from '@/lib/types/patient';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { parse } from 'date-fns';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from './patient-list-mock';

const getStatusFontColor = (status: Status): [string, string] => {
  const statusColors: Record<Status, [string, string]> = {
    'Paused Review': ['#FFFAE5', '#8F7201'],
    'Waiting for Review': ['#DAF2F6', '#258697'],
    'Needs Review': ['#FCE8E9', '#E85E5E'],
    'Awaiting Response': ['#FFEDE5', '#FF5B19'],
    Reviewed: ['#DDF3EB', '#318C6C'],
  };
  return statusColors[status];
};

export const PatientListTable = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'lastExtraction',
      desc: true,
    },
  ]);
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<CaseData>[]>(
    () => [
      {
        accessorKey: 'caseBundlingId',
        header: 'Case Bundling ID',
        cell: info => info.getValue<number>(),
      },
      {
        accessorKey: 'cancerType',
        header: 'Cancer Type',
        cell: info => info.getValue<string>(),
        filterFn: 'equals',
      },
      {
        accessorKey: 'project',
        header: 'Project',
        cell: info => info.getValue<string>(),
      },
      {
        accessorKey: 'lastExtraction',
        header: ({ column }) => (
          <div
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            onClick={() => column.toggleSorting()}
          >
            Last Extraction
            <span
              style={{
                width: '18px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {column.getIsSorted() === 'asc' && <ArrowUp fontSize="small" />}
              {column.getIsSorted() === 'desc' && (
                <ArrowUp
                  fontSize="small"
                  sx={{ transform: 'rotate(180deg)' }}
                />
              )}
            </span>
          </div>
        ),
        cell: info => info.getValue<string>(),
        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) => {
          const a = parse(
            rowA.getValue(columnId),
            'EEE MMM dd yyyy',
            new Date(),
          );
          const b = parse(
            rowB.getValue(columnId),
            'EEE MMM dd yyyy',
            new Date(),
          );
          return a.getTime() - b.getTime();
        },
      },
      {
        accessorKey: 'status',
        header: () => <div style={{ textAlign: 'right' }}>Status</div>,
        cell: info => {
          const status = info.getValue<Status>();
          const [backgroundColor, color] = getStatusFontColor(status);
          return (
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'right',
                  backgroundColor,
                  color,
                  height: '30px',
                  fontSize: '16px',
                  padding: '3px 8px',
                  borderRadius: '4px',
                }}
              >
                {status}
              </Box>
            </Box>
          );
        },
        filterFn: 'equals',
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 16,
        pageIndex: 0,
      },
      sorting: [
        {
          id: 'lastExtraction',
          desc: true,
        },
      ],
    },
  });

  const clearFilters = () => {
    setColumnFilters([]);
    setGlobalFilter('');
  };

  return (
    <Box display="flex" flexDirection="column" paddingRight="16px">
      <Box display="flex" flex={1} mb={'8px'} padding={'8px 16px'}>
        <TextField
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            },
          }}
          placeholder="Search by case bundling ID, cancer type, project, ..."
          sx={{
            width: '100%',
            '& .MuiInputBase-root': {
              backgroundColor: 'white',
            },
          }}
        />
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={2} mb={2} padding={'0 16px'}>
          <Select
            size="small"
            value={columnFilters.find(f => f.id === 'cancerType')?.value || ''}
            onChange={e => {
              setColumnFilters(prev =>
                e.target.value
                  ? [
                      ...prev.filter(f => f.id !== 'cancerType'),
                      { id: 'cancerType', value: e.target.value },
                    ]
                  : prev.filter(f => f.id !== 'cancerType'),
              );
            }}
            displayEmpty
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All Cancer Types</MenuItem>
            {Array.from(new Set(data.map(row => row.cancerType))).map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          <Select
            size="small"
            value={columnFilters.find(f => f.id === 'status')?.value || ''}
            onChange={e => {
              setColumnFilters(prev =>
                e.target.value
                  ? [
                      ...prev.filter(f => f.id !== 'status'),
                      { id: 'status', value: e.target.value },
                    ]
                  : prev.filter(f => f.id !== 'status'),
              );
            }}
            displayEmpty
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            {Array.from(new Set(data.map(row => row.status))).map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '1rem',
            padding: '1rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              height: '36px',
            }}
            component="span"
          >
            Rows per page
            <Select
              variant="outlined"
              size="small"
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[16, 32, 48].map(pageSize => (
                <MenuItem key={pageSize} value={pageSize}>
                  {pageSize}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minWidth={'110px'}
          >
            {table.getFilteredRowModel().rows.length === 0 ? (
              <span>No results</span>
            ) : (
              <>
                <span
                  style={{
                    minWidth: '28px',
                    width: 'fit-content',
                    textAlign: 'right',
                  }}
                >
                  {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    1}
                </span>
                <span>-</span>
                <span
                  style={{
                    minWidth: '28px',
                    width: 'fit-content',
                    textAlign: 'left',
                  }}
                >
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) *
                      table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length,
                  )}
                </span>
                <span>of</span>
                <span
                  style={{
                    minWidth: '32px',
                    width: 'fit-content',
                    textAlign: 'center',
                  }}
                >
                  {table.getFilteredRowModel().rows.length}
                </span>
              </>
            )}
          </Box>

          <Box display="flex" gap="16px">
            <IconButton
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              size="large"
              style={{
                padding: '4px',
                cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed',
                opacity: table.getCanPreviousPage() ? 1 : 0.5,
              }}
            >
              <PaginationStart />
            </IconButton>
            <IconButton
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              size="large"
              style={{
                padding: '4px',
                cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed',
                opacity: table.getCanPreviousPage() ? 1 : 0.5,
              }}
            >
              <PaginationLeft />
            </IconButton>
            <IconButton
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size="large"
              style={{
                padding: '4px',
                cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed',
                opacity: table.getCanNextPage() ? 1 : 0.5,
              }}
            >
              <PaginationRight />
            </IconButton>
            <IconButton
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              size="large"
              style={{
                padding: '4px',
                cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed',
                opacity: table.getCanNextPage() ? 1 : 0.5,
              }}
            >
              <PaginationEnd />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Table
        sx={{
          border: '1px solid #E1DFE0',
        }}
      >
        <TableHead sx={{ backgroundColor: '#F6F6F6' }}>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow
              key={headerGroup.id}
              sx={{
                height: '24px',
                border: '1px solid rgba(224, 224, 224, 1)',
              }}
            >
              {headerGroup.headers.map(header => (
                <TableCell
                  key={header.id}
                  style={{
                    textAlign: 'left',
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    fontWeight: 'normal',
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0.5px',
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                onClick={() =>
                  navigate(`/patients/${row.original.caseBundlingId}`)
                }
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    style={{
                      height: '56px',
                      padding: '4px 8px 4px 16px',
                      fontSize: '15px',
                      lineHeight: '20px',
                      borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                sx={{ textAlign: 'center', py: 8 }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={2}
                >
                  <NoData />
                  <Typography>No results found</Typography>
                  {(columnFilters.length > 0 || globalFilter) && (
                    <Button variant="outlined" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};
