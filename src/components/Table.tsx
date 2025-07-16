import { ReactNode } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, RowData } from '@tanstack/react-table';

interface Column<T> {
  header: string;
  width?: string;
  key: string;
  render?: (row: T) => ReactNode;
}

interface Props<T extends RowData> {
  columns: Column<T>[];
  rows: T[];
  actions?: (row: T) => ReactNode;
  onRowClick?: (row: T) => void;
}

function Table<T extends RowData>({ columns, rows, actions, onRowClick }: Props<T>) {
  const tableColumns: ColumnDef<T>[] = columns.map((col) => ({
    accessorKey: col.key,
    header: col.header,
    cell: (info) => (col.render ? col.render(info.row.original) : info.getValue()),
  }));

  const allColumns = actions
    ? [
        ...tableColumns,
        {
          id: 'actions',
          header: '편집',
          accessorKey: 'actions',
          cell: (info: any) => <div className="flex w-full justify-center gap-2">{actions(info.row.original)}</div>,
        } as ColumnDef<T>,
      ]
    : tableColumns;

  const table = useReactTable({
    data: rows,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="w-full min-w-[700px] border-collapse bg-white">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header, idx) => {
                let thClass = ` border-b border-gray-300 p-2 text-sm`;
                if (idx < columns.length) {
                  const width = columns[idx]?.width;
                  if (width) thClass += ` border-r w-[${width}] text-left`;
                } else if (idx == columns.length) {
                  thClass += ` w-[30%] text-center`;
                }

                return (
                  <th key={header.id} className={thClass}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="border-b border-gray-300 p-8 text-center text-gray-500"
              >
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                style={onRowClick ? { cursor: 'pointer' } : undefined}
              >
                {row.getVisibleCells().map((cell, idx) => (
                  <td
                    key={cell.id}
                    className={
                      idx < row.getVisibleCells().length - 1
                        ? 'border-r border-b border-gray-300 p-2 text-sm'
                        : 'border-b border-gray-300 p-2 text-sm'
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
