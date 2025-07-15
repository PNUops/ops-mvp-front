import apiClient from './apiClient';
import {
  ProjectDetailsResponseDto,
  PreviewImagesResponseDto,
  LikeUpdateRequestDto,
  CommentCreateRequestDto,
  CommentDeleteRequestDto,
  CommentEditRequestDto,
  CommentDto,
  PreviewResult,
} from 'types/DTO/projectViewerDto';

export const getProjectDetails = async (teamId: number): Promise<ProjectDetailsResponseDto> => {
  const response = await apiClient.get(`/teams/${teamId}`);
  return response.data;
};

export const getPreviewImages = async (teamId: number, imageIds: number[]): Promise<PreviewImagesResponseDto> => {
  const imageResults: PreviewResult[] = [];

  for (const imageId of imageIds) {
    try {
      const response = await apiClient.get(`/teams/${teamId}/image/${imageId}`, {
        responseType: 'blob',
      });
      if (response.status === 200) {
        const objectUrl = URL.createObjectURL(response.data);
        imageResults.push({ id: imageId, status: 'success', url: objectUrl });
      } else if (response.status === 202) {
        imageResults.push({ status: 'processing', code: 'PREVIEW_PROCESSING' });
      } else {
        const objectUrl = URL.createObjectURL(response.data);
        imageResults.push({ id: imageId, status: 'success', url: objectUrl });
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        imageResults.push({ status: 'error', code: 'PREVIEW_NOTFOUND' });
      } else {
        imageResults.push({ status: 'error', code: 'PREVIEW_ERR_ETC' });
      }
    }
  }

  return { imageResults };
};

export const patchLikeToggle = async (request: LikeUpdateRequestDto) => {
  const { teamId, isLiked } = request;
  const response = await apiClient.patch(`/teams/${teamId}/like`, { isLiked });
  return response.data;
};

export const postCommentForm = async ({ teamId, description }: CommentCreateRequestDto) => {
  const response = await apiClient.post(`/teams/${teamId}/comments`, { description });
  return response.data;
};

export const deleteComment = async ({ teamId, commentId }: CommentDeleteRequestDto) => {
  await apiClient.delete(`teams/${teamId}/comments/${commentId}`);
};

export const editComment = async ({ teamId, commentId, description }: CommentEditRequestDto) => {
  const response = await apiClient.patch(`teams/${teamId}/comments/${commentId}`, { description });
  return response.data;
};

export const getCommentsList = async (teamId: number): Promise<CommentDto[]> => {
  const response = await apiClient.get(`/teams/${teamId}/comments`);
  return response.data;
};
