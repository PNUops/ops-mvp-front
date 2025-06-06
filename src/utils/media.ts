import { GithubRepoData } from '@pages/project-viewer/MediaSection/GithubCard';

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
export const fetchGithubRepoData = async (repoUrl: string): Promise<GithubRepoData | null> => {
  try {
    const path = new URL(repoUrl).pathname;
    const response = await fetch(`https://api.github.com/repos${path}`);

    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    console.error('GitHub API fetch error:', e);
    return null;
  }
};
