import { useNavigate } from 'react-router-dom';

const useGoBack = () => {
  const goBack = () => {
    useNavigate()(-1);
  };
  return { goBack };
};
export default useGoBack;
