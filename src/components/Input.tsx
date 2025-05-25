import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;
const Input = ({ ...props }: InputProps) => {
  return (
    <input
      className="w-full rounded-lg p-3 text-lg outline outline-gray-500 focus:outline-2 focus:outline-green-500"
      {...props}
    />
  );
};

export default Input;
