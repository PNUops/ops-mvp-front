import { Outlet } from 'react-router-dom';

const FullContainer = () => {
  return (
    <div className="container mx-auto my-10 mb-64 px-4 sm:px-8 lg:px-16">
      <Outlet />
    </div>
  );
};

export default FullContainer;
