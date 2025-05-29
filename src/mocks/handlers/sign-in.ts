import { mockSignInResponse } from '@mocks/data/sign-in';
import { http, HttpResponse } from 'msw';

export const signInHandlers = [
  http.post('/api/sign-in', async ({ request }) => {
    const { email, password } = (await request.json()) as { email: string; password: string };

    if (email === 'test@test.com' && password === 'test') {
      return HttpResponse.json(mockSignInResponse);
    }

    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }),
];
