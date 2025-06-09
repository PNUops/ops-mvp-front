import banner from '@assets/banner.svg';

const Notice = () => {
  return (
    <section aria-labelledby="notice" className="flex flex-col gap-4">
      <h3 className="lg:text-title text-2xl font-bold" id="notice">
        공지사항
      </h3>
      <img src={banner} alt="대회 로고" />
    </section>
  );
};

export default Notice;
