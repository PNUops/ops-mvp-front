import React from 'react';

const EditorSkeleton = () => {
  return (
    <div className="animate-pulse px-5">
      <div className="h-6 w-40 rounded bg-gray-200" />
      <div className="h-10" />

      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="h-4 w-48 rounded bg-gray-200" />
        <div className="h-4 w-56 rounded bg-gray-200" />
      </div>

      <div className="h-15" />

      <div className="space-y-4">
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-10 w-full rounded bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-10 w-full rounded bg-gray-200" />
      </div>

      <div className="h-15" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-[3/2] w-full rounded bg-gray-200" />
        ))}
      </div>

      <div className="h-15" />

      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-40 w-full rounded bg-gray-200" />
        <div className="h-4 w-20 self-end rounded bg-gray-200" />
      </div>

      <div className="h-20" />

      <div className="flex justify-end gap-5 sm:gap-10">
        <div className="h-10 w-20 rounded-full bg-gray-200" />
        <div className="h-10 w-20 rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

export default EditorSkeleton;
