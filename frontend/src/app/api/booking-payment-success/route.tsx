

import { NextResponse } from 'next/server';
import { payCourse } from '@/api/courseApi';
import { verifyPayUResponse } from '@/app/utils/payuUtils';

export async function POST(req: Request) {
  try {
    // Parse the form data from the request
    const formData = await req.formData();
    const data: { [key: string]: any } = {};
    formData.forEach((value: any, key: string) => {
      data[key] = value;
    });


    // Validate the PayU response
    const isValidResponse = verifyPayUResponse(data);
    if (!isValidResponse) {
      return NextResponse.json({ message: 'Invalid payment response' }, { status: 400 });
    }

    // Extract required fields from the PayU response
    const { txnid, amount, productinfo, lastname, bank_ref_num ,udf1} = data;

    // Call your API to update the course payment status
    const response = await payCourse(
      String(udf1),
      String(productinfo), // Assuming productinfo is the course ID
      String(txnid),
      Number(amount),
      String(lastname)
    );


    // Redirect to the success page with query parameters
    const redirectUrl = `/BookingPaymentSuccess?mentorName=${lastname}&slotId=${productinfo}&txnid=${txnid}&amountPaid=${amount}&bankRefNum=${bank_ref_num}`;
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}