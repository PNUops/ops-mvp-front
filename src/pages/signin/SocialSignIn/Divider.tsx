const Divider = () => {
  return (
    <div className="flex w-full items-center gap-2 px-3 text-xs">
      <hr className="flex-1 border-none" />
      <span className="text-lightGray whitespace-nowrap">OR</span>
      <hr className="flex-1 border-none" />
    </div>
  );
};

export default Divider;
