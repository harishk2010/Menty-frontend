import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
const IsVerified = () => {
  return (
    
      <div className="text-green-600 flex bg-green-200 text-sm space-x-1 w-24 rounded-full px-2 py-1">
        <VerifiedUserIcon className="text-green-600 text-semibold" /> 
        <p className="text-sm font-semibold">VERFIED</p>
      </div>
    
  );
};

export default IsVerified;
