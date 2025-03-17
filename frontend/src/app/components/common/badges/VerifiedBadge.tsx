import { CheckCircle } from "lucide-react";
import { ReactElement } from "react";

const VerifiedBadge = ():ReactElement => {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
      <CheckCircle className="h-3.5 w-3.5" />
      <span>Verified</span>
    </div>
  );
};

export default VerifiedBadge;