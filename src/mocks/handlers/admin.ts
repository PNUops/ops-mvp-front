import { mockDashboardDetail } from '@mocks/data/dashboard';
import { mockLikeDetail } from '@mocks/data/teamslike';
import { mockVoteRate } from '@mocks/data/voterate';
import { http, HttpResponse } from 'msw';

export const adminHandlers = [
  http.get('/api/admin/dashboard', async () => {
    return HttpResponse.json(mockDashboardDetail);
  }),
  http.get('/api/admin/ranking', async () => {
    return HttpResponse.json(mockLikeDetail);
  }),
  http.get('/api/admin/participation-rate', async () => {
    return HttpResponse.json(mockVoteRate);
  }),
];
