"use client"

import { Search, Filter } from "lucide-react"
import { useState } from "react"

export function ProcessosFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [advogadoFilter, setAdvogadoFilter] = useState("todos")
  const [tipoAcaoFilter, setTipoAcaoFilter] = useState("todos")

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por número do processo, cliente ou parte contrária..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            <Filter className="w-4 h-4 inline mr-1" />
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] bg-white"
          >
            <option value="todos">Todos</option>
            <option value="ativo">Ativo</option>
            <option value="suspenso">Suspenso</option>
            <option value="arquivado">Arquivado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Advogado Responsável
          </label>
          <select
            value={advogadoFilter}
            onChange={(e) => setAdvogadoFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] bg-white"
          >
            <option value="todos">Todos</option>
            <option value="dr-silva">Dr. Silva</option>
            <option value="dra-santos">Dra. Santos</option>
            <option value="dr-oliveira">Dr. Oliveira</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Tipo de Ação
          </label>
          <select
            value={tipoAcaoFilter}
            onChange={(e) => setTipoAcaoFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] bg-white"
          >
            <option value="todos">Todos</option>
            <option value="trabalhista">Trabalhista</option>
            <option value="civil">Civil</option>
            <option value="criminal">Criminal</option>
            <option value="tributario">Tributário</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setSearchTerm("")
              setStatusFilter("todos")
              setAdvogadoFilter("todos")
              setTipoAcaoFilter("todos")
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#333333] font-medium"
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>
  )
}
