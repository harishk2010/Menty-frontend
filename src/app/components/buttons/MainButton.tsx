import { ReactElement } from "react";


export default function MainButton({name}:{
    name:string
}):ReactElement{
    return <button className="
    flex items-center justify-center
    border
    py-2 px-3
    rounded-lg
    border-purple-700
    bg-purple-700
    hover:bg-transparent
    hover:text-purple-700
    text-white
    transition-all
    ease-in-out
    duration-400
    ">{name}</button>
}