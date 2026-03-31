import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ME-Connect Workflow | グループ横断 資産利用申請",
  description: "マイスターエンジニアリンググループ横断型 備品・資産利用申請ワークフロー",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-800 antialiased">{children}</body>
    </html>
  );
}
