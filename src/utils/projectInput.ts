import { isValidGithubUrl, isValidYoutubeUrl, isValidProjectUrl } from 'utils/urls';

import { PreviewImage } from 'types/DTO/projectEditorDto';

export const validateProjectInputs = (
  {
    projectName,
    teamName,
    githubUrl,
    youtubeUrl,
    overview,
    prodUrl,
    currentThumbnail,
    currentPreviews,
    thumbnailToUpload,
    previewImagesToUpload,
  }: {
    projectName: string;
    teamName: string;
    githubUrl: string;
    youtubeUrl: string;
    overview: string;
    prodUrl: string | null;
    currentThumbnail: string | null;
    currentPreviews: PreviewImage[];
    thumbnailToUpload: File | null;
    previewImagesToUpload: File[];
  },
  isAdmin: boolean,
  isLeaderOfThisTeam: boolean,
): string | null => {
  if (isAdmin) {
    if (!projectName) return '프로젝트명이 입력되지 않았어요.';
    if (!teamName) return '팀명이 입력되지 않았어요.';
  }
  if (isLeaderOfThisTeam) {
    if (!currentThumbnail && !currentPreviews.length && !thumbnailToUpload && !previewImagesToUpload.length)
      return '썸네일과 프리뷰 이미지가 모두 업로드되지 않았어요.';
    if (!currentThumbnail && !thumbnailToUpload) return '썸네일이 업로드 되지 않았어요.';
    if (!currentPreviews.length && !previewImagesToUpload.length) return '프리뷰 이미지가 업로드 되지 않았어요.';
  }
  if (!githubUrl) return '깃허브 링크가 입력되지 않았어요.';
  if (!youtubeUrl) return '유튜브 링크가 입력되지 않았어요.';
  if (!overview) return '프로젝트 소개글이 작성되지 않았어요.';
  if (prodUrl && !isValidProjectUrl(prodUrl)) return '유효한 프로젝트 주소를 입력하세요.';
  if (!isValidGithubUrl(githubUrl)) return '유효한 깃헙 URL을 입력하세요.';
  if (!isValidYoutubeUrl(youtubeUrl)) return '유효한 유튜브 URL을 입력하세요.';
  return null;
};
