import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getSortTeam, patchSortTeam } from 'apis/teams';

export type SortOption = 'RANDOM' | 'ASC';

const sortOptions: { label: string; value: SortOption }[] = [
  { label: '랜덤', value: 'RANDOM' },
  { label: '오름차순', value: 'ASC' },
];

const TeamSortToggle = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<SortOption | null>(null);

  useEffect(() => {
    const fetchSortMode = async () => {
      try {
        const mode = await getSortTeam();
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
    } catch (error) {
      console.error('Error sorting teams:', error);
    }
  };

  return (
    <div className="flex items-center justify-start gap-4">
      <span className="text-sm whitespace-nowrap">팀 정렬 기준</span>
      <div className="bg-whiteGray inline-flex items-center justify-center rounded-md p-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleToggle(option.value)}
            className={`w-25 cursor-pointer rounded-md p-1 text-sm transition-colors ${
              selected === option.value ? 'bg-mainGreen text-white' : 'text-midGray hover:text-gray-500'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeamSortToggle;
