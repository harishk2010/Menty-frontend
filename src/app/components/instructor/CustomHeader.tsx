import React, { ReactElement } from "react";
import RegisterHeader from "./RegisterHeader";


type HeaderProps={
    PropHeader?:React.ComponentType
}
export default function CustomHeader({ PropHeader }: HeaderProps) {
  return (
    <header className="w-full">
      {PropHeader ? <RegisterHeader /> : <div>Default Header</div>}
    </header>
  );
}
