import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useOutsideClick } from 'hooks/useOutsideClick';

import { useToast } from 'hooks/useToast';

import { getAllContests } from 'apis/contests';
import { ContestResponseDto } from 'types/DTO';

import { EditorMenuSkeleton } from '../EditorSkeleton';

import { FaChevronDown } from 'react-icons/fa';

interface ContestMenuProps {
  value: number | null;
  onChange: (id: number) => void;
}

const ContestMenu = ({ value, onChange }: ContestMenuProps) => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const {
    data: contests,
    isLoading,
    isError,
  } = useQuery<ContestResponseDto[]>({
    queryKey: ['contests'],
    queryFn: async () => getAllContests(),
  });

  const selectedContest = contests?.find((c) => c.contestId == value);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  if (isLoading) return <EditorMenuSkeleton />;
  if (isError) return <div>데이터를 가져오지 못했습니다.</div>;

  if (!contests || contests.length === 0)
    return (
      <div className="bg-mainRed/10 border-mainRed text-mainRed rounded-full border px-3 py-1 text-xs">
        다시 시도해주세요.
      </div>
    );

  return (
    <div className="relative w-full max-w-sm text-sm">
      <button
        className="border-lightGray focus:ring-subGreen focus:border-mainGreen flex w-full items-center justify-between rounded border px-5 py-3 text-left duration-150 hover:cursor-pointer focus:outline-none"
        onClick={() => {
          if (selectedContest?.contestId == 1) {
            toast('현재 진행 중인 대회의 프로젝트의 소속을 변경할 수 없습니다.', 'info');
          }
          if (selectedContest?.contestId !== 1) {
            setIsOpen((prev) => !prev);
          }
        }}
      >
        <span className={selectedContest ? '' : 'text-midGray'}>
          {selectedContest?.contestName || '대회를 선택해주세요.'}
        </span>
        <FaChevronDown className={`${isOpen ? 'text-mainGreen' : 'text-lightGray'}`} />
      </button>

      {isOpen && contests && (
        <ul
          className="border-lightGray absolute z-10 mt-4 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-sm"
          ref={dropdownRef}
        >
          {contests.map((contests) => (
            <li
              key={contests.contestId}
              className={`border-whiteGray cursor-pointer border-b-1 p-4 transition-colors duration-200 ease-in-out ${
                contests.contestId === value ? 'bg-whiteGray text-mainGreen' : 'hover:bg-whiteGray'
              }`}
              onClick={() => {
                if (contests.contestId === 1) {
                  toast('현재 진행 중인 대회로 소속을 변경할 수 없어요', 'info');
                  return;
                }
                onChange(contests.contestId);
                setIsOpen(false);
              }}
            >
              {contests.contestName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContestMenu;
