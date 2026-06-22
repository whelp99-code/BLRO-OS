import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BLRO Company Operating OS",
  description: "메일, 고객, 프로젝트, 견적, 기술검토, 승인, 재무를 연결하는 AI 운영 시스템"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
