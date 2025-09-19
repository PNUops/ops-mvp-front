import { Button } from '@components/ui/button';
import TeamSelect from './TeamSelect';
import AwardNameInput from './AwardNameInput';
import AwardColorSelect from './AwardColorSelect';

import { useAwardPatchAdmin } from 'hooks/useAwardAdmin';

import { TfiHandDrag } from 'react-icons/tfi';

interface AwardSetSectionProps {
  contestId: number;
  editable: boolean;
  onSuccess?: () => void;
}

const AwardSetSection = ({ contestId, editable, onSuccess }: AwardSetSectionProps) => {
  const patchAdmin = useAwardPatchAdmin(contestId);

  if (!patchAdmin) {
    return <>Loading...</>;
  }

  return (
    <div className="border-lightGray flex w-full flex-col gap-4 rounded-xl border p-8">
      <h3 className="text-sm font-bold">수상 설정</h3>
      {editable ? (
        <>
          <TeamSelect teamList={patchAdmin.teamList} onChange={patchAdmin.onSelectTeam} />
          <AwardNameInput value={patchAdmin.awardState.awardName ?? ''} onChange={patchAdmin.onChangeAwardName} />
          <AwardColorSelect value={patchAdmin.awardState.awardColor ?? ''} onChange={patchAdmin.onChangeAwardColor} />
          <div className="flex justify-end gap-3">
            <Button
              variant="default"
              disabled={!patchAdmin.awardPatchSubmitAvailable}
              onClick={() => patchAdmin.saveAward(onSuccess)}
            >
              저장
            </Button>
            <Button
              variant="outline"
              disabled={!patchAdmin.awardPatchSubmitAvailable}
              onClick={() => patchAdmin.deleteAward(onSuccess)}
            >
              삭제
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-start gap-3 text-lg leading-relaxed">
          <p className="text-left break-words sm:text-justify">
            <b>수상 설정</b>을 하려면 <span className="bg-subGreen rounded-md p-0.5 px-3">진행 중 대회</span> 탭에서
            프로젝트 정렬 설정을{' '}
            <span className="bg-mainGreen rounded-md p-0.5 px-3 font-medium text-white">수상 정렬순</span>으로
            <b>변경</b>해주세요!
          </p>
          <p className="flex flex-wrap items-center gap-2 text-left break-words sm:text-justify">
            상훈 설정은 물론, 아래 테이블을 드래그
            <span className="rounded-md bg-gray-100 p-1">
              <TfiHandDrag />
            </span>
            하여 프로젝트 순서를 변경할 수 있어요!
          </p>
        </div>
      )}
    </div>
  );
};

export default AwardSetSection;
