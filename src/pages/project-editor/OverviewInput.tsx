import React, { useRef } from 'react';

interface OverviewInputProps {
  overview: string | null;
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

  // ring-lightGray focus-within:ring-midGray flex h-36 flex-col gap-2 rounded p-3 text-sm ring-1 transition-all duration-300 ease-in-out focus-within:ring-1"
  return (
    <div className="flex gap-10 text-sm">
      <div className="text-midGray flex w-25 gap-1">
        <span className="mr-1 text-red-500">*</span>
        <span className="w-full">Overview</span>
      </div>
      <div className="flex flex-1 flex-col">
        <textarea
          ref={textareaRef}
          placeholder={`Overview를 입력해주세요. (최대 ${MAX_OVERVIEW}자)`}
          className="placeholder-lightGray ring-lightGray h-40 max-h-40 min-h-40 w-full resize-none overflow-auto rounded bg-gray-100 px-4 py-3 text-sm transition-all duration-300 ease-in-out focus-within:ring-1 focus:outline-none"
          value={overview ?? ''}
          onChange={handleOverviewChange}
        />
        <div className={`text-right text-xs ${overview?.length === MAX_OVERVIEW ? 'text-red-500' : 'text-gray-500'}`}>
          {overview?.length} / {MAX_OVERVIEW}자
        </div>
      </div>
    </div>
  );
};

export default OverviewInput;
