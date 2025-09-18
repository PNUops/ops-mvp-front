import { useState, useEffect } from 'react';
import { TeamListItemResponseDto } from 'types/DTO/teams/teamListDto';
import { useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import { FaAward } from 'react-icons/fa6';
import { postCustomTeamOrder } from 'apis/teams';

interface TableHeaderProps {
  fields: Record<string, string>;
}

interface TableRowProps {
  tableRowData: TeamListItemResponseDto;
}

interface SortableTableProps {
  data: TeamListItemResponseDto[];
  contestId: number;
  onDeleteTeam: (type: 'team', id: number) => void;
  editable: boolean;
}

const TableHeader = ({ fields }: TableHeaderProps) => {
  return (
    <thead>
      <tr className="truncate border-t border-r border-neutral-200 p-2 text-left last:border-r-0">
        {Object.entries(fields).map(([field, width]) => (
          <th
            key={field}
            style={{ width }}
            className="border-r border-b border-neutral-200 px-4 py-2 text-left last:border-r-0"
          >
            {field}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const SortableTable = ({ data, contestId, onDeleteTeam, editable }: SortableTableProps) => {
  const navigate = useNavigate();

  const FIELDS = { 순번: '10%', 팀명: '20%', 작품명: '30%', 수상: '20%', 편집: '20%' };

  const [rows, setRows] = useState<TeamListItemResponseDto[]>([...data]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    setRows([...data]);
  }, [data, contestId]);

  const handleDragStart = (index: number) => (e: React.DragEvent) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (dragIndex === null) return;
    const updated = [...rows];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    setRows(updated);
    setDragIndex(null);
  };

  const handleSaveOrder = async () => {
    const teamOrders = rows.map((r, idx) => ({ teamId: r.teamId, itemOrder: idx + 1 }));

    try {
      // await postCustomTeamOrder(contestId, teamOrders);
      console.log('정렬 저장 성공', teamOrders);
    } catch (error: any) {
      console.error('정렬 저장 실패', error);
    }
  };

  return (
    <div>
      <table className="w-full table-fixed border-collapse truncate text-sm text-nowrap">
        <TableHeader fields={FIELDS} />
        <tbody>
          {rows.map((rowData, i) => (
            <tr
              key={rowData.teamId}
              draggable={editable}
              onDragStart={handleDragStart(i)}
              onDragOver={handleDragOver(i)}
              onDrop={handleDrop(i)}
              className={`hover:bg-gray-50 ${editable ? 'cursor-grab' : ''}`}
            >
              <td className="truncate border-r border-b border-neutral-200 p-2 last:border-r-0">{i + 1}</td>
              <td className="truncate border-r border-b border-neutral-200 p-2 last:border-r-0">{rowData.teamName}</td>
              <td className="truncate border-r border-b border-neutral-200 p-2 last:border-r-0">
                {rowData.projectName}
              </td>
              <td className="border-r border-b border-neutral-200 p-2 last:border-r-0">
                <div className="flex items-center gap-2">
                  {rowData.awardName && rowData.awardColor ? (
                    <div className="border-lightGray flex w-full items-center justify-center">
                      <p className="flex items-center justify-center gap-2 rounded-full border border-gray-100 bg-gray-50 p-2 px-4 text-center">
                        <FaAward style={{ color: rowData.awardColor }} />
                        <span>{rowData.awardName}</span>
                      </p>
                    </div>
                  ) : (
                    <span className="text-lightGray w-full text-center">미등록</span>
                  )}
                </div>
              </td>
              <td className="border-b border-neutral-200 p-2">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    className="bg-mainRed h-[35px] w-full min-w-[70px]"
                    onClick={() => onDeleteTeam('team', rowData.teamId)}
                  >
                    삭제<span className="hidden lg:inline-block">하기</span>
                  </Button>
                  <Button
                    className="bg-mainGreen h-[35px] w-full min-w-[70px]"
                    onClick={() => navigate(`/teams/edit/${rowData.teamId}`)}
                  >
                    수정<span className="hidden lg:inline-block">하기</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex justify-end">
        <Button className="bg-mainBlue h-10" onClick={handleSaveOrder}>
          정렬 저장
        </Button>
      </div>
    </div>
  );
};

export default SortableTable;
