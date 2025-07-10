import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ className = '', children, ...props }: Props) => {
  return (
    <button
      className={twMerge(
        'flex items-center justify-center rounded-md px-2 py-1 text-center text-sm text-white hover:cursor-pointer text-nowrap',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
