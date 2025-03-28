import React, { ReactElement } from "react";
import { RegisterFooter } from "./RegisterFooter";


type HeaderProps={
    PropHeader?:React.ComponentType
}
export default function CustomFooter({ PropHeader }: HeaderProps) {
  return (
    <header className="w-full mt-10">
      {PropHeader ? <RegisterFooter /> : <div>Default Header</div>}
    </header>
  );
}
