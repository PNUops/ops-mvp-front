import { mockTeamDetail } from '@mocks/data/teams';
import { http, HttpResponse } from 'msw';

export const teamsHandlers = [
  http.get('/api/teams/:teamId', () => {
    return HttpResponse.json(mockTeamDetail);
  }),
];
