"use client"
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux"

const Header = () => {
  const Instructor=useSelector((state:RootState)=>state.instructor)
  console.log(Instructor)
  return (
  
    <header className="bg-purple-800 flex justify-between w-full text-white p-3 mr-5 text-center z-50">
      <div className=" p-1">
      <h1 className="text-xl font-bold">Menty- Instructor</h1>
      </div>
      <div className=" p-1 flex flex-1 gap-5 justify-end">
        {/* <NotificationsNoneIcon/> */}

        <div className="w-7 h-7 rounded-full bg-white"></div>
  
      </div>
      
    </header>
  );
};

export default Header;
