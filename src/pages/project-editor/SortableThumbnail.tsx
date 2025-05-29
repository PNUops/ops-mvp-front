import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiX } from 'react-icons/fi';

interface SortableThumbnailProps {
  file: File | null;
  index: number;
  onRemove: (index: number) => void;
}

const SortableThumbnail: React.FC<SortableThumbnailProps> = ({ file, index, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative flex h-[120px] w-full items-center justify-center overflow-hidden rounded border text-xs text-gray-400"
    >
      {file ? (
        <>
          <img
            src={URL.createObjectURL(file)}
            alt={`thumbnail-${index}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {index === 0 && (
            <span className="absolute bottom-1 left-1 rounded bg-green-100 px-2 py-0.5 text-xs text-green-600">
              썸네일
            </span>
          )}
          <button
            onClick={() => onRemove(index)}
            className="absolute top-1 right-1 rounded-full border border-gray-300 bg-white p-1"
          >
            <FiX size={16} className="text-gray-600" />
          </button>
        </>
      ) : (
        'image preview'
      )}
    </div>
  );
};

export default SortableThumbnail;
