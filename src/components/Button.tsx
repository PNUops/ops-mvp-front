import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ className = '', children, ...props }: Props) => {
  return (
    <button
      className={`text-exsm flex h-12 cursor-pointer items-center justify-center rounded-md px-2 py-[4px] text-center text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
