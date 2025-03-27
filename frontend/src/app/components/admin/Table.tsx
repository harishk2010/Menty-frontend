
"use client";
import React from "react";
import { blockStudent, getAllStudents } from "@/api/studentApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AlertDialog from "../common/alertBoxes/AlertDialogBox";
import { ChevronLeft, ChevronRight, ArrowUpDown, UsersIcon, Search } from "lucide-react";
import { motion } from "framer-motion";

interface Student {
  username: string;
  email: string;
  isBlocked: boolean;
}

const UsersTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Student;
    direction: "asc" | "desc";
  }>({ key: "username", direction: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedData = await getAllStudents();
        setStudents(fetchedData || []);
      } catch (error) {
        console.error("Error fetching student data:", error);
        toast.error("Failed to load student data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBlock = async (email: string) => {
    try {
      const response = await blockStudent(email);
      if (response.success) {
        toast.success(response.message);
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.email === email
              ? { ...student, isBlocked: !student.isBlocked }
              : student
          )
        );
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
    }
  };

  // Sorting function
  const sortData = (data: Student[]) => {
    return [...data].sort((a, b) => {
      const valueA = String(a[sortConfig.key]).toLowerCase();
      const valueB = String(b[sortConfig.key]).toLowerCase();
      return sortConfig.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  };

  // Handle sort
  const handleSort = (key: keyof Student) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  // Filter and sort data
  const filteredData = students.filter((student) =>
    Object.values(student).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = sortData(filteredData);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  return (
    <div className="bg-gray-900 text-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-6"
      >
        {/* Header Card */}
        <div className="bg-gray-800 px-6 py-5 rounded-lg shadow-lg border border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-900/30 rounded-lg">
              <UsersIcon className="w-6 h-6 text-purple-400" />
            </div>
            <h1 className="text-2xl font-semibold text-purple-300">Student Management</h1>
          </div>
          <div className="text-sm text-gray-400">
            <span className="text-purple-400 font-medium">{filteredData.length}</span> total students
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
              >
                <option value={1}>1</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-400">per page</span>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-400">Loading student data...</p>
            </div>
          ) : currentItems.length === 0 ? (
            <div className="p-8 text-center">
              <div className="p-3 inline-block rounded-full bg-gray-700">
                <UsersIcon className="h-6 w-6 text-gray-400" />
              </div>
              <p className="mt-4 text-gray-400">No students found</p>
              <p className="text-sm text-gray-500">Try adjusting your search</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-6 py-4">
                      <button
                        onClick={() => handleSort("username")}
                        className="flex items-center gap-1.5 text-sm font-semibold text-purple-300 hover:text-purple-200"
                      >
                        Name
                        <ArrowUpDown className={`w-4 h-4 ${sortConfig.key === "username" ? "text-purple-400" : "text-gray-500"}`} />
                      </button>
                    </th>
                    <th className="px-6 py-4">
                      <button
                        onClick={() => handleSort("email")}
                        className="flex items-center gap-1.5 text-sm font-semibold text-purple-300 hover:text-purple-200"
                      >
                        Email
                        <ArrowUpDown className={`w-4 h-4 ${sortConfig.key === "email" ? "text-purple-400" : "text-gray-500"}`} />
                      </button>
                    </th>
                    <th className="px-6 py-4">
                      <button
                        onClick={() => handleSort("isBlocked")}
                        className="flex items-center gap-1.5 text-sm font-semibold text-purple-300 hover:text-purple-200"
                      >
                        Status
                        <ArrowUpDown className={`w-4 h-4 ${sortConfig.key === "isBlocked" ? "text-purple-400" : "text-gray-500"}`} />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-purple-300">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800">
                  {currentItems.map((user, index) => (
                    <motion.tr
                      key={user.email}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.isBlocked ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
                            Blocked
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {user.isBlocked ? (
                          <AlertDialog
                            onConfirm={() => handleBlock(user.email)}
                            alert={"Do you want to unblock this student?"}
                          >
                            <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-4 py-2 rounded-md transition-colors duration-200">
                              Unblock
                            </button>
                          </AlertDialog>
                        ) : (
                          <AlertDialog
                            onConfirm={() => handleBlock(user.email)}
                            alert={"Do you want to block this student?"}
                          >
                            <button className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-4 py-2 rounded-md transition-colors duration-200">
                              Block
                            </button>
                          </AlertDialog>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && currentItems.length > 0 && (
            <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing <span className="font-medium text-purple-400">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium text-purple-400">{Math.min(indexOfLastItem, sortedData.length)}</span> of{" "}
                  <span className="font-medium text-purple-400">{sortedData.length}</span> students
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(currentPage - page) <= 1
                    )
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 py-2 text-gray-400">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-200 ${
                            currentPage === page
                              ? "bg-purple-600 text-white"
                              : "text-gray-400 hover:bg-gray-700"
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))}
                    
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UsersTable;