import { contestsHandler } from './contests';
import { signInHandlers } from './sign-in';
import { signUpHandlers } from './sign-up';
import { teamsHandlers } from './teams';

export const handlers = [...contestsHandler];
