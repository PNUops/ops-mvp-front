interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const RoundedButton = ({ className = '', children, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`border-lightGray hover:bg-mainGreen rounded-full border p-1 hover:text-white md:p-3 ${className}`}
    >
      {children}
    </button>
  );
};

export default RoundedButton;
