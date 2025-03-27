"use client";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AlertDialog from "@/app/components/common/alertBoxes/AlertDialogBox";
import { getCategories, listOrUnlistCategory } from "@/api/adminApi";
import Link from "next/link";
import { Pen, ChevronLeft, ChevronRight, ArrowUpDown, FolderIcon, Search, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  _id: string;
  categoryName: string;
  isListed: boolean;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: "categoryName", 
    direction: "asc" 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedData = await getCategories();
        setCategories(fetchedData || []);
      } catch (error) {
        console.error("Error fetching Category data:", error);
        toast.error("Failed to load category data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBlock = async (id: string) => {
    try {
      const response = await listOrUnlistCategory(id);
      if (response.success) {
        toast.success(response.message);
        setCategories((prevCategories) =>
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
      toast.error("An error occurred while updating status");
    }
  };

  // Sorting function
  const sortData = (data: Category[]) => {
    return [...data].sort((a, b) => {
      const valueA = String(a[sortConfig.key as keyof Category]).toLowerCase();
      const valueB = String(b[sortConfig.key as keyof Category]).toLowerCase();
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
  const filteredData = categories.filter((category) =>
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
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <FolderIcon className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-semibold text-indigo-300">Category Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400">
              <span className="text-purple-400 font-medium">{filteredData.length}</span> total categories
            </div>
            <Link href={`/admin/addCategory`}>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </Link>
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
                placeholder="Search categories..."
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

        {/* Category Table */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-400">Loading category data...</p>
            </div>
          ) : currentItems.length === 0 ? (
            <div className="p-8 text-center">
              <div className="p-3 inline-block rounded-full bg-gray-700">
                <FolderIcon className="h-6 w-6 text-gray-400" />
              </div>
              <p className="mt-4 text-gray-400">No categories found</p>
              <p className="text-sm text-gray-500">Try adjusting your search</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-6 py-4">
                      <button
                        onClick={() => handleSort("categoryName")}
                        className="flex items-center gap-1.5 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
                      >
                        Name
                        <ArrowUpDown className={`w-4 h-4 ${sortConfig.key === "categoryName" ? "text-purple-400" : "text-gray-500"}`} />
                      </button>
                    </th>
                    <th className="px-6 py-4">
                      <button
                        onClick={() => handleSort("isListed")}
                        className="flex items-center gap-1.5 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
                      >
                        Status
                        <ArrowUpDown className={`w-4 h-4 ${sortConfig.key === "isListed" ? "text-purple-400" : "text-gray-500"}`} />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-indigo-300">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800">
                  {currentItems.map((category, index) => (
                    <motion.tr
                      key={category._id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{category.categoryName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {category.isListed ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
                            Unlisted
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                            Listed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-center items-center space-x-3">
                          <Link href={`/admin/editCategory/${category._id}`}>
                            <button className="bg-indigo-900/30 hover:bg-indigo-900/50 text-indigo-400 p-2 rounded-lg transition-colors duration-200">
                              <Pen className="w-4 h-4" />
                            </button>
                          </Link>
                          
                          {category.isListed ? (
                            <AlertDialog
                              onConfirm={() => handleBlock(category._id)}
                              alert={"Do you want to List the Category?"}
                            >
                              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-2 rounded-md transition-colors duration-200">
                                List
                              </button>
                            </AlertDialog>
                          ) : (
                            <AlertDialog
                              onConfirm={() => handleBlock(category._id)}
                              alert={"Do you want to UnList the Category?"}
                            >
                              <button className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-4 py-2 rounded-md transition-colors duration-200">
                                UnList
                              </button>
                            </AlertDialog>
                          )}
                        </div>
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
                  <span className="font-medium text-purple-400">{sortedData.length}</span> categories
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

export default Category;