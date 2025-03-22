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

    const redirectUrl = `/BookingPaymentSuccess?mentorName=${data.lastname}&slotId=${data.productinfo}&txnid=${data.txnid}&amountPaid=${data.amount}&bankRefNum=${data.bank_ref_num}`

    redirect(redirectUrl);

  }

// import { NextResponse } from "next/server";
// import { payCourse } from "@/api/courseApi";
// import { verifyPayUResponse } from "@/app/utils/payuUtils";
// import { redirect } from "next/navigation";

// export async function POST(req: Request) {
//   try {
//     // Parse the form data from the request
//     const formData = await req.formData();
//     const data: { [key: string]: any } = {};
//     formData.forEach((value: any, key: string) => {
//       data[key] = value;
//     });

//     console.log("Received PayU response:", data);

//     // Validate the PayU response
//     const isValidResponse = verifyPayUResponse(data);
//     if (!isValidResponse) {
//       return NextResponse.json(
//         { message: "Invalid payment response" },
//         { status: 400 }
//       );
//     }

//     // Extract required fields from the PayU response
//     const { txnid, amount, productinfo, lastname, bank_ref_num } = data;

//     // Call your API to update the course payment status
//     const response = await payCourse(
//       String(productinfo), // Assuming productinfo is the course ID
//       String(txnid),
//       Number(amount),
//       String(lastname)
//     );
//     console.log("Payment processed:", response);
//     console.log("FRONTEND_URL:", process.env.NEXT_PUBLIC_FRONTEND_URL);

//     // Use FRONTEND_URL for the redirect URL
//     const FRONTEND_URL =
//       process.env.NEXT_PUBLIC_FRONTEND_URL || "https://menty.live";
//     const redirectUrl = `${FRONTEND_URL}/BookingPaymentSuccess?mentorName=${lastname}&slotId=${productinfo}&txnid=${txnid}&amountPaid=${amount}&bankRefNum=${bank_ref_num}`;

//     // Redirect to the success page
//     // return NextResponse.redirect(redirectUrl);
//     redirect(redirectUrl);
//   } catch (error) {
//     console.error("Error processing payment:", error);
//     // return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }
  