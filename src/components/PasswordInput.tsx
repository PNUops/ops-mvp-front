import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { InputHTMLAttributes, useState } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
}

const PasswordInput = ({ value, setValue, ...rest }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? 'text' : 'password'}
        className="w-full rounded-lg p-3 text-lg outline outline-gray-500 focus:outline-2 focus:outline-green-500"
        placeholder="비밀번호"
        {...rest}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
      >
        {showPassword ? <MdOutlineVisibilityOff className="text-xl" /> : <MdOutlineVisibility className="text-xl" />}
      </button>
    </div>
  );
};
export default PasswordInput;
