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
import { useDispatch, useSelector } from "react-redux";
import { clearUserDetials } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";

export default function Navbar(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [student, setStudent] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  // Simplified navigation items
  const navItems = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Mentors", href: "/mentors" },
  ];

  const Student = useSelector((state: RootState) => state.user.profilePicUrl);

  useEffect(() => {
    if (Student) setStudent(true);
    else setStudent(false);
  }, [Student]);

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
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? (
                <ChevronLeftIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Center - Brand Logo */}
          <Link href="/">
            <div className="flex items-center">
              <img src="../MentyLogo.png" className="w-20" alt="Menty Logo" />
              <h1 className="text-purple-600 font-bold text-2xl">Menty</h1>
            </div>
          </Link>

          {/* Right - Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${
                    isActive ? "text-purple-600 font-bold" : "text-gray-600"
                  } hover:text-purple-600`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right - User Dropdown */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-600 hover:text-purple-600 focus:outline-none"
              >
                <span className="mr-1">
                  {student ? (
                    <div className="w-9 h-9 overflow-hidden rounded-full">
                      <img
                        src={
                          Student ||
                          "https://freesvg.org/img/abstract-user-flat-4.png"
                        }
                        className="w-full h-full object-cover"
                        alt="User profile"
                      />
                    </div>
                  ) : (
                    "Account"
                  )}
                </span>{" "}
                <KeyboardArrowDownIcon className="h-5 w-5" />
              </button>

              {isDropdownOpen && (
                // For the desktop dropdown menu
<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
  {!student ? (
    <>
      <Link href="/login" onClick={() => setIsDropdownOpen(false)}>
        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
          Login
        </div>
      </Link>
      <Link href="/signup" onClick={() => setIsDropdownOpen(false)}>
        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
          Register
        </div>
      </Link>
    </>
  ) : (
    <>
      <Link href="/profile" onClick={() => setIsDropdownOpen(false)}>
        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
          Profile
        </div>
      </Link>
      <Link href="/myCourses" onClick={() => setIsDropdownOpen(false)}>
        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
          My Courses
        </div>
      </Link>
      <Link href="/bookings" onClick={() => setIsDropdownOpen(false)}>
        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
          My Bookings
        </div>
      </Link>
      <div 
        onClick={() => {
          setIsDropdownOpen(false);
          handleLogout();
        }} 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 cursor-pointer"
      >
        Logout
      </div>
    </>
  )}
</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
     {/* Mobile Navigation Menu */}
{isMenuOpen && (
  <div className="md:hidden bg-white shadow-lg absolute w-full left-0 top-16 z-10">
    <div className="px-4 py-3 space-y-2">
      {navItems.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onClick={() => setIsMenuOpen(false)}
          className="block px-3 py-2 text-gray-600 hover:text-purple-600"
        >
          {link.name}
        </Link>
      ))}
      {!student ? (
        <>
          <Link
            href="/login"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-gray-600 hover:text-purple-600"
          >
            Login
          </Link>
          <Link
            href="/register"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-gray-600 hover:text-purple-600"
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/profile"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-gray-600 hover:text-purple-600"
          >
            Profile
          </Link>
          <Link
            href="/myCourses"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-gray-600 hover:text-purple-600"
          >
            MyCourses
          </Link>
          <Link
            href="/bookings"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-gray-600 hover:text-purple-600"
          >
            Bookings
          </Link>
          <div
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
            className="block px-3 py-2 text-gray-600 hover:text-purple-600 cursor-pointer"
          >
            Logout
          </div>
        </>
      )}
    </div>
  </div>
)}
    </nav>
  );
}
