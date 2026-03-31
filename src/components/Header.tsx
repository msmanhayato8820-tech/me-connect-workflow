"use client";

import { Role } from "@/types";

const roleLabels: Record<Role, string> = {
  employee: "一般社員",
  manager: "グループ会社 上長",
  admin: "本社管理部 (PMI/情シス)",
};

const roleColors: Record<Role, string> = {
  employee: "bg-blue-500",
  manager: "bg-amber-500",
  admin: "bg-emerald-600",
};

export default function Header({ role, onRoleChange }: { role: Role; onRoleChange: (r: Role) => void }) {
  return (
    <header className="bg-[#0057B8] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-white/20 flex items-center justify-center font-bold text-lg">ME</div>
          <div>
            <h1 className="text-lg font-bold leading-tight">ME-Connect Workflow</h1>
            <p className="text-xs text-blue-200">グループ横断 備品・資産利用申請</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-blue-200 mr-1 hidden sm:inline">ビュー切替:</span>
          {(Object.keys(roleLabels) as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => onRoleChange(r)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                role === r
                  ? `${roleColors[r]} text-white shadow-md ring-2 ring-white/40`
                  : "bg-white/15 hover:bg-white/25 text-blue-100"
              }`}
            >
              {roleLabels[r]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
