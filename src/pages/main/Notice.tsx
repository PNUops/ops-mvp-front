import logo from "@assets/logo.svg"

const Notice = () => {
  return (
    <section aria-labelledby="notice" className="flex flex-col gap-4">
      <h3 className="text-sm font-bold" id="notice">공지사항</h3>

      <img src={logo} alt="대회 로고" />
    </section>
  );
};

export default Notice;