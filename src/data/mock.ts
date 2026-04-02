import { AssetRequest, Asset, GroupCompany } from "@/types";

export const groupCompanies: GroupCompany[] = [
  { id: "gc-1", name: "MEテクノサービス株式会社", industry: "設備メンテナンス", employeeCount: 320, joinedDate: "2019-04", region: "関東" },
  { id: "gc-2", name: "MEプラントエンジニアリング株式会社", industry: "プラント設備", employeeCount: 180, joinedDate: "2020-08", region: "中部" },
  { id: "gc-3", name: "MEファシリティマネジメント株式会社", industry: "ビル管理", employeeCount: 240, joinedDate: "2021-03", region: "関西" },
  { id: "gc-4", name: "MEインフラテック株式会社", industry: "インフラ保全", employeeCount: 150, joinedDate: "2022-01", region: "東北" },
  { id: "gc-5", name: "MEエレクトロニクス株式会社", industry: "電気設備", employeeCount: 90, joinedDate: "2023-06", region: "九州" },
  { id: "gc-6", name: "MEグリーンエナジー株式会社", industry: "再生可能エネルギー", employeeCount: 60, joinedDate: "2024-02", region: "北海道" },
];

export const initialRequests: AssetRequest[] = [
  { id: "req-001", applicantName: "田中 太郎", company: "MEテクノサービス株式会社", department: "設備保全課", category: "IT機器（電話・PC等）", itemName: "ノートPC (ThinkPad)", periodFrom: "2026-04-01", periodTo: "2029-03-31", reason: "現行機のリース期限切れに伴う更新", status: "上長確認中", createdAt: "2026-03-28" },
  { id: "req-002", applicantName: "佐藤 花子", company: "MEプラントエンジニアリング株式会社", department: "工事管理部", category: "車両", itemName: "社用車 (プロボックス)", periodFrom: "2026-04-15", periodTo: "2027-04-14", reason: "新規案件の現場巡回用", status: "承認済", createdAt: "2026-03-20", approvedBy: "鈴木 課長" },
  { id: "req-003", applicantName: "山田 健一", company: "MEファシリティマネジメント株式会社", department: "ビル管理課", category: "現場用備品", itemName: "電動工具セット", periodFrom: "2026-04-01", periodTo: "2026-09-30", reason: "新規受注ビルの保守業務に必要", status: "却下", createdAt: "2026-03-15" },
  { id: "req-004", applicantName: "鈴木 美咲", company: "MEインフラテック株式会社", department: "総務部", category: "寮社宅", itemName: "社宅 (2LDK・仙台市)", periodFrom: "2026-05-01", periodTo: "2028-04-30", reason: "新入社員の転勤受け入れ", status: "本社確認中", createdAt: "2026-03-25" },
  { id: "req-005", applicantName: "高橋 一郎", company: "MEテクノサービス株式会社", department: "技術開発部", category: "IT機器（電話・PC等）", itemName: "iPad Pro + Apple Pencil", periodFrom: "2026-04-01", periodTo: "2029-03-31", reason: "現場での図面確認・電子サインに利用", status: "上長確認中", createdAt: "2026-03-29" },
  { id: "req-006", applicantName: "中村 隆", company: "MEエレクトロニクス株式会社", department: "施工管理課", category: "車両", itemName: "ライトバン (ハイエース)", periodFrom: "2026-04-10", periodTo: "2027-04-09", reason: "資材搬送用車両が不足", status: "承認済", createdAt: "2026-03-18", approvedBy: "木村 部長" },
  { id: "req-007", applicantName: "伊藤 彩", company: "MEグリーンエナジー株式会社", department: "発電事業部", category: "現場用備品", itemName: "安全帯・ヘルメットセット", periodFrom: "2026-04-01", periodTo: "2027-03-31", reason: "風力発電所の定期点検業務用", status: "上長確認中", createdAt: "2026-03-30" },
];

