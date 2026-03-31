"use client";

import { useState } from "react";
import { AssetRequest } from "@/types";
import StatusBadge from "./StatusBadge";

interface Props {
  requests: AssetRequest[];
  setRequests: React.Dispatch<React.SetStateAction<AssetRequest[]>>;
}

export default function ManagerDashboard({ requests, setRequests }: Props) {
  const [toast, setToast] = useState("");

  const pendingRequests = requests.filter((r) => r.status === "上長確認中");
  const handledRequests = requests.filter((r) => r.status !== "上長確認中");

  const handleAction = (id: string, action: "approve" | "reject") => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: action === "approve" ? "本社確認中" : "却下",
              approvedBy: action === "approve" ? "鈴木 課長" : undefined,
            }
          : r
      )
    );
    setToast(action === "approve" ? "承認して本社へ転送しました" : "却下しました");
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">上長 承認ダッシュボード</h2>
        <p className="text-sm text-gray-500">鈴木 課長 / グループ会社上長ビュー</p>
      </div>

      {toast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50">{toast}</div>
      )}

      {/* Pending count */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <p className="text-xs text-yellow-700">承認待ち</p>
          <p className="text-3xl font-bold text-yellow-600">{pendingRequests.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-xs text-green-700">承認済（本社転送）</p>
          <p className="text-3xl font-bold text-green-600">{requests.filter((r) => r.status === "本社確認中" || r.status === "承認済").length}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-xs text-red-700">却下</p>
          <p className="text-3xl font-bold text-red-600">{requests.filter((r) => r.status === "却下").length}</p>
        </div>
      </div>

      {/* Pending list */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <h3 className="font-bold text-gray-800">承認待ち申請</h3>
        </div>
        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center text-gray-400">承認待ちの申請はありません</div>
        ) : (
          <div className="divide-y">
            {pendingRequests.map((r) => (
              <div key={r.id} className="p-4 flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{r.applicantName}</span>
                    <span className="text-xs text-gray-400">{r.company}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">
                    <span className="font-medium">{r.category}</span> &mdash; {r.itemName}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">理由: {r.reason}</p>
                  <p className="text-xs text-gray-400">期間: {r.periodFrom} ~ {r.periodTo}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleAction(r.id, "approve")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    承認
                  </button>
                  <button
                    onClick={() => handleAction(r.id, "reject")}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    却下
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Handled */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-bold text-gray-800">処理済み申請</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">申請者</th>
                <th className="text-left px-4 py-3 font-medium">会社</th>
                <th className="text-left px-4 py-3 font-medium">品目</th>
                <th className="text-left px-4 py-3 font-medium">ステータス</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {handledRequests.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{r.applicantName}</td>
                  <td className="px-4 py-3 text-xs">{r.company}</td>
                  <td className="px-4 py-3">{r.itemName}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
