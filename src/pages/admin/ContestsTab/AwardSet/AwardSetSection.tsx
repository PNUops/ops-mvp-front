import { useState, useEffect } from 'react';
import { Button } from '@components/ui/button';
import TeamSelect from './TeamSelect';
import AwardNameInput from './AwardNameInput';
import AwardColorSelect from './AwardColorSelect';

import { useAwardPatchAdmin } from 'hooks/useAwardAdmin';

interface AwardSetSectionProps {
  contestId: number;
}

const AwardSetSection = ({ contestId }: AwardSetSectionProps) => {
  const patchAdmin = useAwardPatchAdmin(contestId);

  if (!patchAdmin) {
    return <>Loading...</>;
  }

  return (
    <div className="border-lightGray flex w-full flex-col gap-4 rounded-xl border p-8">
      <h3 className="text-sm font-bold">수상 설정</h3>
      <TeamSelect teamList={patchAdmin.teamList} onChange={patchAdmin.onSelectTeam} />
      <AwardNameInput value={patchAdmin.awardState.awardName ?? ''} onChange={patchAdmin.onChangeAwardName} />
      <AwardColorSelect value={patchAdmin.awardState.awardColor ?? ''} onChange={patchAdmin.onChangeAwardColor} />
      <div className="flex justify-end gap-3">
        <Button variant="outline" disabled={!patchAdmin.awardPatchAvailable} onClick={patchAdmin.deleteAward}>
          삭제
        </Button>
        <Button variant="default" disabled={!patchAdmin.awardPatchAvailable} onClick={patchAdmin.saveAward}>
          저장
        </Button>
      </div>
    </div>
  );
};

export default AwardSetSection;
