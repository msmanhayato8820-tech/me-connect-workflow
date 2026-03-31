"use client";

import { useState } from "react";
import { AssetRequest, GroupCompany } from "@/types";
import StatusBadge from "./StatusBadge";
import RequestForm from "./RequestForm";

interface Props {
  requests: AssetRequest[];
  setRequests: React.Dispatch<React.SetStateAction<AssetRequest[]>>;
  companies: GroupCompany[];
}

export default function EmployeeDashboard({ requests, setRequests, companies }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState("");

  const myRequests = requests.filter((r) => r.company === "MEテクノサービス株式会社");

  const handleSubmit = (req: AssetRequest) => {
    setRequests((prev) => [req, ...prev]);
    setShowForm(false);
    setToast("申請が送信されました");
    setTimeout(() => setToast(""), 3000);
  };

  const stats = {
    total: myRequests.length,
    pending: myRequests.filter((r) => r.status === "上長確認中" || r.status === "本社確認中").length,
    approved: myRequests.filter((r) => r.status === "承認済").length,
    rejected: myRequests.filter((r) => r.status === "却下").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">マイ ダッシュボード</h2>
          <p className="text-sm text-gray-500">MEテクノサービス株式会社 / 田中 太郎</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-[#0057B8] text-white rounded-lg text-sm font-medium hover:bg-[#003D80] transition-colors flex items-center gap-1">
            <span className="text-lg leading-none">+</span> 新規申請
          </button>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50 animate-[fadeIn_0.3s_ease]">
          {toast}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "申請件数", value: stats.total, color: "text-gray-800" },
          { label: "確認中", value: stats.pending, color: "text-yellow-600" },
          { label: "承認済", value: stats.approved, color: "text-green-600" },
          { label: "却下", value: stats.rejected, color: "text-red-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && <RequestForm companies={companies} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />}

      {/* History */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-bold text-gray-800">申請履歴</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">申請日</th>
                <th className="text-left px-4 py-3 font-medium">カテゴリ</th>
                <th className="text-left px-4 py-3 font-medium">品目</th>
                <th className="text-left px-4 py-3 font-medium">期間</th>
                <th className="text-left px-4 py-3 font-medium">ステータス</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {myRequests.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{r.createdAt}</td>
                  <td className="px-4 py-3">{r.category}</td>
                  <td className="px-4 py-3 font-medium">{r.itemName}</td>
                  <td className="px-4 py-3 text-xs">{r.periodFrom} ~ {r.periodTo}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
              {myRequests.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">申請履歴がありません</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
