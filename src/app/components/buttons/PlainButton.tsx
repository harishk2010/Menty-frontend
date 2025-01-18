import { ReactElement } from "react";

export default function PlainButton({name}:{
    name:string
}):ReactElement{
    return <button className="
    flex items-center justify-center
    border
    py-2 px-6
    rounded-md
    bg-gray-800
    hover:bg-gray-900
    text-white
   
    ">{name}</button>
}