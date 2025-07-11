import apiClient from './apiClient';
import { ProjectDetailsEditDto, PreviewDeleteRequestDto, TeamMemberCreateRequestDto } from 'types/DTO/projectEditorDto';

export const patchProjectDetails = async (teamId: number, body: ProjectDetailsEditDto) => {
  const response = await apiClient.patch(`/teams/${teamId}`, body);
  return response.data;
};

export const getThumbnail = async (teamId: number): Promise<string> => {
  try {
    const response = await apiClient.get(`/teams/${teamId}/image/thumbnail`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error: any) {
    if (error.response?.status === 409) {
      return 'THUMBNAIL_ERR_409';
    } else if (error.response?.status === 404) {
      return 'THUMBNAIL_ERR_404';
    } else {
      return 'THUMBNAIL_ERR_ETC';
    }
  }
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

export const postMember = async (teamId: number, body: TeamMemberCreateRequestDto) => {
  const response = await apiClient.post(`/teams/${teamId}/members`, body);
  return response.data;
};

export const deleteMember = async (teamId: number, memberId: number) => {
  const response = await apiClient.delete(`/teams/${teamId}/members/${memberId}`);
  return response.data;
};

export const createProjectDetails = async (body: ProjectDetailsEditDto) => {
  const response = await apiClient.post('/teams', body);
  return response.data;
};
