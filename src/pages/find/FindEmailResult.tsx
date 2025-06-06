import RoundedButton from '@components/RoundedButton';
import { Link } from 'react-router-dom';

interface Props {
  email: string;
}

const FindEmailResult = ({ email }: Props) => {
  return (
    <div className="my-10 flex flex-col items-center gap-10">
      <p className="text-xl">
        <span className="font-bold">{`"${email}"`}</span>
        입니다.
      </p>
      <Link to={'/signin'}>
        <RoundedButton>로그인</RoundedButton>
      </Link>
    </div>
  );
};

export default FindEmailResult;
