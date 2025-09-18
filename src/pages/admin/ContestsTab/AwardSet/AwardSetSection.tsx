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
      {patchAdmin.awardPatchSectionAvailable ? (
        <>
          <TeamSelect teamList={patchAdmin.teamList} onChange={patchAdmin.onSelectTeam} />
          <AwardNameInput value={patchAdmin.awardState.awardName ?? ''} onChange={patchAdmin.onChangeAwardName} />
          <AwardColorSelect value={patchAdmin.awardState.awardColor ?? ''} onChange={patchAdmin.onChangeAwardColor} />
          <div className="flex justify-end gap-3">
            <Button variant="outline" disabled={!patchAdmin.awardPatchSubmitAvailable} onClick={patchAdmin.deleteAward}>
              삭제
            </Button>
            <Button variant="default" disabled={!patchAdmin.awardPatchSubmitAvailable} onClick={patchAdmin.saveAward}>
              저장
            </Button>
          </div>
        </>
      ) : (
        <p className="text-lg">
          수상 설정을 위해 <span className="bg-subGreen rounded-md p-1 px-3">진행 중 대회</span> 탭에서 프로젝트 정렬
          설정을 <span className="bg-mainGreen rounded-md p-1 px-3 font-medium text-white">수상 정렬순</span>으로
          변경해주세요!
        </p>
      )}
    </div>
  );
};

export default AwardSetSection;
