"use client"

import { Search, Bell, Plus } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Title */}
        <div>
          <h2 className="text-2xl font-bold text-[#0A2240] font-geist-sans">Dashboard</h2>
          <p className="text-sm text-[#333333]/60 mt-0.5">Visão geral do escritório</p>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-4">
          {/* Quick Search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Busca rápida..."
              className="w-64 bg-[#F5F5F5] border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-[#333333]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
          </button>

          {/* New Action Button */}
          <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C49F2F] text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Novo</span>
          </button>
        </div>
      </div>
    </header>
  )
}
