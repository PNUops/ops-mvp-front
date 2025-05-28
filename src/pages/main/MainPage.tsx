import Notice from "@pages/main/Notice";
import TotalCard from "@pages/main/TotalCard";

const MainPage = () => {
  return (
      <div className="flex flex-col gap-20">
          <div className="h-spacing-header bg-white shadow">
              {/*헤더자리*/}
          </div>

          <div className="flex flex-1">
              <aside className="w-spacing-sidebar bg-gray-100 border-r" >
                  {/*사이드바*/}
              </aside>
          </div>
        <Notice/>
        <TotalCard />
      </div>
  )
}

export default MainPage;
