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

    const redirectUrl = `/BookingPaymentSuccess?mentorName=${data.lastname}&slotId=${data.productinfo}&txnid=${data.txnid}&amountPaid=${data.amount}&bankRefNum=${data.bank_ref_num}`

    redirect(redirectUrl);

  }

