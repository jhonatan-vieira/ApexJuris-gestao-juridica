"use client"

import { Sidebar } from "@/components/custom/sidebar"
import { Header } from "@/components/custom/header"
import { ProcessosTable } from "@/components/custom/processos-table"
import { ProcessosFilters } from "@/components/custom/processos-filters"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ProcessosPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <Header />
        
        {/* Processos Content */}
        <main className="p-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#0A2240]">Processos</h1>
              <p className="text-[#333333] mt-1">Gerencie todos os processos do escritório</p>
            </div>
            <Link
              href="/processos/novo"
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Novo Processo
            </Link>
          </div>

          {/* Filters */}
          <ProcessosFilters />

          {/* Table */}
          <ProcessosTable />
        </main>
      </div>
    </div>
  )
}
