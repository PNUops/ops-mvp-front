import { FaAward } from 'react-icons/fa6';

interface AwardTagProps {
  awardName: string;
  awardColor: string;
}

const AwardTag = ({ awardName, awardColor }: AwardTagProps) => {
  return (
    <span
      className="award-tag relative inline-flex max-w-full min-w-0 items-center justify-center overflow-hidden rounded-full border px-4 py-0.5 text-sm font-medium text-white"
      style={{
        backgroundColor: awardColor,
        borderColor: awardColor,
        boxShadow: `0 0 6px 2px ${awardColor}50, 0 0 4px 4px ${awardColor}20`,
      }}
    >
      <span className="award-shimmer" />
      <FaAward className="relative z-10 mr-1 shrink-0" />
      <span
        className="relative z-10 max-w-full min-w-0 truncate overflow-hidden text-ellipsis whitespace-nowrap"
        style={{ display: 'inline-block', minWidth: 0, maxWidth: '100%' }}
      >
        {awardName}
      </span>
    </span>
  );
};

export default AwardTag;
