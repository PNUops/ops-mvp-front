import { useState } from 'react';

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
  const [newMember, setNewMember] = useState('');

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <IoPersonOutline className="text-midGray absolute top-1/2 left-5 -translate-y-1/2" size={20} />
          <input
            type="text"
            className="placeholder-lightGray focus:outline-lightGray w-full rounded bg-gray-100 py-3 pr-10 pl-15 text-sm text-black focus:outline-1"
            placeholder="팀원의 이름"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
          />
          {newMember.trim().length > 0 && teamMembers.length < MAX_MEMBERS && (
            <button
              onClick={() => {
                onMemberAdd(newMember.trim());
                setNewMember('');
              }}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-white"
            >
              <IoIosAdd className="text-mainGreen rounded p-1" size={30} />
            </button>
          )}
        </div>
        <div className="flex-1" />
      </div>
      {teamMembers.filter((member) => member.teamMemberName.trim() !== '').length > 0 && (
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
          {teamMembers.map(
            (member, index) =>
              member.teamMemberName.trim() !== '' && (
                <div key={index} className="relative w-full">
                  <IoPersonOutline className="text-mainGreen absolute top-1/2 left-5 -translate-y-1/2" size={20} />
                  <div className="border-mainGreen w-full truncate rounded border py-3 pr-10 pl-15 text-sm text-black">
                    {member.teamMemberName}
                  </div>
                  <button onClick={() => onMemberRemove(index)} className="absolute top-1/2 right-3 -translate-y-1/2">
                    <IoIosRemove className="text-mainGreen rounded p-1" size={30} />
                  </button>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
};

export default MembersInput;
