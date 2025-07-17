import { GithubContentType, GithubRepoData, GithubProfileData } from '@pages/project-viewer/MediaSection/GithubCard';

/**
 * YouTube URL을 임베드 URL로 변환하는 유틸 함수
 * @param url YouTube URL
 * @returns 임베드 가능한 URL 또는 null
 **/

export const formatEmbedUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;

    if (hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.split('/')[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    return null;
  } catch (e) {
    console.error('유튜브 URL 처리 중 에러:', e);
    return null;
  }
};

/**
 * GitHub 저장소 URL의 데이터들을 받아오는 유틸 함수
 * @param url
 * @returns GithubCard 컴포넌트 내의 GithubRepoData 인터페이스 참고
 **/
export const fetchGithubContent = async (
  githubUrl: string,
): Promise<{ type: GithubContentType; data: GithubRepoData | GithubProfileData } | null> => {
  try {
    const url = new URL(githubUrl);
    const parts = url.pathname.split('/').filter(Boolean);

    if (parts.length === 1) {
      const profileRes = await fetch(`https://api.github.com/users/${parts[0]}`);
      if (!profileRes.ok) return null;

      const profileData: GithubProfileData = await profileRes.json();
      return { type: 'profile', data: profileData };
    }

    if (parts.length === 2) {
      const repoRes = await fetch(`https://api.github.com/repos/${parts[0]}/${parts[1]}`);
      if (!repoRes.ok) return null;

      const repoData: GithubRepoData = await repoRes.json();
      return { type: 'repo', data: repoData };
    }

    return null;
  } catch (err) {
    console.error('GitHub fetch error:', err);
    return null;
  }
};
