import { ReactElement } from "react";
import Navbar from "../components/instructor/Navbar";

export default function MainLayout({children}:{
    children:ReactElement
}){
    return(
        <main className="flex w-full h-lvh">
          <nav className=" min-h-full">
            <Navbar />

          </nav>
            <section className="w-full  right-0 bg-gray-400">
              <div className="p-6">{children}</div>
            </section>

        </main>
    )
}