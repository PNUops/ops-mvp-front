import { teamsHandlers } from './teams';
import { DashboardHandlers } from './dashboard';

export const handlers = [...teamsHandlers, ...DashboardHandlers];
