import Header from './Header';
import Footer from './Footer';
import FullContainer from './FullContainer';
import { Toaster } from '@components/Toaster';
import useScrollToTop from 'hooks/useScrollToTop';

const MainLayout = () => {
  useScrollToTop();
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div>
          <FullContainer />
        </div>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export default MainLayout;
