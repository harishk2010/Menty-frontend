import React, { ReactElement } from "react";
import RegisterHeader from "./RegisterHeader";
import RegisterFooter from "./RegisterFooter";


type HeaderProps={
    PropHeader?:React.ComponentType
}
export default function CustomFooter({ PropHeader }: HeaderProps) {
  return (
    <header className="w-full">
      {PropHeader ? <RegisterFooter /> : <div>Default Header</div>}
    </header>
  );
}
