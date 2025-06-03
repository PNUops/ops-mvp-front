import apiClient from './apiClient';
import {
  ProjectDetailsResponseDto,
  PreviewImagesResponseDto,
  LikeRequestDto,
  CommentFormRequestDto,
  CommentDeleteRequestDto,
  CommentEditRequestDto,
  CommentDto,
} from 'types/DTO/projectViewerDto';

export const getProjectDetails = async (teamId: number): Promise<ProjectDetailsResponseDto> => {
  const response = await apiClient.get(`/teams/${teamId}`);
  return response.data;
};

export const getPreviewImages = async (teamId: number, imageIds: number[]): Promise<PreviewImagesResponseDto> => {
  const imageUrls: string[] = await Promise.all(
    imageIds.map(async (imageId: number): Promise<string> => {
      const response = await apiClient.get(`/teams/${teamId}/image/${imageId}`, {
        responseType: 'blob',
      });
      return URL.createObjectURL(response.data);
    }),
  );
  return { imageUrls };
};

export const patchLikeToggle = async (request: LikeRequestDto) => {
  const { teamId, isLiked } = request;
  const response = await apiClient.patch(`/teams/${teamId}/like`, { isLiked });
  return response.data;
};

export const postCommentForm = async ({ teamId, description }: CommentFormRequestDto) => {
  const response = await apiClient.post(`/teams/${teamId}/comments`, { description });
  return response.data;
};

export const deleteComment = async ({teamId, commentId}: CommentDeleteRequestDto) => {
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
