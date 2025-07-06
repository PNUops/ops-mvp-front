const Divider = () => {
  return (
    <div className="flex w-full items-center gap-2 px-3 text-xs">
      <hr className="border-t-lightGray flex-1" />
      <span className="text-lightGray whitespace-nowrap">OR</span>
      <hr className="border-t-lightGray flex-1" />
    </div>
  );
};

export default Divider;
