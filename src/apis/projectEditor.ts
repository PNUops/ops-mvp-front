import apiClient from './apiClient';
import { ProjectDetailsEditDto, PreviewDeleteRequestDto, TeamMemberCreateRequestDto } from 'types/DTO/projectEditorDto';

export const patchProjectDetails = async (teamId: number, body: ProjectDetailsEditDto) => {
  const response = await apiClient.patch(`/teams/${teamId}`, body);
  return response.data;
};

export const getThumbnail = async (teamId: number): Promise<string> => {
  const response = await apiClient.get(`/teams/${teamId}/image/thumbnail`, {
    responseType: 'blob',
  });
  return URL.createObjectURL(response.data);
};

export const postThumbnail = async (teamId: number, formData: FormData) => {
  const response = await apiClient.post(`/teams/${teamId}/image/thumbnail`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteThumbnail = async (teamId: number) => {
  const response = await apiClient.delete(`/teams/${teamId}/image/thumbnail`);
  return response.data;
};

export const postPreview = async (teamId: number, formData: FormData) => {
  const response = await apiClient.post(`/teams/${teamId}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deletePreview = async (teamId: number, body: PreviewDeleteRequestDto) => {
  const response = await apiClient.delete(`/teams/${teamId}/image`, { data: body });
  return response.data;
};

export const postMember = async (teamId: number, teamMemberName: string) => {
  const response = await apiClient.post(`/teams/${teamId}/members`, teamMemberName);
  return response.data;
};

export const deleteMember = async (teamId: number, memberId: number) => {
  const response = await apiClient.delete(`/teams/${teamId}/members/${memberId}`);
  return response.data;
};

export const createProject = async (body: ProjectDetailsEditDto) => {
  const response = await apiClient.post('/teams', { data: body });
  return response.data;
};
