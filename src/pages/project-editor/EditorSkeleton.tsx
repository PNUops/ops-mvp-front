import React from 'react';

export const EditorDetailSkeleton = () => {
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

export const EditorMenuSkeleton = () => {
  return (
    <div className="relative w-full max-w-sm text-sm">
      <button className="border-subGreen flex w-full animate-pulse items-center justify-between border-b-2 bg-gray-200 p-4 text-left">
        <div className="h-4 w-32 rounded bg-gray-300"></div>
      </button>
      <ul className="border-subGreen absolute z-10 mt-4 max-h-60 w-full animate-pulse overflow-auto border-2 bg-white shadow-sm">
        {[...Array(5)].map((_, index) => (
          <li key={index} className="mb-2 animate-pulse cursor-pointer rounded bg-gray-200 p-4"></li>
        ))}
      </ul>
    </div>
  );
};

export const ImageUploaderSectionSkeleton = () => (
  <div className="flex w-full flex-1 animate-pulse flex-col gap-3 xl:flex-row">
    <div className="border-midGray flex flex-1 flex-col items-center justify-center gap-2 rounded border bg-gray-200 p-6 text-center sm:gap-5">
      <div className="mb-2 h-6 w-32 rounded bg-gray-300"></div>
      <div className="h-4 w-20 rounded bg-gray-300"></div>
    </div>
    <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border-lightGray aspect-[3/2] w-full rounded border bg-gray-200" />
      ))}
    </div>
  </div>
);
