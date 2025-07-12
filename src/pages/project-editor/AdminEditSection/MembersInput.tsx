import { useState, useEffect } from 'react';
import { TeamMember } from 'types/DTO/projectViewerDto';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';

interface MembersInputProps {
  teamMembers: TeamMember[];
  onMemberAdd: (newMemberName: string) => void;
  onMemberRemove: (index: number) => void;
}

const MAX_MEMBERS = 6;

const MembersInput = ({ teamMembers, onMemberAdd, onMemberRemove }: MembersInputProps) => {
  const [inputs, setInputs] = useState<string[]>(
    Array.from({ length: MAX_MEMBERS }, (_, i) => teamMembers[i]?.teamMemberName || ''),
  );
  const [added, setAdded] = useState<boolean[]>(
    Array.from({ length: MAX_MEMBERS }, (_, i) => !!teamMembers[i]?.teamMemberName),
  );

  const handleInputChange = (idx: number, value: string) => {
    setInputs((inputs) => inputs.map((v, i) => (i === idx ? value : v)));
  };

  const handleAdd = (idx: number) => {
    if (!inputs[idx].trim()) return;
    setAdded((added) => added.map((a, i) => (i === idx ? true : a)));
    onMemberAdd(inputs[idx].trim());
  };

  const handleRemove = (idx: number) => {
    setInputs((inputs) => inputs.map((v, i) => (i === idx ? '' : v)));
    setAdded((added) => added.map((a, i) => (i === idx ? false : a)));
    onMemberRemove(idx);
  };

  useEffect(() => {
    setInputs(Array.from({ length: MAX_MEMBERS }, (_, i) => teamMembers[i]?.teamMemberName || ''));
    setAdded(Array.from({ length: MAX_MEMBERS }, (_, i) => !!teamMembers[i]?.teamMemberName));
  }, [teamMembers]);

  return (
    <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-start sm:gap-10">
      <div className="text-midGray flex w-25 gap-1">
        <span className="mr-1 text-red-500">*</span>
        <span className="w-full">팀원</span>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="grid w-full grid-cols-1 gap-3 text-sm lg:grid-cols-2">
          {Array.from({ length: MAX_MEMBERS }).map((_, idx) => (
            <div
              key={idx}
              className={`relative flex items-center gap-1 rounded border px-4 py-2 text-sm ${added[idx] ? 'border-mainGreen' : 'border-gray-300'}`}
            >
              <IoPersonOutline className={`${added[idx] ? 'text-mainGreen' : 'text-lightGray'} mr-2`} size={20} />
              <input
                type="text"
                className="placeholder:text-lightGray flex-1 bg-transparent focus:outline-none"
                placeholder="팀원명을 입력해주세요."
                value={inputs[idx]}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                disabled={added[idx]}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !added[idx] && inputs[idx].trim()) handleAdd(idx);
                }}
              />
              {!added[idx] && (
                <button
                  type="button"
                  onClick={() => handleAdd(idx)}
                  className={`focus:outline-none ${inputs[idx].trim() ? 'text-mainGreen' : 'text-lightGray'}`}
                  disabled={!inputs[idx].trim()}
                  aria-label="Add member"
                >
                  <IoIosAdd size={24} />
                </button>
              )}
              {added[idx] && (
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="text-mainGreen focus:outline-none"
                  aria-label="Remove member"
                >
                  <IoIosRemove size={24} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersInput;
