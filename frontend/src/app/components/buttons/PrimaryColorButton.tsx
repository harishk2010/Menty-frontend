import { ReactElement } from "react";


export default function  PrimaryButton({ name ,colorOne}: {
    name: string,
    colorOne: string,
   
}): ReactElement {
   
   
    
    return <button className={`text-white 
    h-10  
     bg-${colorOne} 
      py-2 px-3 rounded-full     
     
    
        hover:translate-x-1 transition-all ease-in-out duration-300`}>
            {name}
            </button>
}