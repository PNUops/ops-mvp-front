import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllContests } from 'apis/contests';
import { FaChevronDown } from 'react-icons/fa';

interface ContestMenuProps {
  selectedContestId?: number;
  onSelect: (id: number) => void;
}

const ContestMenu = ({ selectedContestId, onSelect }: ContestMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: contests, isError } = useQuery({ queryKey: ['contests'], queryFn: getAllContests });

  const selectedContest = contests?.find((c) => c.contestId === selectedContestId);

  if (isError)
    return (
      <div className="bg-mainRed/10 border-mainRed text-mainRed rounded-full border px-3 py-1 text-xs">
        다시 시도해주세요.
      </div>
    );

  return (
    <div className="relative w-full max-w-sm text-sm">
      <button
        className="border-subGreen flex w-full items-center justify-between border-b-2 p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedContest ? '' : 'text-whiteGray'}>
          {selectedContest?.contestName || '대회를 선택하시오.'}
        </span>
        <FaChevronDown className="text-mainGreen" />
      </button>

      {isOpen && contests && (
        <ul className="border-subGreen absolute z-10 mt-4 max-h-60 w-full overflow-auto border-2 bg-white shadow-sm">
          {contests.map((contest) => (
            <li
              key={contest.contestId}
              className={`cursor-pointer p-4 transition-colors duration-150 ${
                contest.contestId === selectedContestId ? 'bg-whiteGray text-mainGreen' : 'hover:bg-whiteGray'
              }`}
              onClick={() => {
                onSelect(contest.contestId);
                setIsOpen(false);
              }}
            >
              {contest.contestName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContestMenu;
