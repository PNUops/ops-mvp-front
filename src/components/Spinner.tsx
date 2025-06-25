interface Props {
  className?: string;
}

const Spinner = ({ className = 'w-10 h-10' }: Props) => {
  return (
    <div className={`border-t-mainGreen m-auto animate-spin rounded-full border-4 border-gray-200 ${className}`} />
  );
};

export default Spinner;
