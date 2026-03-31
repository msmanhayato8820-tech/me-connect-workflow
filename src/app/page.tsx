"use client";

import { useState } from "react";
import { Role, AssetRequest, Asset, GroupCompany } from "@/types";
import { initialRequests, initialAssets, groupCompanies as initialCompanies } from "@/data/mock";
import Header from "@/components/Header";
import EmployeeDashboard from "@/components/EmployeeDashboard";
import ManagerDashboard from "@/components/ManagerDashboard";
import AdminDashboard from "@/components/AdminDashboard";

export default function Home() {
  const [role, setRole] = useState<Role>("employee");
  const [requests, setRequests] = useState<AssetRequest[]>(initialRequests);
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [companies, setCompanies] = useState<GroupCompany[]>(initialCompanies);

  return (
    <div className="min-h-screen flex flex-col">
      <Header role={role} onRoleChange={setRole} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {role === "employee" && (
          <EmployeeDashboard requests={requests} setRequests={setRequests} companies={companies} />
        )}
        {role === "manager" && (
          <ManagerDashboard requests={requests} setRequests={setRequests} />
        )}
        {role === "admin" && (
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
