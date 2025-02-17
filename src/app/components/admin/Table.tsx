"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { blockStudent, getAllStudents } from "@/api/studentApi";
import { toast } from "react-toastify";
import AlertDialog from "../common/alertBoxes/AlertDialogBox";

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
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Student;
    direction: "asc" | "desc";
  }>({ key: "username", direction: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getAllStudents();
        setStudents(fetchedData || []);
      } catch (error) {
        console.error("Error fetching student data:", error);
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
      console.log(error);
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
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto bg-gray-900 rounded-lg shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Users Lists</h1>

          {/* Search and Items Per Page */}
          <div className="flex flex-colsm:flex-row justify-between gap-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-600 text-white sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">per page</span>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort("username")}
                      className="flex items-center gap-1 text-sm font-semibold text-white"
                    >
                      Name
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort("email")}
                      className="flex items-center gap-1 text-sm font-semibold text-white"
                    >
                      Email
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort("isBlocked")}
                      className="flex items-center gap-1 text-sm font-semibold text-white"
                    >
                      Status
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user) => (
                  <tr key={user.email} className="border-t hover:bg-gray-500">
                    <td className="px-4 py-3 text-sm text-white">
                      {user.username}
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isBlocked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {user.isBlocked ? (
                        <AlertDialog
                          onConfirm={() => handleBlock(user.email)}
                          alert="Do you want to unblock the Student?"
                        >
                          <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
                            Unblock
                          </button>
                        </AlertDialog>
                      ) : (
                        <AlertDialog
                          onConfirm={() => handleBlock(user.email)}
                          alert="Do you want to block the Student?"
                        >
                          <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md">
                            Block
                          </button>
                        </AlertDialog>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, sortedData.length)} of{" "}
              {sortedData.length} users
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
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
                      <span className="px-2 py-1">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-lg ${
                        currentPage === page
                          ? "bg-purple-600 text-white"
                          : "hover:bg-gray-100"
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
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;