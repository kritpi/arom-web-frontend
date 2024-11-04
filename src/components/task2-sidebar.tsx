'use client'

import * as React from 'react'
import { jwtDecode } from 'jwt-decode'
import { Briefcase, Building2, Home, Heart, Plus, Plane } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'


const initialLists = [
  { name: 'Personal', color: '#E2CCBC', icon: Home },
  { name: 'Work', color: '#E2CCBC', icon: Briefcase },
  { name: 'Love', color: '#E2CCBC', icon: Heart },
]

export default function Task2Sidebar() {
  const [isHasToken, setIsHasToken] = React.useState(false)
  const [userData, setUserData] = React.useState<any>()
  const [lists, setLists] = React.useState([
    { name: 'Design Engineering', icon: Building2 },
    { name: 'Sales & Marketing', icon: Briefcase },
    { name: 'Travel', icon: Plane },
  ])
  const [newListName, setNewListName] = React.useState('')
  const [selectedColor, setSelectedColor] = React.useState('#F1BFB9')

  React.useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      setIsHasToken(true)
      setUserData(jwtDecode(token))
    } else {
      setIsHasToken(false)
    }
  }, [])

  const addListItem = () => {
    if (newListName) {
      setLists([...lists, { name: newListName, icon: Building2 }])
      setNewListName('')
      setSelectedColor('#F1BFB9')
    }
  }

  return (
    <Sidebar className="border-r bg-[#F4ECE5]" collapsible="none">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <Dialog>
              <DialogTrigger asChild>
                <SidebarGroupAction>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add Project</span>
                </SidebarGroupAction>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex justify-center text-2xl">Add List</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <input
                      type="text"
                      placeholder="Project name"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    />
                    <button
                      onClick={addListItem}
                      className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
                    >
                      Add Project
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {lists.map((list) => (
                <SidebarMenuItem key={list.name}>
                  <SidebarMenuButton className="w-full justify-start gap-2">
                    <list.icon className="h-4 w-4" />
                    {list.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}