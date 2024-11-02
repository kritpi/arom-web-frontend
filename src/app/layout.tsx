import type { Metadata } from "next";
import { Providers } from "./provider/NextUIProvider";
import { Kanit } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { cookies } from "next/headers";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en">
      <body className={kanit.className}>
        <div>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="px-[60px] py-[80px] h-screen w-screen bg-arom_white">
              <SidebarTrigger />
              <Providers>{children}</Providers>
            </main>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
