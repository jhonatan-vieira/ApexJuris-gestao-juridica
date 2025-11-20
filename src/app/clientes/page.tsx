"use client"

import { useState } from "react"
import { Sidebar } from "@/components/custom/sidebar"
import { Header } from "@/components/custom/header"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { ClientesTable } from "@/components/custom/clientes-table"
import { ClientesFilters } from "@/components/custom/clientes-filters"

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: "todos",
    tipo: "todos",
    tags: [] as string[]
  })

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        
        <main className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0A2240]">
                  Gestão de Clientes
                </h1>
                <p className="text-sm text-[#333333]/60 mt-1">
                  Gerencie sua carteira de clientes e relacionamentos
                </p>
              </div>
              <Link
                href="/clientes/novo"
                className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Novo Cliente
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#333333]/40" />
              <input
                type="text"
                placeholder="Buscar por nome, CPF/CNPJ ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
              />
            </div>
          </div>

          {/* Filters */}
          <ClientesFilters filters={filters} setFilters={setFilters} />

          {/* Clientes Table */}
          <ClientesTable searchTerm={searchTerm} filters={filters} />
        </main>
      </div>
    </div>
  )
}
