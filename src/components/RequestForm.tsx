"use client";

import { useState } from "react";
import { AssetCategory, AssetRequest, GroupCompany } from "@/types";

const categories: AssetCategory[] = ["車両", "寮社宅", "現場用備品", "IT機器（電話・PC等）"];

interface Props {
  companies: GroupCompany[];
  onSubmit: (req: AssetRequest) => void;
  onCancel: () => void;
}

export default function RequestForm({ companies, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState({
    applicantName: "",
    company: companies[0]?.name ?? "",
    department: "",
    category: categories[0],
    itemName: "",
    periodFrom: "",
    periodTo: "",
    reason: "",
  });

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: AssetRequest = {
      id: `req-${Date.now()}`,
      ...form,
      category: form.category as AssetCategory,
      status: "上長確認中",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    onSubmit(newReq);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">新規 資産利用申請</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>申請者名 *</label>
          <input required className={inputClass} value={form.applicantName} onChange={(e) => set("applicantName", e.target.value)} placeholder="例: 田中 太郎" />
        </div>
        <div>
          <label className={labelClass}>所属グループ会社 *</label>
          <select required className={inputClass} value={form.company} onChange={(e) => set("company", e.target.value)}>
            {companies.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>部署 *</label>
          <input required className={inputClass} value={form.department} onChange={(e) => set("department", e.target.value)} placeholder="例: 設備保全課" />
        </div>
        <div>
          <label className={labelClass}>申請カテゴリ *</label>
          <select required className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>希望する備品・資産名 *</label>
          <input required className={inputClass} value={form.itemName} onChange={(e) => set("itemName", e.target.value)} placeholder="例: ノートPC (ThinkPad X1)" />
        </div>
        <div>
          <label className={labelClass}>利用開始日 *</label>
          <input required type="date" className={inputClass} value={form.periodFrom} onChange={(e) => set("periodFrom", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>利用終了日 *</label>
          <input required type="date" className={inputClass} value={form.periodTo} onChange={(e) => set("periodTo", e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>申請理由 *</label>
          <textarea required className={inputClass} rows={3} value={form.reason} onChange={(e) => set("reason", e.target.value)} placeholder="なぜこの資産が必要なのかを記入してください" />
        </div>
        <div className="md:col-span-2 flex gap-3 justify-end pt-2">
          <button type="button" onClick={onCancel} className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">キャンセル</button>
          <button type="submit" className="px-5 py-2 bg-[#0057B8] text-white rounded-lg text-sm font-medium hover:bg-[#003D80] transition-colors">申請する</button>
        </div>
      </form>
    </div>
  );
}
