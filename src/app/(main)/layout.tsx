import { SidebarProvider } from "@/components/ui/sidebar";
import { Providers } from "../provider/NextUIProvider";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
         <SidebarProvider defaultOpen={true} >
            <AppSidebar />
              <main className="h-screen w-screen bg-arom_white">
                <Providers>{children}</Providers>
              </main>
            </SidebarProvider>
    </>
  );
}