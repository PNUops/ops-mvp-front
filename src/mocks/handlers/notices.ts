import { mockNotices } from '@mocks/data/notices';
import { http, HttpResponse } from 'msw';

const base = import.meta.env.VITE_API_BASE_URL ?? '';

export const noticesHandler = [
  http.get(`${base}/api/notices`, () => {
    return HttpResponse.json(mockNotices);
  }),
  http.get(`${base}/api/notices/:noticeId`, () => {
    return HttpResponse.json(mockNotices);
  }),
];
