import { Ban } from "lucide-react";
import { ReactElement } from "react";

const RejectedBadge = ():ReactElement => {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
      <Ban className="h-3.5 w-3.5" />
      <span>Rejected</span>
    </div>
  );
};

export default RejectedBadge;