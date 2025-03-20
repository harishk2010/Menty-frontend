//student Header
import { configDotenv } from "dotenv";
export const studentHeader = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "About",
    href: "/About",
  },
  {
    name: "course",
    href: "/courses",
  },
  {
    name: "mentors",
    href: "/mentors",
  },
  {
    name: "MyCourses",
    href: "/myCourses",
  },
  {
    name: "bookings",
    href: "/bookings",
  },
];

//instructor Sidebar
export const instructorSidebar = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "About",
    href: "/About",
  },
];

export const profileSidebar = [
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "EditProfile",
    href: "/editProfile",
  },
  {
    name: "ChangePassword",
    href: "/changePassword",
  },
  {
    name: "Bookings",
    href: "/bookings",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];
if (process.env.NODE_ENV === "production") {
  configDotenv({ path: ".env.production" });
  console.log("prod")
} else {
 configDotenv({ path: ".env" });
  console.log("dev")
}


export const FRONTEND_URL=process.env.NEXT_PUBLIC_FRONTEND_URL || "https://menty.live"
