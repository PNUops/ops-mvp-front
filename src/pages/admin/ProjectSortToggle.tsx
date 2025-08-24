import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from 'hooks/useToast';
import { getSortStatus, patchSortTeam } from 'apis/teams';

export type SortOption = 'RANDOM' | 'ASC';

const sortOptions: { label: string; value: SortOption }[] = [
  { label: '랜덤', value: 'RANDOM' },
  { label: '오름차순', value: 'ASC' },
];

const ProjectSortToggle = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [selected, setSelected] = useState<SortOption | null>(null);

  useEffect(() => {
    const fetchSortMode = async () => {
      try {
        const mode = await getSortStatus();
        setSelected(mode);
      } catch (error) {
        console.error('Error fetching sort mode:', error);
      }
    };
    fetchSortMode();
  }, []);

  const handleToggle = async (mode: SortOption) => {
    try {
      await patchSortTeam(mode);
      setSelected(mode);
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast(`프로젝트가 ${mode === 'RANDOM' ? '랜덤' : '오름차순'} 정렬로 변경되었어요`, 'success');
    } catch (error) {
      console.error('Error sorting teams:', error);
      toast('프로젝트 정렬 설정에 실패했어요', 'error');
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:gap-15">
      <span className="text-sm font-medium whitespace-nowrap">- 프로젝트 정렬 설정</span>
      <div className="border-lightGray flex flex-1 items-center justify-center rounded-md border p-1">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleToggle(option.value)}
            className={`h-10 flex-1 cursor-pointer rounded-sm text-sm transition-colors ${
              selected === option.value ? 'bg-mainGreen text-white' : 'text-black hover:text-gray-500'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectSortToggle;
