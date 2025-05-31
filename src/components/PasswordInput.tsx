import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { InputHTMLAttributes, useState } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

const PasswordInput = ({ value, ...rest }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? 'text' : 'password'}
        className="border-midGray focus:outline-mainGreen w-full rounded-lg border p-3 text-lg focus:outline-2"
        placeholder="비밀번호"
        {...rest}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="text-midGray absolute top-1/2 right-3 -translate-y-1/2"
      >
        {showPassword ? <MdOutlineVisibilityOff className="text-xl" /> : <MdOutlineVisibility className="text-xl" />}
      </button>
    </div>
  );
};
export default PasswordInput;
