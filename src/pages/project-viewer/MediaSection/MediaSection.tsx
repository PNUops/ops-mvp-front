import GithubCard from './GithubCard';
import YoutubeCard from './YoutubeCard';

interface MediaSectionProps {
  githubUrl: string;
  youtubeUrl: string;
}

const MediaSection = ({ githubUrl, youtubeUrl }: MediaSectionProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-title font-bold">URL</div>
      <GithubCard githubUrl={githubUrl} />
      <YoutubeCard youtubeVidUrl={youtubeUrl} />
    </div>
  );
};

export default MediaSection;
