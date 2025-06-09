import { ReactNode, useState } from 'react';
import TabSelector, { TabType } from './TabSelector';
import IdTab from './IdTab';
import PasswordTab from './PasswordTab';

const FindPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('id');
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold">ID 찾기 / 비밀번호 변경</h1>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabContainer>{activeTab == 'id' ? <IdTab /> : <PasswordTab />}</TabContainer>
      </div>
    </div>
  );
};
export default FindPage;

const TabContainer = ({ children }: { children: ReactNode }) => {
  return <div className="border-lightGray w-full rounded-md border px-4 py-6 md:p-10">{children}</div>;
};
