import InstructorRoutes from "@/@types/endPoints/InstructorRoutes";
import { API } from "@/service/axios";
interface PaginatedMentorsResponse {
  mentors: any[];
  currentPage: number;
  totalPages: number;
  totalMentors: number;
}
export const getInstructorData = async (email: string | null): Promise<any> => {
  try {
    console.log("getInsssss",email)
    const response = await API.get(
      // `/user/instructors/${email}`
      `${InstructorRoutes.getInstructorData}${email}`,{
        withCredentials:true
      }
    );
    console.log(response.data,"getInsssss")
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getInstructorDataById = async (instructorId: string | null): Promise<any> => {
  try {
    console.log("getInsssss")
    const response = await API.get(
      // `/user/instructors/${email}`
      `${InstructorRoutes.getInstructorDataById}${instructorId}`,{
        withCredentials:true
      }
    );
    console.log(response.data,"getInsssss")
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getInstructorTransactions = async (email: string | null,currentPage:number,itemsPerPage:number,searchTerm:string): Promise<any> => {
  try {
    console.log("getInsssss")
    const response = await API.get(
      // `/user/instructors/${email}`
      `${InstructorRoutes.getInstructorTransactionsData}?email=${email}&page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`,{
        withCredentials:true
      }
    );
    console.log(response.data,"getInsssss")
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};


export const updateProfile = async (formData: FormData): Promise<any> => {
  try {
    console.log("Inside updateProfile API call");

    const response = await API.post(InstructorRoutes.updateProfile, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log(response.data.user, "updateProfile response");
    return response?.data;
  } catch (error) {
    console.error("Error in updateProfile API call:", error);
  }
};

export const updatePassword = async (data: any): Promise<any> => {
  try {
    const response = await API.patch(InstructorRoutes.updatePassword, data, {
      withCredentials: true,
    });
    console.log(response, "response updatePassword");
    return response.data;
  } catch (error) {
    console.error("Error in updateProfile API call:", error);
  }
};
export const updatePlanPrice = async (planPrice:number,instructorId:string): Promise<any> => {
  try {
    const response = await API.put(`${InstructorRoutes.updatePlanProfile}${instructorId}`, {planPrice}, {
      withCredentials: true,
    });
    console.log(response, "response updatePlanPrice");
    return response.data;
  } catch (error) {
    console.error("Error in updatePlanPrice API call:", error);
  }
};

export async function getAllPaginatedMentors(
  page: number = 1,
  limit: number = 6,
  search: string = "",
  sort: string = "verified",
  expertise: string[] = []
): Promise<PaginatedMentorsResponse>{
  try {
    // Build the query parameters
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    if (search) {
      params.append('search', search);
    }
    
    if (sort) {
      params.append('sort', sort);
    }
    
    if (expertise && expertise.length > 0) {
      expertise.forEach(exp => params.append('expertise', exp));
    }
    
    const response = await API.get(`${InstructorRoutes.getAllPaginatedMentors}?${params}`, {
    
      withCredentials:true
    });

    if (!response) {
      throw new Error('Failed to fetch mentors');
    }
    console.log(response,"response")

    return await response.data as unknown as PaginatedMentorsResponse
  } catch (error) {
    console.error('Error fetching paginated mentors:', error);
    throw error;
  }
}

export async function getMentorExpertise(): Promise<{success: boolean, data: string[]}> {
  try {
    const response = await API.get(InstructorRoutes.getMentorsExpertise, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials:true
    });

    if (!response) {
      throw new Error('Failed to fetch mentor expertise');
    }

    return await response as unknown as {success: boolean, data: string[]}
  } catch (error) {
    console.error('Error fetching mentor expertise:', error);
    return { success: false, data: [] };
  }
}
