export type TabType = 'id' | 'pw';

interface Props {
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}

const TabSelector = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="border-lightGray flex w-full overflow-hidden rounded-md border">
      <button
        className={`flex-1 p-3 text-center font-semibold ${
          activeTab === 'id' ? 'bg-mainBlue text-white' : 'text-midGray bg-whiteGray'
        }`}
        onClick={() => setActiveTab('id')}
      >
        아이디 찾기
      </button>
      <button
        className={`flex-1 p-3 text-center font-semibold ${
          activeTab === 'pw' ? 'bg-mainBlue text-white' : 'text-midGray bg-whiteGray'
        }`}
        onClick={() => setActiveTab('pw')}
      >
        비밀번호 변경
      </button>
    </div>
  );
};
export default TabSelector;
