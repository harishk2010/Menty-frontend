"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getStudentData } from "@/api/studentApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface StudentContextType {
  studentData: any;
  setStudentData: React.Dispatch<React.SetStateAction<any>>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
  const [studentData, setStudentData] = useState<any>(null);
  const loggedIn = useSelector((state: RootState) => state.user.email);
  const Student = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && Student?.email) {
        try {
          const fetchedData = await getStudentData(Student.email);
          setStudentData(fetchedData || {});
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      }
    };
    fetchData();
  }, [loggedIn, Student]);

  return (
    <StudentContext.Provider value={{ studentData, setStudentData }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};
