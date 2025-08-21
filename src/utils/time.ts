/**
 * 초를 MM:SS 형식으로 변환하는 유틸함수
 * @param totalSeconds MM:SS형식으로 변환할 값(sec)
 * @returns string 형식의 MM:SS
 */
export const formatToMMSS = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const formatDateTime = (date: Date, time: string): Date => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, seconds || 0);
  return result;
};
