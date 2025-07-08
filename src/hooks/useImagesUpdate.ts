import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from './useToast';
import { createImageFormData, imageValidator } from 'utils/image';

import { postThumbnail, deleteThumbnail, postPreview, deletePreview } from 'apis/projectEditor';

const useDeleteThumbnail = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: (teamId: number) => deleteThumbnail(teamId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['thumbnailImage'] }),
    onError: () => toast('썸네일 삭제에 실패했어요.', 'error'),
  });
};

const useUploadThumbnail = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: ({ teamId, thumbnailImageToUpload }: { teamId: number; thumbnailImageToUpload: FormData }) =>
      postThumbnail(teamId, thumbnailImageToUpload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['thumbnailImage'] }),
    onError: () => toast('썸네일 업로드에 실패했어요.', 'error'),
  });
};

const useDeletePreviews = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: ({ teamId, previewImageIdsToDelete }: { teamId: number; previewImageIdsToDelete: number[] }) =>
      deletePreview(teamId, { imageIds: previewImageIdsToDelete }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['previewImages'] }),
    onError: () => toast('프리뷰 이미지 삭제에 실패했어요.', 'error'),
  });
};

const useUploadPreviews = () => {
  const [queryClient, toast] = [useQueryClient(), useToast()];

  return useMutation({
    mutationFn: ({ teamId, previewImagesToUpload }: { teamId: number; previewImagesToUpload: FormData }) =>
      postPreview(teamId, previewImagesToUpload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['previewImages'] }),
    onError: () => toast('프리뷰 이미지 업로드에 실패했어요.', 'error'),
  });
};

const useImagesUpdate = (
  teamId: number,
  thumbnailImageToUpload: File | null,
  isThumbnailDeleted: boolean,
  previewImagesToUpload: File[],
  previewImageIdsToDelete: number[],
) => {
  const toast = useToast();

  const { mutate: deleteThumbnailMutate } = useDeleteThumbnail();
  const { mutate: uploadThumbnailMutate } = useUploadThumbnail();
  const { mutate: deletePreviewsMutate } = useDeletePreviews();
  const { mutate: uploadPreviewsMutate } = useUploadPreviews();

  const updateImages = async () => {
    try {
      if (isThumbnailDeleted) {
        await deleteThumbnailMutate(teamId);
      }

      if (previewImageIdsToDelete.length > 0) {
        await deletePreviewsMutate({ teamId, previewImageIdsToDelete });
      }

      if (thumbnailImageToUpload) {
        const validateResult = imageValidator(thumbnailImageToUpload);
        if (!validateResult.isValid) {
          toast(validateResult.message[0], 'error');
          return;
        }
        const thumbnailFormData = createImageFormData(thumbnailImageToUpload);
        await uploadThumbnailMutate({ teamId, thumbnailImageToUpload: thumbnailFormData });
      }

      if (previewImagesToUpload.length > 0) {
        const validateResult = imageValidator(previewImagesToUpload);
        if (!validateResult.isValid) {
          toast(validateResult.message[0], 'error');
          return;
        }
        const previewsFormData = createImageFormData(previewImagesToUpload);
        await uploadPreviewsMutate({ teamId, previewImagesToUpload: previewsFormData });
      }
    } catch (error) {
      toast('이미지 업데이트 중 알 수 없는 오류가 발생했어요', 'error');
    }
  };
  return { updateImages };
};

export default useImagesUpdate;
