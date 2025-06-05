import Notice from "@pages/main/Notice";
import TotalCards from "@pages/main/TotalCards";
import LeaderSection from "@pages/main/LeaderSection";

const MainPage = () => {
  return (
      <div className="relative flex flex-col gap-20">
        <Notice/>
          <TotalCards />
      </div>
  )
}

export default MainPage;
