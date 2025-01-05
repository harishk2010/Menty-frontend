import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


const Header = () => {
  return (
    <header className="bg-gray-800 flex justify-between text-white p-3 mr-5 text-center">
      <div className=" p-1">
      <h1 className="text-xl font-bold">Menty- Admin</h1>
      </div>
      <div className=" p-1 flex flex-1 gap-5 justify-end">
        {/* <NotificationsNoneIcon/> */}

        <div className="w-7 h-7 rounded-full bg-white"></div>
  
      </div>
      
    </header>
  );
};

export default Header;
