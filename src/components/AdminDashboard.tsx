"use client";

import { useState } from "react";
import { AssetRequest, Asset, GroupCompany, AssetCategory } from "@/types";
import StatusBadge from "./StatusBadge";

type Tab = "overview" | "assets" | "companies";

interface Props {
  requests: AssetRequest[];
  setRequests: React.Dispatch<React.SetStateAction<AssetRequest[]>>;
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  companies: GroupCompany[];
  setCompanies: React.Dispatch<React.SetStateAction<GroupCompany[]>>;
}

export default function AdminDashboard({ requests, setRequests, assets, setAssets, companies, setCompanies }: Props) {
  const [tab, setTab] = useState<Tab>("overview");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleFinalApprove = (id: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "承認済" as const } : r)));
    showToast("最終承認しました");
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "申請一覧" },
    { key: "assets", label: "資産マスター" },
    { key: "companies", label: "グループ会社" },
  ];

  const totalEmployees = companies.reduce((s, c) => s + c.employeeCount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">本社管理部 (PMI / 情報システム部) ダッシュボード</h2>
        <p className="text-sm text-gray-500">グループ全体の一元管理 &mdash; 脱Excel・マスターデータ管理</p>
      </div>

      {toast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50">{toast}</div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-xs text-gray-500">グループ会社数</p>
          <p className="text-2xl font-bold text-[#0057B8]">{companies.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-xs text-gray-500">グループ従業員数</p>
          <p className="text-2xl font-bold text-[#0057B8]">{totalEmployees.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-xs text-gray-500">登録資産数</p>
          <p className="text-2xl font-bold text-[#0057B8]">{assets.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-xs text-gray-500">本社確認待ち</p>
          <p className="text-2xl font-bold text-amber-600">{requests.filter((r) => r.status === "本社確認中").length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === t.key ? "bg-white shadow-sm text-[#0057B8]" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && <OverviewTab requests={requests} onApprove={handleFinalApprove} />}
      {tab === "assets" && <AssetsTab assets={assets} setAssets={setAssets} showToast={showToast} />}
      {tab === "companies" && <CompaniesTab companies={companies} setCompanies={setCompanies} showToast={showToast} />}
    </div>
  );
}

/* ───── Overview Tab ───── */
function OverviewTab({ requests, onApprove }: { requests: AssetRequest[]; onApprove: (id: string) => void }) {
  const [filter, setFilter] = useState("");
  const filtered = requests.filter(
    (r) =>
      r.applicantName.includes(filter) ||
      r.company.includes(filter) ||
      r.category.includes(filter) ||
      r.itemName.includes(filter)
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-4 border-b flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <h3 className="font-bold text-gray-800">全申請一覧 ({filtered.length}件)</h3>
        <input
          className="border rounded-lg px-3 py-1.5 text-sm w-full sm:w-64 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="検索（申請者・会社・品目）"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">申請者</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">所属会社</th>
              <th className="text-left px-4 py-3 font-medium">カテゴリ</th>
              <th className="text-left px-4 py-3 font-medium">品目</th>
              <th className="text-left px-4 py-3 font-medium">ステータス</th>
              <th className="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{r.applicantName}</td>
                <td className="px-4 py-3 text-xs hidden md:table-cell">{r.company}</td>
                <td className="px-4 py-3">{r.category}</td>
                <td className="px-4 py-3">{r.itemName}</td>
                <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3">
                  {r.status === "本社確認中" && (
                    <button onClick={() => onApprove(r.id)} className="px-3 py-1 bg-[#0057B8] text-white rounded text-xs hover:bg-[#003D80]">
                      最終承認
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ───── Assets Master Tab ───── */
function AssetsTab({
  assets,
  setAssets,
  showToast,
}: {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  showToast: (m: string) => void;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: "", category: "車両" as AssetCategory, company: "", serialNumber: "" });

  const handleAdd = () => {
    if (!newAsset.name || !newAsset.serialNumber) return;
    setAssets((prev) => [
      ...prev,
      { id: `ast-${Date.now()}`, ...newAsset, status: "利用可能" as const },
    ]);
    setNewAsset({ name: "", category: "車両", company: "", serialNumber: "" });
    setShowAdd(false);
    showToast("資産を追加しました");
  };

  const handleDelete = (id: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
    showToast("資産を削除しました");
  };

  const statusColors: Record<string, string> = {
    "利用可能": "text-green-600",
    "利用中": "text-blue-600",
    "メンテナンス中": "text-orange-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-bold text-gray-800">資産マスター ({assets.length}件)</h3>
        <button onClick={() => setShowAdd(!showAdd)} className="px-3 py-1.5 bg-[#0057B8] text-white rounded-lg text-sm hover:bg-[#003D80]">
          + 資産追加
        </button>
      </div>

      {showAdd && (
        <div className="p-4 bg-blue-50 border-b grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-end">
          <input className="border rounded px-2 py-1.5 text-sm" placeholder="資産名" value={newAsset.name} onChange={(e) => setNewAsset((p) => ({ ...p, name: e.target.value }))} />
          <select className="border rounded px-2 py-1.5 text-sm" value={newAsset.category} onChange={(e) => setNewAsset((p) => ({ ...p, category: e.target.value as AssetCategory }))}>
            {(["車両", "寮社宅", "現場用備品", "IT機器（電話・PC等）"] as AssetCategory[]).map((c) => <option key={c}>{c}</option>)}
          </select>
          <input className="border rounded px-2 py-1.5 text-sm" placeholder="所属会社" value={newAsset.company} onChange={(e) => setNewAsset((p) => ({ ...p, company: e.target.value }))} />
          <input className="border rounded px-2 py-1.5 text-sm" placeholder="シリアル番号" value={newAsset.serialNumber} onChange={(e) => setNewAsset((p) => ({ ...p, serialNumber: e.target.value }))} />
          <button onClick={handleAdd} className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">追加</button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">資産名</th>
              <th className="text-left px-4 py-3 font-medium">カテゴリ</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">所属</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">管理番号</th>
              <th className="text-left px-4 py-3 font-medium">ステータス</th>
              <th className="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {assets.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{a.name}</td>
                <td className="px-4 py-3">{a.category}</td>
                <td className="px-4 py-3 text-xs hidden md:table-cell">{a.company}</td>
                <td className="px-4 py-3 text-xs font-mono hidden md:table-cell">{a.serialNumber}</td>
                <td className={`px-4 py-3 font-medium ${statusColors[a.status] ?? ""}`}>{a.status}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:text-red-700 text-xs">削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ───── Companies Tab ───── */
function CompaniesTab({
  companies,
  setCompanies,
  showToast,
}: {
  companies: GroupCompany[];
  setCompanies: React.Dispatch<React.SetStateAction<GroupCompany[]>>;
  showToast: (m: string) => void;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [newCo, setNewCo] = useState({ name: "", industry: "", employeeCount: 0, region: "" });

  const handleAdd = () => {
    if (!newCo.name) return;
    setCompanies((prev) => [
      ...prev,
      { id: `gc-${Date.now()}`, ...newCo, joinedDate: new Date().toISOString().slice(0, 7) },
    ]);
    setNewCo({ name: "", industry: "", employeeCount: 0, region: "" });
    setShowAdd(false);
    showToast("グループ会社を追加しました");
  };

  const handleDelete = (id: string) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    showToast("グループ会社を削除しました");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-bold text-gray-800">グループ会社マスター ({companies.length}社)</h3>
        <button onClick={() => setShowAdd(!showAdd)} className="px-3 py-1.5 bg-[#0057B8] text-white rounded-lg text-sm hover:bg-[#003D80]">
          + 会社追加
        </button>
      </div>

      {showAdd && (
        <div className="p-4 bg-blue-50 border-b grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-end">
          <input className="border rounded px-2 py-1.5 text-sm" placeholder="会社名" value={newCo.name} onChange={(e) => setNewCo((p) => ({ ...p, name: e.target.value }))} />
          <input className="border rounded px-2 py-1.5 text-sm" placeholder="業種" value={newCo.industry} onChange={(e) => setNewCo((p) => ({ ...p, industry: e.target.value }))} />
          <input className="border rounded px-2 py-1.5 text-sm" placeholder="従業員数" type="number" value={newCo.employeeCount || ""} onChange={(e) => setNewCo((p) => ({ ...p, employeeCount: parseInt(e.target.value) || 0 }))} />
          <input className="border rounded px-2 py-1.5 text-sm" placeholder="地域" value={newCo.region} onChange={(e) => setNewCo((p) => ({ ...p, region: e.target.value }))} />
          <button onClick={handleAdd} className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">追加</button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">会社名</th>
              <th className="text-left px-4 py-3 font-medium">業種</th>
              <th className="text-left px-4 py-3 font-medium">従業員数</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">地域</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">参画日</th>
              <th className="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {companies.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3">{c.industry}</td>
                <td className="px-4 py-3">{c.employeeCount}名</td>
                <td className="px-4 py-3 hidden md:table-cell">{c.region}</td>
                <td className="px-4 py-3 hidden md:table-cell">{c.joinedDate}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700 text-xs">削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
