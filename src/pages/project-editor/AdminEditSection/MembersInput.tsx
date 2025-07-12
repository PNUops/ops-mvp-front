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

  useEffect(() => {
    const newInputs: Record<string, string> = {};
    teamMembers.forEach((member) => {
      newInputs[member.teamMemberId.toString()] = member.teamMemberName;
    });
    setInputs(newInputs);
  }, [teamMembers]);

  const [newInputs, setNewInputs] = useState<string[]>(Array(emptySlotsCount).fill(''));

  const handleNewInputChange = (idx: number, value: string) => {
    setNewInputs((prev) => {
      const copy = [...prev];
      copy[idx] = value;
      return copy;
    });
  };

  const handleAddNewMember = (idx: number) => {
    const trimmed = newInputs[idx].trim();
    if (!trimmed) return;
    onMemberAdd(trimmed);
    setNewInputs((prev) => {
      const copy = [...prev];
      copy[idx] = '';
      return copy;
    });
  };

  return (
    <div className="grid w-full grid-cols-1 gap-3 text-sm lg:grid-cols-2">
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
            disabled // 기존 멤버는 수정 불가 (원하면 삭제 가능)
            readOnly
          />
          <button
            type="button"
            onClick={() => onMemberRemove(member.teamMemberId)}
            className="text-mainGreen"
            aria-label={`Remove member ${member.teamMemberName}`}
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
            value={newInputs[idx]}
            onChange={(e) => handleNewInputChange(idx, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newInputs[idx].trim()) handleAddNewMember(idx);
            }}
          />
          <button
            type="button"
            onClick={() => handleAddNewMember(idx)}
            className={`${newInputs[idx].trim() ? 'text-mainGreen' : 'text-lightGray'}`}
            disabled={!newInputs[idx].trim()}
            aria-label="Add member"
          >
            <IoIosAdd size={24} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MembersInput;
