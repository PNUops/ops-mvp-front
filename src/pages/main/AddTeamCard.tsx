import { Link } from 'react-router-dom';
import { MdAdd } from "react-icons/md";


const AddTeamCard = () => {
  return (
    <Link
      to={`/teams`}
      className="border-whiteGray flex aspect-[5/6] w-full cursor-pointer flex-col overflow-hidden rounded-xl border-[0.2px] transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
      style={{
        boxShadow: '4px 4px 10px rgba(0,0,0,0.1)',
      }}
    >

      <div className="h-full flex items-center justify-center">
        <div className="aspect-square w-[15%] bg-lightGray flex items-center justify-center rounded-lg">
          <MdAdd className="text-whiteGray  w-[80%] h-[80%]"/>
        </div>
      </div>


    </Link>
)
}

export default AddTeamCard;