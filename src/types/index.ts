export type Role = "employee" | "manager" | "admin";

export type RequestStatus = "上長確認中" | "承認済" | "却下" | "本社確認中";

export type AssetCategory = "車両" | "寮社宅" | "現場用備品" | "IT機器（電話・PC等）";

export interface AssetRequest {
  id: string;
  applicantName: string;
  company: string;
  department: string;
  category: AssetCategory;
  itemName: string;
  periodFrom: string;
  periodTo: string;
  reason: string;
  status: RequestStatus;
  createdAt: string;
  approvedBy?: string;
}

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  company: string;
  serialNumber: string;
  status: "利用可能" | "利用中" | "メンテナンス中";
  assignedTo?: string;
}

export interface GroupCompany {
  id: string;
  name: string;
  industry: string;
  employeeCount: number;
  joinedDate: string;
  region: string;
}
