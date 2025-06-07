import banner from "@assets/banner.svg"

const Notice = () => {
  return (
    <section aria-labelledby="notice" className="flex flex-col gap-4">
        <a href="https://swedu.pusan.ac.kr/swedu/31630/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGc3dlZHUlMkY2OTA2JTJGMTcxNjIwOCUyRmFydGNsVmlldy5kbyUzRmJic09wZW5XcmRTZXElM0QlMjZpc1ZpZXdNaW5lJTNEZmFsc2UlMjZzcmNoQ29sdW1uJTNEc2olMjZwYWdlJTNEMSUyNnNyY2hXcmQlM0QlMjVFQyUyNUIwJTI1QkQlMjVFQyUyNTlEJTI1OTglMjVFQyUyNTlDJTI1QjUlMjVFRCUyNTk1JTI1QTklMjZyZ3NCZ25kZVN0ciUzRCUyNmJic0NsU2VxJTNEJTI2cGFzc3dvcmQlM0QlMjZyZ3NFbmRkZVN0ciUzRCUyNg%3D%3D"
           target="_blank">
            <img src={banner} alt="대회 로고" className="cursor-pointer"/>
        </a>

    </section>
  );
};

export default Notice;