import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Image from "next/image";
import { Calendar, Home, Search, FolderCheck  } from "lucide-react"
 
const items = [
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Diary",
    url: "#",
    icon: Home,
  },
  {
    title: "Tasks",
    url: "#",
    icon: FolderCheck ,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="bg-[#FFFCF9] h-full">
      <SidebarHeader>
        <div className="flex justify-center">
            <Image
            src="/images/AROM.png"
            width={150}
            height={80}
            alt="AROM"
            />  
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <div className="grid grid-flow-row gap-4 justify-center">
            {items.map((item) => (
                  <SidebarMenuItem key={item.title} >
                    <SidebarMenuButton asChild className="hover:bg-[#E9DBD1] text-arom_brown  focus:bg-[#E9DBD1]">
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
          </div>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
      </div>
    </Sidebar>
  )
}
