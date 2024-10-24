import type { Metadata } from "next";
import { Providers } from "./provider/NextUIProvider";
import { Kanit} from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/ui/sidebar";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  style: ["normal"],
  subsets: ["latin", "latin-ext", "thai"],
});

export const metadata: Metadata = {
  title: "AROM",
  description: "How was your 'AROM' today?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <div>
        <AdminPanelLayout>{children}</AdminPanelLayout>;
        </div>
      </body>
    </html>
  );
}
