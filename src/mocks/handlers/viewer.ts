import { team_images, project_view } from '@mocks/data/viewer';
import { http, HttpResponse } from 'msw';

export const imageViewHandler = [
  http.get('/api/teams/:teamId/images', ({ params }) => {
    const parsedTeamId = Number(params.teamId);
    const images = team_images.filter((img) => img.teamId === parsedTeamId);
    return HttpResponse.json(images);
  }),
];

export const projectViewHandler = [
  http.get('/api/teams/:teamId', ({ params }) => {
    const parsedTeamId = Number(params.teamId);

    if (parsedTeamId !== project_view.teamId) {
      return HttpResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    return HttpResponse.json(project_view);
  }),
];
