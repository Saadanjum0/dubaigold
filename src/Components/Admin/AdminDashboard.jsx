"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  History,
  ArrowUpDown,
  Minus,
  MessageSquare,
  Megaphone,
  Component,
  Code,
  Shield,
  LogOut,
  User,
  DollarSign,
  TrendingUp,
  Wallet,
  Star,
  Send,
  Settings,
} from "lucide-react"
import ProfileForm from "./CreateUserData"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import GoldManagement from "./GoldManagment"
import CombineGoldManagement from "./CombineGoldManagement"

const sidebarItems = [
  { icon: Users, label: "Create Data",active: true  },
  { icon: History, label: "Show data" },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Create Data")
  const navigate =useNavigate()

  const renderContent = () => {
    switch (activeTab) {
     

      

      case "Create Data":
        return (
          <div>
            <ProfileForm/>
          </div>
        )

      case "Show data":
        return (
         <div>
          <CombineGoldManagement/>
         </div>
        )

   

    
    }
  }

const handlelogout=()=>{
  localStorage.removeItem("token");
  navigate('/')
  toast.success('signout successfull')
}
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 animate-fade-in-left">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
           
            <div>
              <h1 className="font-semibold text-gray-900">Admin</h1>
              <p className="text-sm text-gray-500">Management System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 hover:bg-gray-100 animate-fade-in-up ${
                activeTab === item.label
                  ? "bg-gray-100 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="absolute bottom-4 left-4 right-4">
          
          <button onClick={handlelogout} className=" flex items-center justify-start px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-300">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-right">
          <div className="flex items-center space-x-2">
            {sidebarItems.find((item) => item.label === activeTab) && (
              <>
                {
                  (() => {
                    const item = sidebarItems.find((item) => item.label === activeTab)
                    return item ? <item.icon className="w-6 h-6 text-gray-600" /> : null
                  })()
                }
                <h1 className="text-2xl font-semibold text-gray-900">{activeTab}</h1>
              </>
            )}
          </div>
        </div>

        {renderContent()}

        
      </div>
    </div>
  )
}