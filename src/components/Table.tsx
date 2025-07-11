import { ReactNode } from 'react';

interface Column<T> {
  label: string;
  width?: string;
  key: string;
  render?: (row: T) => ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  rows: T[];
  actions?: (row: T) => ReactNode;
}

function Table<T>({ columns, rows, actions }: Props<T>) {
  return (
    <table className="w-full border-collapse bg-white">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={`border-r border-b border-gray-300 p-2 text-left text-sm ${col.width ? `w-[${col.width}]` : ''}`}
            >
              {col.label}
            </th>
          ))}
          {actions && <th className="w-[30%] border-b border-gray-300 p-2 text-sm">편집</th>}
        </tr>
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
          rows.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key} className="border-r border-b border-gray-300 p-2 text-sm">
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
              {actions && (
                <td className="border-b border-gray-300 p-2 text-sm">
                  <div className="flex justify-center gap-2">{actions(row)}</div>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
