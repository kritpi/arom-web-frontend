"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarInset 
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Calendar, Home, Search, FolderCheck } from "lucide-react";
import AROMImage from "/src/app/img/AROM.png";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const items = [
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Diary",
    url: "/diary/",
    icon: Home,
  },
  {
    title: "Tasks",
    url: "/task",
    icon: FolderCheck ,
  },
];

export function AppSidebar() {
  const [isHasToken, setIsHasToken] = useState(false);
  const [userData, setUserData] = useState<any>()

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsHasToken(true);
      setUserData(jwtDecode(token))
      console.log(token);
      console.log(userData);
    } else {
      setIsHasToken(false);
    }
  }, [setIsHasToken]);
  return (
    <SidebarInset className="flex-1 " >
      <div className=" bg-[#F9F4ED] w-[200px] h-full">
        <SidebarHeader>
          <div className="flex justify-center">
            <Image src={AROMImage} width={150} height={80} alt="AROM" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <p>{userData?.username}</p>
            <div className="grid grid-flow-row gap-4 justify-center">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-[#E9DBD1] text-xl text-arom_brown  focus:bg-[#E9DBD1]"
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

                {typeof window !== "undefined" &&
                isHasToken ? (
                <SidebarMenuItem>
                  <SidebarMenuButton
                  asChild
                  className="hover:bg-[#E9DBD1] text-xl text-arom_brown focus:bg-[#E9DBD1]"
                  onClick={() => {
                    localStorage.removeItem("jwtToken");
                    setIsHasToken(false);
                    window.location.reload();
                  }}
                  >
                  <a>
                    <span>Log out</span>
                  </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton
                  asChild
                  className="hover:bg-[#E9DBD1] text-xl  text-arom_brown focus:bg-[#E9DBD1] justify-center"
                  >
                  <a href="/login">
                    <span>Log in</span>
                  </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                )}
            </div>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter />
      </div>
    </SidebarInset>
  );
}
