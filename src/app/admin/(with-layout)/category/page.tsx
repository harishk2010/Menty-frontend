"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AlertDialog from "@/app/components/common/alertBoxes/AlertDialogBox";
import { getCategories, listOrUnlistCategory } from "@/api/adminApi";
import Link from "next/link";
import { Pen } from "lucide-react";

const Category = () => {
  const [Categories, setCategories] = useState<any>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getCategories();
        // console.log(fetchedData)
        setCategories(fetchedData || []); // Set fetched data or empty object
      } catch (error) {
        console.error("Error fetching Category data:", error);
      }
    };
    fetchData();
  }, []);
  const handleBlock=async(id:string)=>{
    try {
      console.log(id)
      const response=await listOrUnlistCategory(id)
      if(response.success){
        toast.success(response.message)
        setCategories((prevCategories:any[])=>
          prevCategories.map((Category)=>
            Category._id===id?{...Category,isListed:!Category.isListed}:Category
          )
        )
        
      }else{
        toast.error(response.message)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="w-full flex justify-between bg-gray-800 px-6 py-4 rounded-lg">
        <h1 className="text-2xl text-white font-semibold">category Listing</h1>
        <Link href={`/admin/addCategory`}>
        <button className="text-white bg-blue-400 py-2 px-4 rounded-lg">Add Category</button>
        </Link>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto border-collapse bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gray-900 text-gray-200">
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                Name
              </th>
              
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Categories.map((category: any) => (
              <tr
                key={category.categoryName}
                className="text-gray-300 border-t border-gray-300 hover:bg-gray-700"
              >
                <td className="px-6 py-3">{category.categoryName}</td>
              
                <td className="px-6 py-3">
                  {!category.isListed ? (
                    <span
                      className={` rounded-full text-sm text-white font-medium px-3 py-1 text-left bg-blue-400 uppercase`}
                    >
                      Listed
                    </span>
                  ) : (
                    <span
                      className={` rounded-full text-sm text-white font-medium px-3 py-1 bg-orange-400 text-left  uppercase`}
                    >
                      UnListed
                    </span>
                  )}
                </td>
                <td className=" flex justify-center items-center space-x-2 px-6 py-3 text-center">
                  <div className="flex justify-center items-center">
                    <Link href={`/admin/editCategory/${category._id}`}>
                    <button><Pen className=" rounded- size-6" /></button>
                    </Link>
                  </div>
                  <div>

                  
                  {category.isListed ? (
                    <AlertDialog onConfirm={() => handleBlock(category._id)}
                    alert={"Do you want to List the Category?"}
                    >

                    <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
                      List
                    </button>
                    </AlertDialog>
                  ) : (
                    <AlertDialog onConfirm={() => handleBlock(category._id)}
                    alert={"Do you want to UnList th Category?"}
                    >
                    <button  className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md">
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
    </div>
  );
};

export default Category;
