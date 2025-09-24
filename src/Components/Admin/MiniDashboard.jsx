"use client"

import React, { useState } from "react"
import {
  Users,
  History,
  Minus,
  LogOut,
  TrendingUp,
  Menu,
  X,
} from "lucide-react"
import ProfileForm from "./CreateUserData"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import GoldManagement from "./GoldManagment"
import CombineGoldManagement from "./CombineGoldManagement"

// Mock ProfileForm component


const sidebarItems = [
  { icon: Users, label: "Create Data", active: true },
  { icon: History, label: "Show Data" },
]

export default function MiniDashboard() {
  const [activeTab, setActiveTab] = useState("Create Data")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "Create Data":
        return (
          <div className=" h-full">
            <ProfileForm/>
          </div>
        )

      case "Show Data":
        return (
         <div>
          <CombineGoldManagement/>
         </div>
        )

      default:
        return <div>Select a menu item</div>
    }
  }

  const handleMenuItemClick = (label) => {
    setActiveTab(label)
    setIsMobileMenuOpen(false)
  }

  const handlelogout = () => {
    navigate('/')
    toast.success('Sign out successful!')
  }

  return (
    <div className="h-full bg-gray-50 flex">
      {/* Desktop Sidebar - Changed to flex layout */}
      <div className="hidden lg:flex lg:flex-col w-64 bg-white shadow-lg border-r border-gray-200 animate-fade-in-left">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RM</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Referral Manager</h1>
              <p className="text-sm text-gray-500">Management System</p>
            </div>
          </div>
        </div>

        {/* Navigation - Takes remaining space */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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

        {/* Sign Out Button - Fixed at bottom */}
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handlelogout}  
            className="w-full flex items-center justify-start px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-300"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden h-full fixed inset-0 z-50  bg-transparent bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed h-full inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col">
            {/* Mobile Menu Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
               
                <div>
                  <h1 className="font-semibold text-gray-900">Admin</h1>
                  <p className="text-sm text-gray-500">Management System</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {sidebarItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => handleMenuItemClick(item.label)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 hover:bg-gray-100 ${
                    activeTab === item.label
                      ? "bg-gray-100 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Sign Out */}
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={handlelogout}
                className="w-full flex items-center justify-start px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-300"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            {sidebarItems.find((item) => item.label === activeTab) && (
              <>
                {(() => {
                  const activeItem = sidebarItems.find((item) => item.label === activeTab)
                  return <activeItem.icon className="w-5 h-5 text-gray-600" />
                })()}
                <h1 className="text-lg font-semibold text-gray-900">{activeTab}</h1>
              </>
            )}
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        <div className="flex-1 p-4 lg:p-8">
          <div className="hidden lg:flex items-center justify-between mb-8 animate-fade-in-right">
            <div className="flex items-center space-x-2">
              {sidebarItems.find((item) => item.label === activeTab) && (
                <>
                  {(() => {
                    const activeItem = sidebarItems.find((item) => item.label === activeTab)
                    return <activeItem.icon className="w-6 h-6 text-gray-600" />
                  })()}
                  <h1 className="text-2xl font-semibold text-gray-900">{activeTab}</h1>
                </>
              )}
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  )
}