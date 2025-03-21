import { payCourse } from "@/api/courseApi";
import { redirect } from "next/navigation";
// import { studentApis } from "../studentApi";

// POST function
export async function POST(req: Request, { params }: { params: Promise<{ productinfo: string }> }) {
  
    const contentType = req.headers.get("content-type") || "";
  
    const formData = await req.formData();
  
    const data: { [key: string]: any } = {};
    formData.forEach((value: any, key: string) => {
      data[key] = value;
    });
    
    console.log(data);
    // const response = await payCourse(
    //             String(data.courseId),
    //             String(data.txnid),
    //             Number(data.amountPaid),
    //             String(data.lastname)
    //         );
    //         console.log(response,"done and dusted")
    


    const redirectUrl = `/paymentSuccess?courseName=${data.lastname}&courseId=${data.productinfo}&txnid=${data.txnid}&amountPaid=${data.amount}&bankRefNum=${data.bank_ref_num}`
  
    redirect(redirectUrl);

  }


  