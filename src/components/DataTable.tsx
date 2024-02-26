import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  VisibilityState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import Form from './Form';
import { Task } from '@/lib/types/Task';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  setCategory: (str: 'all' | 'pending' | 'done') => void;
  category: 'all' | 'pending' | 'done';
  addTask: (task: Task) => void;
}

export default function DataTable<TData, TValue>({ columns, data, setCategory, category, addTask }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    initialState: {
      pagination: {
        pageSize: 7
      }
    },

    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  });

  return (
    <div>
      <div className='flex items-center py-4'>
        <div className='flex justify-between gap-2  w-full flex-col md:flex-row '>
          <div className='flex gap-2 flex-col-reverse md:flex-row '>
            <Input
              placeholder='Pesquisar'
              value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
              className='w-full md:max-w-sm'
            />

            <Button variant='outline' onClick={() => setCategory('all')} disabled={category === 'all'}>
              All
            </Button>

            <Button variant='outline' onClick={() => setCategory('done')} disabled={category === 'done'}>
              Done
            </Button>

            <Button variant='outline' onClick={() => setCategory('pending')} disabled={category === 'pending'}>
              Pending
            </Button>
          </div>
          <Form addTask={addTask} />
        </div>
      </div>
      <div className='bg-white border rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end py-4 space-x-2'>
        <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Anterior
        </Button>
        <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Próximo
        </Button>
      </div>
    </div>
  );
}
