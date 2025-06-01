import Notice from "@pages/main/Notice";
import TotalCards from "@pages/main/TotalCards";

const MainPage = () => {
  return (
      <div className="flex flex-col gap-20">
        <Notice/>
        <TotalCards />
      </div>
  )
}

export default MainPage;
