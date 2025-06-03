import apiClient from './apiClient';
import {
  ProjectDetailsEditDto,
  ThumbnailUploadRequestDto,
  ThumbnailDeleteRequestDto,
  PreviewUploadRequestDto,
  PreviewDeleteRequestDto,
} from 'types/DTO/projectEditorDto';

export const patchProjectDetails = async (teamId: number, body: ProjectDetailsEditDto) => {
  const response = await apiClient.patch(`/teams/${teamId}`, body);
  return response.data;
};

export const postThumbnail = async (teamId: number, body: ThumbnailUploadRequestDto) => {
  const response = await apiClient.post(`/teams/${teamId}/image/thumbnail`, body);
  return response.data;
};

export const deleteThumbnail = async (teamId: number, body: ThumbnailDeleteRequestDto) => {
  const response = await apiClient.delete(`/teams/${teamId}/image/thumbnail`, { data: body });
  return response.data;
};

export const postPreview = async (teamId: number, body: PreviewUploadRequestDto) => {
  const response = await apiClient.post(`/teams/${teamId}/image`, body);
  return response.data;
};

export const deletePreview = async (teamId: number, body: PreviewDeleteRequestDto) => {
  const response = await apiClient.delete(`/teams/${teamId}/image`, { data: body });
  return response.data;
};
