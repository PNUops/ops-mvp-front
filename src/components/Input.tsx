import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className = '', ...props }: Props) => {
  return (
    <input
      className={`border-midGray focus:outline-mainGreen w-full rounded-lg border p-3 text-lg focus:outline-2 ${className}`}
      {...props}
    />
  );
};

export default Input;
