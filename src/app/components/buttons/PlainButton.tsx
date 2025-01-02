import { ReactElement } from "react";

export default function PlainButton({name}:{
    name:string
}):ReactElement{
    return <button className="
    flex items-center justify-center
    border
    py-2 px-3
    rounded-lg
    border-purple-700
    hover:bg-purple-100
    text-purple-700
   
    ">{name}</button>
}