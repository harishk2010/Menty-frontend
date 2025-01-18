import { ReactElement } from "react";


export default function MainButton({name}:{
    name:string
}):ReactElement{
    return <button className="
   
    border
    py-2 px-6
    rounded-md
   
    bg-purple-600
    hover:bg-purple-500
    text-white
    transition-all
    ease-in-out
    duration-400
    ">{name}</button>
}