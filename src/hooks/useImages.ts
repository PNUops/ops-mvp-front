import { useQuery } from '@tanstack/react-query';

import { getThumbnail } from 'apis/projectEditor';
import { getPreviewImages } from 'apis/projectViewer';

const useImages = (teamId: number, previewImageIds: number[]) => {
  const {
    data: thumbnailImage,
    isLoading: isThumbnailImageLoading,
    isError: isThumbnailImageError,
  } = useQuery({
    queryKey: ['thumbnailImage', teamId],
    queryFn: async () => {
      if (teamId === null) throw new Error('teamId is null');
      return await getThumbnail(teamId);
    },
    enabled: teamId !== null,
  });

  const {
    data: previewImages,
    isLoading: isPreviewImagesLoading,
    isError: isPreviewImagesError,
  } = useQuery({
    queryKey: ['previewImages', teamId],
    queryFn: async () => {
      if (teamId === null || !previewImageIds) throw new Error('previewIds 없음');
      return await getPreviewImages(teamId, previewImageIds); // TODO: 개별 이미지 요청에 대해 처리 가능하도록
    },
    enabled: teamId !== null && !!previewImageIds.length,
  });

  return {
    thumbnailImage,
    isThumbnailImageLoading,
    isThumbnailImageError,
    previewImages,
    isPreviewImagesLoading,
    isPreviewImagesError,
  };
};

export default useImages;