export const initialAssets: Asset[] = [
  // IT機器
  { id: "ast-001", name: "ThinkPad X1 Carbon Gen11", category: "IT機器（電話・PC等）", company: "共通", serialNumber: "TP-2024-0001", status: "利用中", assignedTo: "田中 太郎" },
  { id: "ast-002", name: "ThinkPad X1 Carbon Gen11", category: "IT機器（電話・PC等）", company: "共通", serialNumber: "TP-2024-0002", status: "利用可能" },
  { id: "ast-007", name: "iPad Pro 12.9インチ", category: "IT機器（電話・PC等）", company: "共通", serialNumber: "AP-2024-0003", status: "利用可能" },
  { id: "ast-009", name: "iPad Pro 12.9インチ", category: "IT機器（電話・PC等）", company: "共通", serialNumber: "AP-2024-0004", status: "利用中", assignedTo: "高橋 一郎" },
  { id: "ast-010", name: "MacBook Pro 14インチ", category: "IT機器（電話・PC等）", company: "MEテクノサービス", serialNumber: "MB-2024-0005", status: "利用可能" },
  { id: "ast-011", name: "業務用スマートフォン (Galaxy)", category: "IT機器（電話・PC等）", company: "MEファシリティマネジメント", serialNumber: "SP-2024-0010", status: "利用可能" },
  { id: "ast-012", name: "業務用スマートフォン (Galaxy)", category: "IT機器（電話・PC等）", company: "MEファシリティマネジメント", serialNumber: "SP-2024-0011", status: "利用中", assignedTo: "山田 健一" },
  // 車両
  { id: "ast-003", name: "プロボックス (白)", category: "車両", company: "MEプラントエンジニアリング", serialNumber: "品川 300 あ 1234", status: "利用中", assignedTo: "佐藤 花子" },
  { id: "ast-004", name: "ハイエース (白)", category: "車両", company: "MEエレクトロニクス", serialNumber: "福岡 500 か 5678", status: "利用可能" },
  { id: "ast-013", name: "ハイエース (銀)", category: "車両", company: "MEテクノサービス", serialNumber: "横浜 100 め 9012", status: "利用可能" },
  { id: "ast-014", name: "プロボックス (黒)", category: "車両", company: "MEインフラテック", serialNumber: "宮城 500 い 3456", status: "メンテナンス中" },
  { id: "ast-015", name: "軽トラック (白)", category: "車両", company: "MEグリーンエナジー", serialNumber: "札幌 480 う 7890", status: "利用可能" },
  // 寮・社宅
  { id: "ast-005", name: "社宅 仙台市青葉区 2LDK", category: "寮社宅", company: "MEインフラテック", serialNumber: "DRM-SND-201", status: "利用可能" },
  { id: "ast-016", name: "寮 横浜市鶴見区 1K (3室)", category: "寮社宅", company: "MEテクノサービス", serialNumber: "DRM-YKH-101", status: "利用中", assignedTo: "新入社員3名" },
  { id: "ast-017", name: "社宅 大阪市北区 1LDK", category: "寮社宅", company: "MEファシリティマネジメント", serialNumber: "DRM-OSK-301", status: "利用可能" },
  // 現場用備品
  { id: "ast-006", name: "電動工具セット (マキタ)", category: "現場用備品", company: "共通", serialNumber: "TL-2024-0010", status: "メンテナンス中" },
  { id: "ast-008", name: "安全帯・ヘルメットセット", category: "現場用備品", company: "共通", serialNumber: "SF-2024-0020", status: "利用可能" },
  { id: "ast-018", name: "発電機 (インバーター式)", category: "現場用備品", company: "MEプラントエンジニアリング", serialNumber: "GN-2024-0030", status: "利用可能" },
  { id: "ast-019", name: "測定器セット (テスター・計測器)", category: "現場用備品", company: "MEエレクトロニクス", serialNumber: "MT-2024-0015", status: "利用中", assignedTo: "中村 隆" },
  { id: "ast-020", name: "高所作業用足場セット", category: "現場用備品", company: "MEグリーンエナジー", serialNumber: "SC-2024-0040", status: "利用可能" },
];
