export const isValidGithubUrl = (url: string) => {
  if (!url.startsWith('https://github.com/')) return false;

  try {
    const { hostname, pathname } = new URL(url);
    if (hostname !== 'github.com') return false;

    const parts = pathname.split('/').filter(Boolean);
    return parts.length === 1 || parts.length === 2;
  } catch {
    return false;
  }
};

export const isValidYoutubeUrl = (url: string) => {
  try {
    const u = new URL(url);
    const { hostname, pathname, searchParams } = u;

    if (hostname === 'youtu.be') {
      return pathname.length > 1;
    }

    if (hostname === 'youtube.com' || hostname === 'www.youtube.com') {
      if (searchParams.has('v')) return true;

      const parts = pathname.split('/').filter(Boolean);
      return parts.length === 2 && ['channel', 'user', 'c'].includes(parts[0]);
    }

    return false;
  } catch {
    return false;
  }
};

export const isValidProjectUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname.includes('.');
  } catch {
    return false;
  }
};
