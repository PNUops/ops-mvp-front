import { mockDashboardDetail } from '@mocks/data/dashboard';
import { mockLikeDetail } from '@mocks/data/teamslike';
import { mockVoteRateDetail } from '@mocks/data/voterate';
import { http, HttpResponse } from 'msw';

export const DashboardHandlers = [
  http.get('/api/admin/dashboard', () => {
    return HttpResponse.json(mockDashboardDetail);
  }),
  http.get('api/admin/ranking', () => {
    return HttpResponse.json(mockLikeDetail);
  }),
  http.get('api/admin/participation-rate', () => {
    return HttpResponse.json(mockVoteRateDetail);
  }),
];
