import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from './useToast';
import { createImageFormData, imageValidator } from 'utils/image';

import { postThumbnail, deleteThumbnail, postPreview, deletePreview } from 'apis/projectEditor';

const useDeleteThumbnail = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: ({ teamId }: { teamId: number }) => deleteThumbnail(teamId),
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['thumbnailImage', variables.teamId] }),
    onError: (error: any, variables) => {
      let errorMessage = '알 수 없는 오류로 썸네일 이미지 삭제에 실패했어요';

      if (error && error.response && error.response.status) {
        errorMessage = error.response.data?.message;
      } else if (error && error.message && error.message.includes('Network Error')) {
        errorMessage = '네트워크 연결 상태를 확인해주세요.';
      }

      toast(errorMessage, 'error');
      console.error(`썸네일 이미지 삭제 실패 (Team ID: ${variables.teamId}):`, error);
    },
  });
};

const useUploadThumbnail = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: ({ teamId, thumbnailImageToUpload }: { teamId: number; thumbnailImageToUpload: FormData }) =>
      postThumbnail(teamId, thumbnailImageToUpload),
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['thumbnailImage', variables.teamId] }),
    onError: (error: any, variables) => {
      let errorMessage = '알 수 없는 오류로 썸네일 이미지 업로드에 실패했어요';

      if (error && error.response && error.response.status) {
        errorMessage = error.response.data?.message;
      } else if (error && error.message && error.message.includes('Network Error')) {
        errorMessage = '네트워크 연결 상태를 확인해주세요.';
      }

      toast(errorMessage, 'error');
      console.error(`썸네일 이미지 업로드 실패 (Team ID: ${variables.teamId}):`, error);
    },
  });
};

const useDeletePreviews = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: ({ teamId, previewImageIdsToDelete }: { teamId: number; previewImageIdsToDelete: number[] }) =>
      deletePreview(teamId, { imageIds: previewImageIdsToDelete }),
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['previewImages', variables.teamId] }),
    onError: (error: any, variables) => {
      let errorMessage = '알 수 없는 오류로 프리뷰 이미지 삭제에 실패했어요';

      if (error && error.response && error.response.status) {
        errorMessage = error.response.data?.message;
      } else if (error && error.message && error.message.includes('Network Error')) {
        errorMessage = '네트워크 연결 상태를 확인해주세요.';
      }

      toast(errorMessage, 'error');
      console.error(`프리뷰 이미지 삭제 실패 (Team ID: ${variables.teamId}):`, error);
    },
  });
};

const useUploadPreviews = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: ({ teamId, previewImagesToUpload }: { teamId: number; previewImagesToUpload: FormData }) =>
      postPreview(teamId, previewImagesToUpload),
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['previewImages', variables.teamId] }),
    onError: (error: any, variables) => {
      let errorMessage = '알 수 없는 오류로 프리뷰 이미지 업로드에 실패했어요';

      if (error && error.response && error.response.status) {
        errorMessage = error.response.data?.message;
      } else if (error && error.message && error.message.includes('Network Error')) {
        errorMessage = '네트워크 연결 상태를 확인해주세요.';
      }

      toast(errorMessage, 'error');
      console.error(`프리뷰 이미지 업로드 실패 (Team ID: ${variables.teamId}):`, error);
    },
  });
};

interface UpdateImagesParams {
  teamId: number;
  thumbnailImageToUpload: File | null;
  isThumbnailDeleted: boolean;
  previewImagesToUpload: File[];
  previewImageIdsToDelete: number[];
}

const useImagesUpdate = () => {
  const toast = useToast();

  const { mutateAsync: deleteThumbnailMutate } = useDeleteThumbnail();
  const { mutateAsync: uploadThumbnailMutate } = useUploadThumbnail();
  const { mutateAsync: deletePreviewsMutate } = useDeletePreviews();
  const { mutateAsync: uploadPreviewsMutate } = useUploadPreviews();

  const updateImages = async ({
    teamId,
    thumbnailImageToUpload,
    isThumbnailDeleted,
    previewImagesToUpload,
    previewImageIdsToDelete,
  }: UpdateImagesParams) => {
    try {
      const promises: Promise<any>[] = [];

      if (isThumbnailDeleted) {
        promises.push(deleteThumbnailMutate({ teamId }));
      }

      if (previewImageIdsToDelete.length > 0) {
        promises.push(deletePreviewsMutate({ teamId, previewImageIdsToDelete }));
      }

      if (thumbnailImageToUpload) {
        const validateResult = imageValidator(thumbnailImageToUpload);
        if (!validateResult.isValid) {
          toast(validateResult.message[0], 'error');
          return;
        }
        const thumbnailFormData = createImageFormData(thumbnailImageToUpload);
        promises.push(uploadThumbnailMutate({ teamId, thumbnailImageToUpload: thumbnailFormData }));
      }

      if (previewImagesToUpload.length > 0) {
        const validateResult = imageValidator(previewImagesToUpload);
        if (!validateResult.isValid) {
          toast(validateResult.message[0], 'error');
          return;
        }
        const previewsFormData = createImageFormData(previewImagesToUpload);
        promises.push(uploadPreviewsMutate({ teamId, previewImagesToUpload: previewsFormData }));
      }

      await Promise.all(promises);
    } catch (error) {
      toast('이미지 업데이트 중 알 수 없는 오류가 발생했어요', 'error');
      throw error;
    }
  };
  return { updateImages };
};

export default useImagesUpdate;
