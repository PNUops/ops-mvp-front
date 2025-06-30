import { mockContestsResponse } from '@mocks/data/contests';
import { http, HttpResponse } from 'msw';

export const contestsHandler = [
  http.get('/api/contests', () => {
    return HttpResponse.json(mockContestsResponse);
  }),
];
