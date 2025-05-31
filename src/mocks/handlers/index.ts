import { signInHandlers } from './sign-in';
import { teamsHandlers } from './teams';

export const handlers = [...teamsHandlers, ...signInHandlers];
