import Notice from "@pages/main/Notice";
import TotalCard from "@pages/main/TotalCard";

const MainPage = () => {
  return (
      <div className="flex flex-col gap-20">
        <Notice/>
        <TotalCard />
      </div>
  )
}

export default MainPage;
