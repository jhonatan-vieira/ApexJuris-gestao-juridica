"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

export function TarefasFilters() {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    responsavel: "",
    prioridade: "",
    processo: ""
  })

  const handleClearFilters = () => {
    setFilters({
      responsavel: "",
      prioridade: "",
      processo: ""
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== "")

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-[#0A2240] hover:text-[#D4AF37] transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filtros Avançados</span>
        </button>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Limpar filtros</span>
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          {/* Responsável */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Responsável
            </label>
            <select
              value={filters.responsavel}
              onChange={(e) => setFilters({ ...filters, responsavel: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="dr-silva">Dr. Silva</option>
              <option value="dra-santos">Dra. Santos</option>
              <option value="dr-oliveira">Dr. Oliveira</option>
            </select>
          </div>

          {/* Prioridade */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Prioridade
            </label>
            <select
              value={filters.prioridade}
              onChange={(e) => setFilters({ ...filters, prioridade: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            >
              <option value="">Todas</option>
              <option value="urgente">Urgente</option>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>

          {/* Processo */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Processo Associado
            </label>
            <input
              type="text"
              value={filters.processo}
              onChange={(e) => setFilters({ ...filters, processo: e.target.value })}
              placeholder="Buscar processo..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  )
}
