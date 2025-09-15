import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import useTeamList from 'hooks/useTeamList';
import { patchTeamAward } from 'apis/teams';
import { Button } from '@components/ui/button';
import TeamSelect from './TeamSelect';
import AwardNameInput from './AwardNameInput';
import AwardColorSelect from './AwardColorSelect';

interface AwardSetSectionProps {
  contestId: number;
}

const AwardSetSection = ({ contestId }: AwardSetSectionProps) => {
  const { data: teamList } = useTeamList(contestId);
  const mutation = useMutation({
    mutationFn: ({
      teamId,
      awardName,
      awardColor,
    }: {
      teamId: number;
      awardName: string | null;
      awardColor: string | null;
    }) => patchTeamAward(teamId, { awardName, awardColor }),
    onSuccess: () => {
      console.log('수상 설정이 성공적으로 저장되었어요');
    },
  });

  const [selectedTeamId, setSelectedTeamId] = useState<number | undefined>(undefined);
  const [awardName, setAwardName] = useState<string>('');
  const [awardColor, setAwardColor] = useState<string>('');

  useEffect(() => {
    if (!teamList || selectedTeamId === undefined) return;
    const team = teamList.find((t) => t.teamId === selectedTeamId);
    if (team) {
      setAwardName(team.awardName || '');
      setAwardColor(team.awardColor || '');
    }
  }, [selectedTeamId, teamList]);

  if (!contestId || !teamList) return null;

  const handleTeamSelect = (teamId: number) => {
    setSelectedTeamId(teamId);
    console.log('선택된 팀 ID:', teamId);
  };

  const handleAwardNameChange = (value: string) => {
    setAwardName(value);
    console.log('수상 명칭:', value);
  };

  const handleAwardColorChange = (color: string) => {
    setAwardColor(color);
    console.log('수상 색상:', color);
  };

  const handleAwardSetDelete = () => {
    console.log('수상 설정 삭제:', selectedTeamId);
    mutation.mutate({ teamId: selectedTeamId as number, awardName: null, awardColor: null });
    setAwardName('');
    setAwardColor('');
  };

  const handleAwardSetSave = () => {
    console.log('수상 설정 저장:', { selectedTeamId, awardName, awardColor });
    mutation.mutate({ teamId: selectedTeamId as number, awardName, awardColor });
  };

  return (
    <div className="border-lightGray flex w-full flex-col gap-4 rounded-xl border p-8">
      <h3 className="text-sm font-bold">수상 설정</h3>
      <TeamSelect teamList={teamList} onChange={handleTeamSelect} />
      <AwardNameInput value={awardName} onChange={handleAwardNameChange} />
      <AwardColorSelect value={awardColor} onChange={handleAwardColorChange} />
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleAwardSetDelete}>
          삭제
        </Button>
        <Button variant="default" onClick={handleAwardSetSave}>
          저장
        </Button>
      </div>
    </div>
  );
};

export default AwardSetSection;
