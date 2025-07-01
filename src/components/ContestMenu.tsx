import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useOutsideClick } from 'hooks/useOutsideClick';

import { getAllContests } from 'apis/contests';
import { ContestResponseDto } from 'types/DTO';

import { FaChevronDown } from 'react-icons/fa';

interface ContestMenuProps {
  options: ContestResponseDto[];
  selectedContestId?: number;
}

const ContestMenu = ({ options, selectedContestId }: ContestMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const closeDropdown = () => setIsOpen(false);
  useOutsideClick(dropdownRef, closeDropdown);

  const selectedContest = options?.find((c) => c.contestId === selectedContestId);

  if (!options)
    return (
      <div className="bg-mainRed/10 border-mainRed text-mainRed rounded-full border px-3 py-1 text-xs">
        다시 시도해주세요.
      </div>
    );

  return (
    <div className="relative w-full max-w-sm text-sm">
      <button
        className="border-lightGray flex w-full items-center justify-between border-b-3 p-4 text-left hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedContest ? '' : 'text-midGray'}>
          {selectedContest?.contestName || '대회를 선택해주세요.'}
        </span>
        <FaChevronDown className={`hover:text-[rgb(172,222,191)] ${isOpen ? 'text-mainGreen' : 'text-subGreen'}`} />
      </button>

      {isOpen && options && (
        <ul
          className="border-lightGray absolute z-10 mt-4 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-sm"
          ref={dropdownRef}
        >
          {options.map((options) => (
            <li
              key={options.contestId}
              className={`border-whiteGray cursor-pointer border-b-1 p-4 transition-colors duration-200 ease-in-out ${
                options.contestId === selectedContestId ? 'bg-whiteGray text-mainGreen' : 'hover:bg-whiteGray'
              }`}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {options.contestName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContestMenu;
