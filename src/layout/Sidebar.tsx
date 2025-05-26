interface SidebarProps {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ mobileSidebarOpen, setMobileSidebarOpen }: SidebarProps) => {
  return <div className="z-10 h-[1120px] w-[240px] border"></div>;
};

export default Sidebar;
