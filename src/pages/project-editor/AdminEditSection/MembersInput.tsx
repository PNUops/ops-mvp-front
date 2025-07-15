import { useState } from 'react';
import { TeamMember } from 'types/DTO/projectViewerDto';
import { IoPerson } from 'react-icons/io5';

interface MembersInputProps {
  teamMembers: TeamMember[];
  onMemberAdd: (newMemberName: string) => void;
  onMemberRemove: (teamMemberId: number) => void;
}

const MAX_MEMBERS = 6;

const MembersInput = ({ teamMembers, onMemberAdd, onMemberRemove }: MembersInputProps) => {
  const [newMemberInput, setNewMemberInput] = useState('');

  const handleAddMember = () => {
    const trimmed = newMemberInput.trim();
    if (!trimmed || teamMembers.length >= MAX_MEMBERS) return;
    onMemberAdd(trimmed);
    setNewMemberInput('');
  };

  return (
    <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-start sm:gap-10">
      <div className="text-midGray flex w-25 sm:py-3">
        <span className="mr-1 text-red-500">*</span>
        <span>팀원</span>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
          {teamMembers.map((member) => (
            <div
              key={member.teamMemberId}
              className="border:lightGray relative w-full rounded border py-3 pr-5 pl-15 text-sm text-black"
            >
              <IoPerson className="text-mainGreen/50 absolute top-1/2 left-5 -translate-y-1/2" size={20} />
              <div className="truncate pr-12">{member.teamMemberName}</div>
              <button
                type="button"
                onClick={() => onMemberRemove(member.teamMemberId)}
                className="absolute top-1/2 right-5 -translate-y-1/2 text-xs text-red-500 hover:cursor-pointer hover:text-red-700"
              >
                삭제
              </button>
            </div>
          ))}
          {teamMembers.length < MAX_MEMBERS && (
            <div className="relative w-full">
              <IoPerson className="text-lightGray absolute top-1/2 left-5 -translate-y-1/2" size={20} />
              <input
                type="text"
                placeholder="팀원명을 입력해주세요."
                className="placeholder-lightGray border-lightGray focus:border-mainGreen w-full truncate rounded border py-3 pr-5 pl-15 text-sm text-black duration-300 ease-in-out focus:outline-none"
                value={newMemberInput}
                onChange={(e) => setNewMemberInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddMember();
                }}
              />
              <button
                type="button"
                onClick={handleAddMember}
                disabled={!newMemberInput.trim()}
                className={`absolute top-1/2 right-5 -translate-y-1/2 text-xs font-medium hover:cursor-pointer ${
                  newMemberInput.trim() ? 'text-mainGreen hover:text-green-700' : 'cursor-not-allowed text-gray-300'
                }`}
              >
                추가
              </button>
            </div>
          )}
        </div>
        <p className="text-lightGray text-xs">
          최대 {MAX_MEMBERS}명까지 등록할 수 있어요 ({MAX_MEMBERS - teamMembers.length}명 남음)
        </p>
      </div>
    </div>
  );
};

export default MembersInput;
