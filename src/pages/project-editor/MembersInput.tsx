import { useState } from 'react';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { IoPerson } from 'react-icons/io5';

interface MembersInputProps {
  memberList: string[];
  onMemberChange: (index: number, name: string) => void;
  onMemberAdd: (name: string) => void;
  onMemberRemove: (index: number) => void;
  max: number;
}

const MembersInput = ({ memberList, onMemberChange, onMemberAdd, onMemberRemove, max }: MembersInputProps) => {
  const [newMember, setNewMember] = useState('');

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <IoPerson className="text-midGray absolute top-1/2 left-5 -translate-y-1/2" size={20} />
          <input
            type="text"
            className="placeholder-lightGray focus:outline-lightGray w-full rounded bg-gray-100 py-3 pr-10 pl-15 text-sm text-black focus:outline-1"
            placeholder="팀원의 이름"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
          />
          {newMember.trim().length > 0 && memberList.length < max && (
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
      {memberList.filter((m) => m.trim() !== '').length > 0 && (
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          {memberList.map(
            (member, index) =>
              member.trim() !== '' && (
                <div key={index} className="relative w-full">
                  <IoPerson className="text-mainGreen absolute top-1/2 left-5 -translate-y-1/2" size={20} />
                  <div className="border-mainGreen w-full rounded border py-3 pr-10 pl-15 text-sm text-black">
                    {member}
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
