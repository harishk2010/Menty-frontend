import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface PasswordFieldProps {
  name: string;
  placeholder: string;
  value?: string;
  label:string
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  placeholder,
  value,
  label
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      setShowPassword(false);
    }, 1000);
  };

  const eyeIcon = showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />;


  return (
    <>
      <div>
        <label htmlFor={name} className="block text-black text-xs font-semibold ">
          {label.toUpperCase()}
        </label>
      </div>
      <div className="flex items-center relative">
        <Field
          className={`w-full px-5 py-3 rounded-lg font-medium border-2 text-black placeholder-gray-600  border-transparent  text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100`}
          placeholder={placeholder}
          id={name}
          type={showPassword ? "text" : "password"}
          value={value}
        />
        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-900 cursor-pointer"
          onClick={togglePassword}>
          {eyeIcon}
        </div>
      </div>
      <ErrorMessage
        className="text-xs font-semibold text-red-500 ml-3"
        name={name}
        component="span"
      />
    </>
  );
};
export default PasswordField;
