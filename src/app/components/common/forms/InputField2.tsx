import React from "react";
import { Field, ErrorMessage } from "formik";

interface inputFieldProps {
  type: string;
  placeholder: string;
  value?: string;
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const inputField2: React.FC<inputFieldProps > = ({
  type,
  placeholder,
  value,
  name,
  label,
  onBlur,
  onChange,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <label
          htmlFor={name}
          className="block text-gray-800 text-xs font-semibold mb-2"
        >
          {label.toUpperCase()}
        </label>
        <Field
          className={`w-full px-5 py-3 rounded-lg ${
            type == "number" ? "no-arrows" : ""
          } font-medium border-2  "bg-gray-200 text-gray-600"
              
           border-transparent text-black  text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100`}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
          id={name}
        />
        <ErrorMessage
          className="text-xs font-semibold text-red-500 ml-3"
          name={name}
          component="span"
        />
      </div>
    </>
  );
};
export default inputField2;
