export const createImageFormData = (images: File | File[]) => {
  const imageFormData = new FormData();
  const imageArray = Array.isArray(images) ? images : [images];
  imageArray.forEach((image) => imageFormData.append('image', image));
  return imageFormData;
};

interface ImageValidateResult {
  isValid: boolean;
  message: string[];
}

export const imageValidator = (images: File | File[]): ImageValidateResult => {
  const ONE_MB = 1024 * 1024;
  const MAX_IMAGE_SIZE = 5 * ONE_MB;
  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];

  const imageValidateResult: ImageValidateResult = {
    isValid: true,
    message: [],
  };

  const imageArray = Array.isArray(images) ? images : [images];

  for (const image of imageArray) {
    if (!(image instanceof File)) {
      imageValidateResult.isValid = false;
      imageValidateResult.message.push('유효하지 않은 파일 객체예요');
      return imageValidateResult;
    }
    if (image.size > MAX_IMAGE_SIZE) {
      imageValidateResult.isValid = false;
      imageValidateResult.message.push(`이미지 파일의 크기가 ${MAX_IMAGE_SIZE / ONE_MB}MB를 초과해요`);
      return imageValidateResult;
    }
    if (!ALLOWED_MIME_TYPES.includes(image.type)) {
      imageValidateResult.isValid = false;
      imageValidateResult.message.push(`${image.type}은 허용되지 않는 파일 형식이에요`);
      return imageValidateResult;
    }
  }
  return imageValidateResult;
};
