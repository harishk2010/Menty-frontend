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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [student, setStudent] = useState(false);
  const router = useRouter();

  const Student = useSelector((state: RootState) => state.user.email);
  useEffect(() => {
    if (Student) setStudent(true);
    else setStudent(false);
    console.log(student, Student);
  });

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
    <nav className="bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left - Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900">
              {isMenuOpen ? <ChevronLeftIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>

          {/* Center - Brand Logo */}
          <Link href="/">
            <h1 className="text-purple-600 font-bold text-2xl">Menty</h1>
          </Link>

          {/* Right - Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {studentHeader.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link key={link.name} href={link.href} className={`${isActive ? "text-purple-600 font-bold" : "text-gray-600"} hover:text-purple-600`}>
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right - Authentication Buttons */}
          <div className="hidden md:flex gap-3">
            {!student ? (
              <Link href="/login">
                <PlainButton name="Login" />
              </Link>
            ) : (
              <span onClick={handleLogout}>
                <MainButton name="Logout" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full left-0 top-16 z-10">
          <div className="px-4 py-3 space-y-2">
            {studentHeader.map((link) => (
              <Link key={link.name} href={link.href} className="block px-3 py-2 text-gray-600 hover:text-purple-600">
                {link.name}
              </Link>
            ))}
            {!student ? (
              <Link href="/login" className="block text-center">
                <PlainButton name="Login" />
              </Link>
            ) : (
              <span onClick={handleLogout} className="block text-center">
                <MainButton name="Logout" />
              </span>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
