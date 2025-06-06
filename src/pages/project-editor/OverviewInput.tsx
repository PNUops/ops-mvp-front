import React, { useRef } from 'react';

interface OverviewInputProps {
  overview: string;
  setOverview: (text: string) => void;
}

const MAX_OVERVIEW = 3000;

const OverviewInput = ({ overview, setOverview }: OverviewInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleOverviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_OVERVIEW) {
      setOverview(e.target.value);
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex gap-10 text-sm">
      <div className="text-midGray flex w-25 gap-1">
        <span className="mr-1 text-red-500">*</span>
        <span className="w-full">Overview</span>
      </div>
      <div className="flex-1 flex-col">
        <textarea
          ref={textareaRef}
          placeholder={`Overview를 입력해주세요. (최대 ${MAX_OVERVIEW}자)`}
          className="placeholder-lightGray focus:outline-lightGray w-full rounded bg-gray-100 px-4 py-3  text-xs"
          value={overview}
          onChange={handleOverviewChange}
        />
        <div className={`text-right text-xs ${overview.length === MAX_OVERVIEW ? 'text-red-500' : 'text-gray-500'}`}>
          {overview.length} / {MAX_OVERVIEW}자
        </div>
      </div>
    </div>
  );
};

export default OverviewInput;
