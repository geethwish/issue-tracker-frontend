'use client';

import withAuth from '@/components/shared/withAuth';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axiosInstance from '@/utils/axiosConfig';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnFiltersState,
    VisibilityState,
    getFilteredRowModel
} from '@tanstack/react-table';
import { FaSort } from 'react-icons/fa';
import React from 'react';


export type IssuesType = {
    id: number;
    title: string;
    description: string;
    severity: null | 'normal' | 'medium' | 'high';
    priority: null | 'normal' | 'medium' | 'high';
    userId: number;
    status: 'open' | 'processing' | 'success' | 'failed';
};

const dataColumns: ColumnDef<IssuesType>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
        cell: ({ row }) => <Link href={`/issue/${row.getValue('id')}`}><div className="capitalize">{row.getValue('id')}</div></Link>,
    },
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => <Link href={`/issue/${row.getValue('id')}`}><div className="capitalize">{row.getValue('title')}</div></Link>,
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <div className="capitalize">{row.getValue('description')}</div>,
    },
    {
        accessorKey: 'priority',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Priority
                <FaSort className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className=" font-medium">{row.getValue('priority')}</div>,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Status
                <FaSort className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className=" text-gray-600 font-bold uppercase py-2 px-4"><span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">{row.getValue('status')}</span></div>
    }

];

function Home() {
    const [issues, setIssues] = useState<IssuesType[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const table = useReactTable({
        data: issues,
        columns: dataColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    useEffect(() => {
        axiosInstance
            .get('/issues')
            .then((response) => setIssues(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold">Issue Tracker</h1>
            <div className="w-full mt-5">
                <div className="rounded-md border bg-white">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100">
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={dataColumns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{' '}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Home);