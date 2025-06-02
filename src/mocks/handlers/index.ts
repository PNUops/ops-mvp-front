import { signInHandlers } from './sign-in';
import { signUpHandlers } from './sign-up';
import { teamsHandlers } from './teams';
import { DashboardHandlers } from './dashboard';

export const handlers = [...teamsHandlers, ...signInHandlers, ...signUpHandlers, ...DashboardHandlers];
