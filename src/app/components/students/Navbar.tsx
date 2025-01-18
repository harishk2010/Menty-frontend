"use client";
import { ReactElement, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MainButton from "../buttons/MainButton";
import PlainButton from "../buttons/PlainButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import { logout } from "@/api/studentAuthentication";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { studentHeader } from "@/app/utils/validationSchemas/constants";
import { useDispatch, useSelector } from "react-redux";
import { clearUserDetials } from "@/redux/slices/userSlice";
import { persistor, RootState } from "@/redux/store";

interface Student {
  email: string;
}

export default function Navbar(): ReactElement {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [student, setStudent] = useState(false);
  const router = useRouter();

  const Student = useSelector((state: RootState) => state.user.email);
  useEffect(() => {
    if (Student.length > 0) setStudent(true);
    else setStudent(false);
  }, []);

  console.log(Student);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };
  const dispatch = useDispatch();
  const pathname = usePathname();

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
      dispatch(clearUserDetials());

      router.replace("login");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <nav
        className="bg-transparent backdrop-blur-xl black shadow-md w-full flex sm:justify-evenly justify-self-stretch items-center
        py-3 px-5 sticky top-0 z-10"
      >
        <div className=" flex justify-start">
          <button onClick={handleToggleMenu}>
            {toggleMenu ? (
              <ChevronLeftIcon className="text-black" />
            ) : (
              <MenuIcon className="text-purple-400" />
            )}
          </button>
        </div>
        <div className="flex ">
          <h1 className="text-violet-700 font-bold text-2xl">Menty</h1>
        </div>
        <div>
          <ul className="hidden cursor-pointer sm:flex gap-11">
            {studentHeader.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  href={link.href}
                  className={`${
                    isActive ? "text-purple-700 font-bold" : "text-black"
                  } hover:text-purple-700`}
                  key={link.name}
                  prefetch={true}
                >
                  <li>{link.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="hidden sm:flex gap-3">
          <Link href={"/login"}>
            <PlainButton name={"Login"} />
          </Link>
          <span onClick={handleLogout}>
            <MainButton name={"Logout"} />
          </span>
        </div>
      </nav>
      {toggleMenu ? (
        <div
          className="
        bg-transparent backdrop-blur-3xl
        shadow
        bg-gray-100
        p-6
        w-1/2
        sm:w-1/4
       
        fixed
        origin-top-right
        
        
        h-screen   
        z-20
        "
        >
          <div className="flex justify-center  gap-28">
            <ul className=" flex flex-col justify-center cursor-pointer items-center gap-4 text-purple-700">
              <Link href={"/home"}>
                <li>Home</li>
              </Link>
              <Link href={"/profile"}>
                <li>Profile</li>
              </Link>
              <li>Courses</li>
              <li>Mentors</li>
            </ul>
          </div>
          <div className="sm:hidden flex flex-col mt-8 justify-center items-center gap-3">
            {student && (
              <Link href={"/login"}>
                <PlainButton name={"Login"} />
              </Link>
            )}

            <span onClick={handleLogout}>
              <MainButton name={"Logout"} />
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
