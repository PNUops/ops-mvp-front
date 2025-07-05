import { ReactNode } from 'react';
import { ContestResponseDto } from 'types/DTO';
import { deleteContest } from 'apis/contests';

interface Column {
  label: string;
  width?: string;
}

interface Props {
  columns: Column[];
  rows: ContestResponseDto[];
  actions?: (row: ContestResponseDto) => ReactNode;
}

const Table = ({ columns, rows, actions }: Props) => {
  return (
    <table className="w-full border-collapse bg-white">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col, i) => (
            <th
              key={i}
              className={`border-r border-b border-gray-300 p-2 text-sm ${col.width ? `w-[${col.width}]` : ''}`}
            >
              {col.label}
            </th>
          ))}
          {actions && <th className="w-[30%] border-b border-gray-300 p-2 text-sm">편집</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.contestId}>
            <td className="border-r border-b border-gray-300 p-2 text-sm">
              {row.updatedAt.replace('T', ' ').slice(0, 16)}
            </td>
            <td className="border-r border-b border-gray-300 p-2 text-sm">{row.contestName}</td>
            {actions && (
              <td className="border-b border-gray-300 p-2 text-sm">
                <div className="flex justify-center gap-2">{actions(row)}</div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
