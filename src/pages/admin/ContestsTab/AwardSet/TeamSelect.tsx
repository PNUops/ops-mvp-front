import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { TeamListItemResponseDto } from 'types/DTO/teams/teamListDto';

interface TeamSelectProps {
  teamList: TeamListItemResponseDto[];
  onChange: (teamId: number) => void;
}

const TeamSelect = ({ teamList, onChange }: TeamSelectProps) => {
  const title = '팀 선택';
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    const teamId = parseInt(value, 10);
    onChange(teamId);
  };

  return (
    <div className="flex flex-1 items-center gap-4">
      <h4 className="w-30 text-sm leading-none">{title}</h4>
      <Select value={selectedValue} onValueChange={handleValueChange}>
        <SelectTrigger className="focus:outline:none focus:border-mainGreen w-full overflow-hidden border text-sm focus:ring-0">
          <SelectValue placeholder="수상팀을 선택해주세요." className="truncate" />
        </SelectTrigger>
        <SelectContent className="text-sm">
          {teamList.map((team) => {
            const selectText = `${team.teamId}. ${team.teamName} - ${team.projectName}`;
            return (
              <SelectItem key={team.teamId} value={team.teamId.toString()} className="overflow-hidden">
                <span className="block w-full truncate">{selectText}</span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TeamSelect;
