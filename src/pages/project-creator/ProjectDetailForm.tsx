import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from 'hooks/useToast';

import { postMember, postThumbnail, postPreview } from 'apis/projectEditor';

import { PreviewImage } from 'types/DTO/projectViewerDto';
import { TeamMember } from 'types/DTO/projectViewerDto';

import MembersInput from '@pages/project-editor/AdminEditSection/MembersInput';
import ImageUploaderSection from '@pages/project-editor/ImageUploaderSection';

interface ProjectDetailFormProps {
  teamId: number | null;
}

const ProjectDetailForm = ({ teamId }: ProjectDetailFormProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [thumbnail, setThumbnail] = useState<string | File | undefined>();
  const [thumbnailToDelete, setThumbnailToDelete] = useState<boolean>(false);
  const [previews, setPreviews] = useState<PreviewImage[]>([]);
  const [previewsToDelete, setPreviewsToDelete] = useState<number[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  if (!teamId)
    return (
      <div className="animate-pulse rounded-lg border border-dashed border-gray-300 bg-white px-6 py-4 text-center shadow-sm">
        <p className="text-midGray text-sm font-medium">
          <span className="inline-block animate-pulse rounded bg-gray-200 px-2 py-1">프로젝트 기본 정보</span> 를
          등록하시면, <br className="sm:hidden" />
          팀원과 이미지를 추가할 수 있는 창이 열려요!
        </p>
      </div>
    );

  const handleSave = async () => {
    const validateDetailInputs = () => {
      if (teamMembers.length < 1) return '등록된 팀원이 없어요';
      if (!thumbnail && !previews.length) return '썸네일과 프리뷰 이미지가 모두 업로드되지 않았어요.';
      if (!thumbnail) return '썸네일이 업로드 되지 않았어요.';
      if (!previews.length) return '프리뷰 이미지가 업로드 되지 않았어요.';
      return null;
    };

    const errorMessage = validateDetailInputs();
    if (errorMessage) {
      toast(errorMessage, 'error');
      return;
    }

    try {
      const addMemberPromises = teamMembers.map(
        async (member) => await postMember(teamId, { teamMemberName: member.teamMemberName }),
      );
      await Promise.all(addMemberPromises);

      if (thumbnail instanceof File) {
        const formData = new FormData();
        formData.append('image', thumbnail);
        await postThumbnail(teamId, formData);
      }

      const newFiles = previews.filter((p) => p.url instanceof File).map((p) => p.url as File);
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => formData.append('images', file));
        await postPreview(teamId, formData);
      }

      toast('세부 정보 등록이 완료되었습니다', 'success');
      setTimeout(() => navigate(`/teams/view/${teamId}`), 300);
      queryClient.invalidateQueries({ queryKey: ['projectDetails', teamId] });
      queryClient.invalidateQueries({ queryKey: ['thumbnail', teamId] });
      queryClient.invalidateQueries({ queryKey: ['previewImages', teamId] });
    } catch (err: any) {
      toast('일부 정보 등록에 실패했어요. 수정 페이지에서 다시 시도해주세요.', 'error');
      setTimeout(() => navigate(`/teams/edit/${teamId}`), 300);
    }
  };

  const onMemberAdd = (newMemberName: string) => {
    setTeamMembers((prevMembers) => [...prevMembers, { teamMemberId: Date.now(), teamMemberName: newMemberName }]);
  };

  const onMemberRemove = (index: number) => {
    setTeamMembers((prevMembers) => prevMembers.filter((_, idx) => idx !== index));
  };

  return (
    <>
      <div className="flex flex-1 flex-col">
        <MembersInput teamMembers={teamMembers} onMemberAdd={onMemberAdd} onMemberRemove={onMemberRemove} />
        <div className="h-15" />
        <ImageUploaderSection
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          previews={previews}
          setPreviews={setPreviews}
          setThumbnailToDelete={setThumbnailToDelete}
          previewsToDelete={previewsToDelete}
          setPreviewsToDelete={setPreviewsToDelete}
        />
      </div>
      <>
        <div className="h-10" />
        <div className="flex justify-end gap-5 sm:gap-10">
          <button
            onClick={handleSave}
            className="bg-mainGreen rounded-full px-4 py-2 text-sm font-bold text-white hover:cursor-pointer hover:bg-green-700 focus:bg-green-400 focus:outline-none sm:px-15 sm:py-4"
          >
            등록
          </button>
        </div>
      </>
    </>
  );
};

export default ProjectDetailForm;
