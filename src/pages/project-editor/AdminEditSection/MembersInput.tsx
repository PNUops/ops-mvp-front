import { useState, useEffect } from 'react';
import { TeamMember } from 'types/DTO/projectViewerDto';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';

interface MembersInputProps {
  teamMembers: TeamMember[];
  onMemberAdd: (newMemberName: string) => void;
  onMemberRemove: (teamMemberId: number) => void;
}

const MAX_MEMBERS = 6;

const MembersInput = ({ teamMembers, onMemberAdd, onMemberRemove }: MembersInputProps) => {
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const emptySlotsCount = MAX_MEMBERS - teamMembers.length;

  const [newInputs, setnewInputs] = useState<string[]>([]);

  useEffect(() => {
    const newInputsMap: Record<string, string> = {};
    teamMembers.forEach((member) => {
      newInputsMap[member.teamMemberId.toString()] = member.teamMemberName ?? '';
    });
    setInputs(newInputsMap);
  }, [teamMembers]);

  useEffect(() => {
    setnewInputs((prev) => {
      const newLength = emptySlotsCount;
      const currentLength = prev.length;

      if (newLength === currentLength) {
        return prev;
      }

      const updatedNames = Array(newLength).fill('');

      for (let i = 0; i < Math.min(currentLength, newLength); i++) {
        updatedNames[i] = prev[i] ?? '';
      }
      return updatedNames;
    });
  }, [emptySlotsCount]);

  const handleNewInputChange = (idx: number, value: string) => {
    setnewInputs((prev) => {
      const copy = [...prev];
      copy[idx] = value;
      return copy;
    });
  };

  const handleAddNewMember = (idx: number) => {
    const trimmed = (newInputs[idx] ?? '').trim();
    if (!trimmed) return;
    onMemberAdd(trimmed);
    setnewInputs((prev) => {
      const copy = [...prev];
      copy[idx] = '';
      return copy;
    });
  };

  return (
    <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-start sm:gap-10">
      <div className="text-midGray flex w-25 gap-1">
        <span className="mr-1 text-red-500">*</span>
        <span className="w-full">팀원</span>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="grid w-full grid-cols-1 gap-3 text-sm lg:grid-cols-2">
          {/* Render existing team members */}
          {teamMembers.map((member) => (
            <div
              key={member.teamMemberId}
              className="border-mainGreen relative flex items-center gap-1 rounded border px-4 py-2 text-sm"
            >
              <IoPersonOutline className="text-mainGreen mr-2" size={20} />
              <input
                type="text"
                className="placeholder:text-lightGray flex-1 bg-transparent focus:outline-none"
                value={inputs[member.teamMemberId.toString()] || ''}
                disabled
                readOnly
              />
              <button
                type="button"
                onClick={() => onMemberRemove(member.teamMemberId)}
                className="text-mainGreen"
                aria-label={`Remove member ${member.teamMemberName ?? 'unknown'}`}
              >
                <IoIosRemove size={24} />
              </button>
            </div>
          ))}
          {Array.from({ length: emptySlotsCount }).map((_, idx) => (
            <div
              key={`new-${idx}`}
              className="relative flex items-center gap-1 rounded border border-gray-300 px-4 py-2 text-sm"
            >
              <IoPersonOutline className="text-lightGray mr-2" size={20} />
              <input
                type="text"
                placeholder="팀원명을 입력해주세요."
                className="placeholder:text-lightGray flex-1 bg-transparent focus:outline-none"
                value={newInputs[idx] ?? ''}
                onChange={(e) => handleNewInputChange(idx, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (newInputs[idx] ?? '').trim()) {
                    handleAddNewMember(idx);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => handleAddNewMember(idx)}
                className={`${(newInputs[idx] ?? '').trim() ? 'text-mainGreen' : 'text-lightGray'}`}
                disabled={!(newInputs[idx] ?? '').trim()}
                aria-label="Add member"
              >
                <IoIosAdd size={24} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersInput;
