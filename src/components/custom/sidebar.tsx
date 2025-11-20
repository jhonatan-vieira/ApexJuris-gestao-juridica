"use client"

import { Home, FolderOpen, Calendar, FileText, Users, Search, Bell, Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: FolderOpen, label: "Processos", href: "/processos" },
  { icon: Calendar, label: "Prazos & Tarefas", href: "/tarefas" },
  { icon: FileText, label: "Financeiro", href: "/financeiro" },
  { icon: Users, label: "Clientes", href: "/clientes" },
  { icon: FileText, label: "Cálculos", href: "/calculos" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#0A2240] text-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-[#0A2240] text-white w-64 z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <span className="text-[#0A2240] font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold font-geist-sans">Apex Juris</h1>
              <p className="text-xs text-white/60">Gestão Jurídica</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 group"
              >
                <Icon className="w-5 h-5 group-hover:text-[#D4AF37] transition-colors" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
              <span className="text-[#0A2240] font-bold text-sm">U</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Usuário</p>
              <p className="text-xs text-white/60">Advogado</p>
            </div>
            <Bell className="w-5 h-5 text-white/60 hover:text-[#D4AF37] cursor-pointer transition-colors" />
          </div>
        </div>
      </aside>
    </>
  )
}
