"use client";

import { useState } from "react";
import { Role, AssetRequest, Asset, GroupCompany } from "@/types";
import { initialRequests, initialAssets, groupCompanies as initialCompanies } from "@/data/mock";
import Header from "@/components/Header";
import EmployeeDashboard from "@/components/EmployeeDashboard";
import ManagerDashboard from "@/components/ManagerDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import AssetSharingView from "@/components/AssetSharingView";

type MainView = "workflow" | "sharing";

export default function Home() {
  const [role, setRole] = useState<Role>("employee");
  const [view, setView] = useState<MainView>("workflow");
  const [requests, setRequests] = useState<AssetRequest[]>(initialRequests);
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [companies, setCompanies] = useState<GroupCompany[]>(initialCompanies);

  const handleBorrowRequest = (asset: Asset) => {
    // シェアリングビューから借用申請 → ワークフロータブへ切り替えて申請フォームを開く
    // EmployeeDashboard に pre-fill は props 経由で渡す設計にしておく
    setView("workflow");
  };

  const tabs: { key: MainView; label: string }[] = [
    { key: "workflow", label: "業務申請ワークフロー" },
    { key: "sharing", label: "資産シェアリング" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header role={role} onRoleChange={setRole} />

      {/* メインビュー切り替えタブ */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1" aria-label="Main navigation">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setView(t.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  view === t.key
                    ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {t.label}
                {t.key === "sharing" && (
                  <span className="ml-1.5 px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">NEW</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {view === "sharing" && (
          <AssetSharingView
            assets={assets}
            onBorrowRequest={handleBorrowRequest}
            requests={requests}
          />
        )}
        {view === "workflow" && role === "employee" && (
          <EmployeeDashboard requests={requests} setRequests={setRequests} companies={companies} />
        )}
        {view === "workflow" && role === "manager" && (
          <ManagerDashboard requests={requests} setRequests={setRequests} />
        )}
        {view === "workflow" && role === "admin" && (
          <AdminDashboard
            requests={requests}
            setRequests={setRequests}
            assets={assets}
            setAssets={setAssets}
            companies={companies}
            setCompanies={setCompanies}
          />
        )}
      </main>

      <footer className="text-center text-xs text-gray-400 py-4 border-t">
        ME-Connect Workflow Demo &copy; 2026 &mdash; PMI統合支援プロトタイプ
      </footer>
    </div>
  );
}
