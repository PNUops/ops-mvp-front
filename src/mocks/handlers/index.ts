import { http, HttpResponse } from 'msw';
import { teamsHandlers } from './teams';

export const handlers = [...teamsHandlers];
