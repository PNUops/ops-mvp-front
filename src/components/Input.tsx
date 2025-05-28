import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;
const Input = ({ ...props }: InputProps) => {
  return (
    <input
      className="border-midGray focus:outline-mainGreen w-full rounded-lg border p-3 text-lg focus:outline-2"
      {...props}
    />
  );
};

export default Input;
