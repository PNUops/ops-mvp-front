import { mockContestsResponse } from '@mocks/data/contests';
import { http, HttpResponse } from 'msw';

const base = import.meta.env.VITE_API_BASE_URL ?? '';

export const contestsHandler = [
  http.get(`${base}/api/contests`, () => {
    return HttpResponse.json(mockContestsResponse);
  }),
];
