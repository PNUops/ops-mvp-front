import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';

import { getThumbnail } from 'apis/projectEditor';
import { getPreviewImages } from 'apis/projectViewer';

const useImages = (teamId: number, previewImageIds: number[]) => {
  const {
    data: thumbnailImageRaw,
    isLoading: isThumbnailImageLoading,
    isError: isThumbnailImageError,
    error: thumbnailError,
  } = useQuery({
    queryKey: ['thumbnailImage', teamId],
    queryFn: async () => getThumbnail(teamId!),
    enabled: teamId !== null,
    retry: (failureCount, error: any) => {
      const status = error?.response?.status;
      if ([404, 409].includes(status)) {
        return false;
      }
      return failureCount < 3;
    },
  });

  const {
    data: previewImagesRaw,
    isLoading: isPreviewImagesLoading,
    isError: isPreviewImagesError,
    error: previewError,
  } = useQuery({
    queryKey: ['previewImages', teamId, previewImageIds],
    queryFn: async () => getPreviewImages(teamId!, previewImageIds), // TODO: 개별 이미지 요청에 대해 처리 가능하도록
    enabled: teamId !== null && previewImageIds.length > 0,
    retry: (failureCount, error: any) => {
      const status = error?.response?.status;
      if ([404, 409].includes(status)) {
        return false;
      }
      return failureCount < 3;
    },
  });

  const thumbnailImage = useMemo(() => {
    if (isThumbnailImageError && thumbnailError) {
      const status = (thumbnailError as any)?.response?.status;
      if (status === 409) {
        return 'ERROR_409'; // 409는 'ERROR_409'로 반환
      } else if (status === 404) {
        return null; // 404는 그냥 없는 것으로 처리 (초기 로딩 시 썸네일이 없을 수 있음)
      }
      return 'ERROR_FETCH_OTHER'; // 다른 에러는 'ERROR_FETCH_OTHER'
    }
    return thumbnailImageRaw || null;
  }, [thumbnailImageRaw, isThumbnailImageError, thumbnailError]);

  const previewImages = useMemo(() => {
    if (isPreviewImagesError && previewError) {
      const status = (previewError as any)?.response?.status;
      if (status === 409) {
        // 프리뷰는 ID가 있으므로, 해당 ID에 대한 오류를 표시하도록 매핑
        return previewImageIds.map((id) => ({ id: id, url: '', isError: true, errorMessage: 'ERROR_409' }));
      }
      return previewImageIds.map((id) => ({ id: id, url: '', isError: true, errorMessage: 'ERROR_FETCH_OTHER' })); // 다른 에러
    }
    // 성공 시에는 서버에서 받은 imageUrls를 PreviewImage[] 형태로 변환
    // getPreviewImages가 이미 id를 포함한 PreviewImage[]를 반환해야 더 깔끔합니다.
    // 현재 `getPreviewImages`는 `imageUrls: string[]`만을 반환하므로,
    // 이 `useMemo`에서 `initialPreviewIds`와 `imageUrls`를 매핑해야 합니다.
    return (previewImagesRaw?.imageUrls || []).map((url: string, index: number) => {
      const id = previewImageIds[index];
      if (url === 'ERROR_409') {
        // API에서 반환한 'ERROR_409' 문자열 감지
        return { id, url: '', isError: true, errorMessage: 'ERROR_409' };
      } else if (url === 'ERROR_FETCH_OTHER') {
        // API에서 반환한 'ERROR_FETCH_OTHER' 문자열 감지
        return { id, url: '', isError: true, errorMessage: 'ERROR_FETCH_OTHER' };
      }
      return { id, url };
    });
  }, [previewImagesRaw, isPreviewImagesError, previewError, previewImageIds]);

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
