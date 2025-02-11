
import FailureNavigations from '@/app/components/students/pages/FailureNavigations';
import { XCircle } from 'lucide-react';

const PaymentFailure = () => {
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <XCircle className="h-20 w-20 text-red-500 animate-pulse" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Unsuccessful
          </h1>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            We were unable to process your payment for the course enrollment.
            This could be due to insufficient funds or a temporary issue with your payment method.
          </div>

          <div className="w-full">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="font-semibold text-gray-700 mb-2">What you can do:</h2>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Check your payment method details</li>
                <li>• Ensure sufficient funds are available</li>
                <li>• Try a different payment method</li>
                <li>• Contact your bank if the issue persists</li>
              </ul>
            </div>
            <FailureNavigations/>

            
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Need help? Contact our support team at support@example.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;