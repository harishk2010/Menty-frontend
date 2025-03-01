"use client";
import React from "react"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AlertDialog from "@/app/components/common/alertBoxes/AlertDialogBox";
import { getCategories, listOrUnlistCategory } from "@/api/adminApi";
import Link from "next/link";
import { Pen, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";

const Category = () => {
  const [categories, setCategories] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "categoryName", direction: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getCategories();
        setCategories(fetchedData || []);
      } catch (error) {
        console.error("Error fetching Category data:", error);
      }
    };
    fetchData();
  }, []);

  const handleBlock = async (id: string) => {
    try {
      const response = await listOrUnlistCategory(id);
      if (response.success) {
        toast.success(response.message);
        setCategories((prevCategories: any[]) =>
          prevCategories.map((category) =>
            category._id === id
              ? { ...category, isListed: !category.isListed }
              : category
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
  const sortData = (data: any[]) => {
    return [...data].sort((a, b) => {
      const valueA = String(a[sortConfig.key]).toLowerCase();
      const valueB = String(b[sortConfig.key]).toLowerCase();
      return sortConfig.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  };

  // Handle sort
  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  // Filter and sort data
  const filteredData = categories.filter((category: any) =>
    Object.values(category).some((value) =>
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
    <div className="container mx-auto p-4">
      <div className="w-full flex justify-between bg-gray-800 px-6 py-4 rounded-lg">
        <h1 className="text-2xl text-white font-semibold">Category Listing</h1>
        <Link href={`/admin/addCategory`}>
          <button className="text-white bg-blue-400 py-2 px-4 rounded-lg">
            Add Category
          </button>
        </Link>
      </div>

      {/* Search and Items Per Page */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 mt-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories..."
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
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">per page</span>
        </div>
      </div>

      {/* Category Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto border-collapse bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gray-900 text-gray-200">
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                <button
                  onClick={() => handleSort("categoryName")}
                  className="flex items-center gap-1 text-sm font-semibold text-white"
                >
                  Name
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                <button
                  onClick={() => handleSort("isListed")}
                  className="flex items-center gap-1 text-sm font-semibold text-white"
                >
                  Status
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((category: any) => (
              <tr
                key={category.categoryName}
                className="text-gray-300 border-t border-gray-300 hover:bg-gray-700"
              >
                <td className="px-6 py-3">{category.categoryName}</td>
                <td className="px-6 py-3">
                  {!category.isListed ? (
                    <span
                      className={`rounded-full text-sm text-white font-medium px-3 py-1 text-left bg-blue-400 uppercase`}
                    >
                      Listed
                    </span>
                  ) : (
                    <span
                      className={`rounded-full text-sm text-white font-medium px-3 py-1 bg-orange-400 text-left uppercase`}
                    >
                      UnListed
                    </span>
                  )}
                </td>
                <td className="flex justify-center items-center space-x-2 px-6 py-3 text-center">
                  <div className="flex justify-center items-center">
                    <Link href={`/admin/editCategory/${category._id}`}>
                      <button>
                        <Pen className="rounded- size-6" />
                      </button>
                    </Link>
                  </div>
                  <div>
                    {category.isListed ? (
                      <AlertDialog
                        onConfirm={() => handleBlock(category._id)}
                        alert={"Do you want to List the Category?"}
                      >
                        <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
                          List
                        </button>
                      </AlertDialog>
                    ) : (
                      <AlertDialog
                        onConfirm={() => handleBlock(category._id)}
                        alert={"Do you want to UnList the Category?"}
                      >
                        <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md">
                          UnList
                        </button>
                      </AlertDialog>
                    )}
                  </div>
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
          {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length}{" "}
          categories
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
  );
};

export default Category;