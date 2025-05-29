import { http, HttpResponse } from 'msw';
import { SignUpRequestDto } from 'types/DTO';

export const signUpHandlers = [
  http.post('/api/sign-up', async ({ request }) => {
    const { name, studentId, email, password } = (await request.json()) as SignUpRequestDto;
    if (!name.trim() || !studentId.trim() || !email.trim() || !password.trim())
      return HttpResponse.json({ error: '필수 필드 누락' }, { status: 400 });

    return new HttpResponse(null, { status: 201 });
  }),
];
