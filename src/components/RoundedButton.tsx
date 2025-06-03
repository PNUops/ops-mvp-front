interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const RoundedButton = ({ className = '', children, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`border-lightGray hover:bg-mainGreen w-32 rounded-full border p-3 hover:text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default RoundedButton;
