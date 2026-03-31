import { RequestStatus } from "@/types";

const styles: Record<RequestStatus, string> = {
  "上長確認中": "bg-yellow-100 text-yellow-800",
  "本社確認中": "bg-blue-100 text-blue-800",
  "承認済": "bg-green-100 text-green-800",
  "却下": "bg-red-100 text-red-800",
};

export default function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
