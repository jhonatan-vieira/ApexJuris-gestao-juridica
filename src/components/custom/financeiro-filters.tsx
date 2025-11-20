"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function FinanceiroFilters() {
  const [filters, setFilters] = useState({
    tipo: "",
    status: "",
    periodo: "",
    cliente: ""
  })

  const handleClearFilters = () => {
    setFilters({
      tipo: "",
      status: "",
      periodo: "",
      cliente: ""
    })
  }

  return (
    <div className="bg-[#F5F5F5] rounded-lg p-4 mb-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#0A2240]">Filtros Avançados</h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-[#D4AF37] hover:text-[#C19B2F] font-medium flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Limpar filtros
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Tipo
          </label>
          <select
            value={filters.tipo}
            onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
          >
            <option value="">Todos</option>
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
          >
            <option value="">Todos</option>
            <option value="pago">Pago</option>
            <option value="pendente">Pendente</option>
          </select>
        </div>

        {/* Período */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Período
          </label>
          <select
            value={filters.periodo}
            onChange={(e) => setFilters({ ...filters, periodo: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
          >
            <option value="">Todos</option>
            <option value="mes-atual">Mês Atual</option>
            <option value="mes-anterior">Mês Anterior</option>
            <option value="trimestre">Último Trimestre</option>
            <option value="semestre">Último Semestre</option>
            <option value="ano">Ano Atual</option>
          </select>
        </div>

        {/* Cliente */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Cliente
          </label>
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={filters.cliente}
            onChange={(e) => setFilters({ ...filters, cliente: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}
