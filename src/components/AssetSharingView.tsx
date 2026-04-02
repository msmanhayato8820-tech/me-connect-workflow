"use client";

import { useState } from "react";
import { Asset, AssetCategory, AssetRequest } from "@/types";
import { groupCompanies } from "@/data/mock";

interface Props {
  assets: Asset[];
  onBorrowRequest: (asset: Asset) => void;
  requests: AssetRequest[];
}

const CATEGORY_ICON: Record<AssetCategory, string> = {
  "車両": "🚗",
  "寮社宅": "🏠",
  "現場用備品": "🔧",
  "IT機器（電話・PC等）": "💻",
};

const STATUS_STYLE: Record<Asset["status"], string> = {
  "利用可能": "bg-green-100 text-green-800",
  "利用中": "bg-blue-100 text-blue-800",
  "メンテナンス中": "bg-amber-100 text-amber-800",
};

const CATEGORIES: AssetCategory[] = ["車両", "寮社宅", "現場用備品", "IT機器（電話・PC等）"];

export default function AssetSharingView({ assets, onBorrowRequest, requests }: Props) {
  const [filterCategory, setFilterCategory] = useState<"all" | AssetCategory>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | Asset["status"]>("all");
  const [filterCompany, setFilterCompany] = useState("all");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleBorrow = (asset: Asset) => {
    onBorrowRequest(asset);
    showToast(`「${asset.name}」の借用申請フォームを開きました`);
  };

  // --- サマリー ---
  const total = assets.length;
  const available = assets.filter((a) => a.status === "利用可能").length;
  const inUse = assets.filter((a) => a.status === "利用中").length;
  const maintenance = assets.filter((a) => a.status === "メンテナンス中").length;
  const utilizationRate = total > 0 ? Math.round((inUse / total) * 100) : 0;

  // --- カテゴリ別サマリー ---
  const categorySummary = CATEGORIES.map((cat) => {
    const items = assets.filter((a) => a.category === cat);
    const avail = items.filter((a) => a.status === "利用可能").length;
    const used = items.filter((a) => a.status === "利用中").length;
    return { cat, total: items.length, avail, used };
  });

  // --- 会社別サマリー ---
  const allCompanies = ["共通", ...groupCompanies.map((c) => c.name.replace("株式会社", "").trim())];
  const companySummary = allCompanies.map((cname) => {
    const items = assets.filter((a) => a.company === cname);
    const avail = items.filter((a) => a.status === "利用可能").length;
    return { cname, total: items.length, avail };
  }).filter((c) => c.total > 0);

  // --- フィルター ---
  const filtered = assets.filter((a) => {
    if (filterCategory !== "all" && a.category !== filterCategory) return false;
    if (filterStatus !== "all" && a.status !== filterStatus) return false;
    if (filterCompany !== "all" && a.company !== filterCompany) return false;
    return true;
  });

  const uniqueCompanies = Array.from(new Set(assets.map((a) => a.company)));

  // 直近の借用申請履歴（シェアリング経由）
  const sharingRequests = requests.filter((r) =>
    r.reason.includes("シェアリング") || r.reason.includes("借用")
  );

  return (
    <div className="space-y-6">
      {/* トースト */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-[var(--color-primary)] text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-pulse">
          {toast}
        </div>
      )}

      {/* KPIサマリーカード */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">グループ資産シェアリング状況</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-500 mb-1">グループ総資産</p>
            <p className="text-3xl font-bold text-gray-800">{total}</p>
            <p className="text-xs text-gray-400 mt-1">件</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-500 mb-1">シェアリング可能</p>
            <p className="text-3xl font-bold text-green-600">{available}</p>
            <p className="text-xs text-gray-400 mt-1">件（今すぐ借用可）</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-500 mb-1">稼働中</p>
            <p className="text-3xl font-bold text-blue-600">{inUse}</p>
            <p className="text-xs text-gray-400 mt-1">件</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-500 mb-1">グループ稼働率</p>
            <p className={`text-3xl font-bold ${utilizationRate >= 70 ? "text-green-600" : utilizationRate >= 40 ? "text-amber-500" : "text-red-500"}`}>
              {utilizationRate}%
            </p>
            <p className="text-xs text-gray-400 mt-1">利用中 / 総資産</p>
          </div>
        </div>
      </section>

      {/* カテゴリ別 & 会社別サマリー */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* カテゴリ別 */}
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">カテゴリ別状況</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-600">カテゴリ</th>
                  <th className="text-center px-4 py-2.5 font-semibold text-gray-600">合計</th>
                  <th className="text-center px-4 py-2.5 font-semibold text-green-600">利用可能</th>
                  <th className="text-center px-4 py-2.5 font-semibold text-blue-600">利用中</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categorySummary.map(({ cat, total, avail, used }) => (
                  <tr key={cat} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-medium">
                      <span className="mr-1.5">{CATEGORY_ICON[cat]}</span>{cat}
                    </td>
                    <td className="text-center px-4 py-2.5">{total}</td>
                    <td className="text-center px-4 py-2.5 text-green-600 font-semibold">{avail}</td>
                    <td className="text-center px-4 py-2.5 text-blue-600 font-semibold">{used}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 会社別 */}
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">会社別保有状況</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-600">会社</th>
                  <th className="text-center px-4 py-2.5 font-semibold text-gray-600">保有</th>
                  <th className="text-center px-4 py-2.5 font-semibold text-green-600">提供可能</th>
                  <th className="px-4 py-2.5 font-semibold text-gray-600">提供率</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {companySummary.map(({ cname, total, avail }) => {
                  const pct = total > 0 ? Math.round((avail / total) * 100) : 0;
                  return (
                    <tr key={cname} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-medium text-gray-800 text-xs">{cname}</td>
                      <td className="text-center px-4 py-2.5">{total}</td>
                      <td className="text-center px-4 py-2.5 text-green-600 font-semibold">{avail}</td>
                      <td className="px-4 py-2.5 min-w-[110px]">
                        <div className="flex items-center gap-1.5">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs font-semibold w-8 text-right">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* 資産一覧 + 借用申請 */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">グループ資産一覧・借用申請</h2>

        {/* フィルター */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">カテゴリ</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as "all" | AssetCategory)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              >
                <option value="all">すべて</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">ステータス</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "all" | Asset["status"])}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              >
                <option value="all">すべて</option>
                <option value="利用可能">利用可能</option>
                <option value="利用中">利用中</option>
                <option value="メンテナンス中">メンテナンス中</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">保有会社</label>
              <select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              >
                <option value="all">すべて</option>
                {uniqueCompanies.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700">{filtered.length}件</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">資産名</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">カテゴリ</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">保有会社</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">管理番号</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">ステータス</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">使用者</th>
                  <th className="px-4 py-3 font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((asset) => (
                  <tr key={asset.id} className={`hover:bg-gray-50 ${asset.status === "利用可能" ? "bg-green-50/20" : ""}`}>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      <span className="mr-1.5">{CATEGORY_ICON[asset.category]}</span>
                      {asset.name}
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-gray-500">{asset.category}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 hidden sm:table-cell">{asset.company}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono hidden md:table-cell">{asset.serialNumber}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLE[asset.status]}`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">
                      {asset.assignedTo ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {asset.status === "利用可能" ? (
                        <button
                          onClick={() => handleBorrow(asset)}
                          className="px-3 py-1.5 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
                        >
                          借用申請
                        </button>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                      条件に一致する資産がありません
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 借用申請履歴 */}
      {sharingRequests.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3">借用申請履歴</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {sharingRequests.map((r) => (
              <div key={r.id} className="px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{r.itemName}</p>
                  <p className="text-xs text-gray-400">{r.applicantName} · {r.company}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  r.status === "承認済" ? "bg-green-100 text-green-800"
                  : r.status === "却下" ? "bg-red-100 text-red-800"
                  : "bg-amber-100 text-amber-800"
                }`}>{r.status}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
