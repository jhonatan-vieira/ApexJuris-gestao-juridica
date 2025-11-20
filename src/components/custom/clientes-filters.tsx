"use client"

import { Filter, X } from "lucide-react"

interface ClientesFiltersProps {
  filters: {
    status: string
    tipo: string
    tags: string[]
  }
  setFilters: (filters: any) => void
}

export function ClientesFilters({ filters, setFilters }: ClientesFiltersProps) {
  const tagsDisponiveis = ["Contencioso", "Consultivo", "VIP", "Trabalhista", "Família", "Corporativo", "Tecnologia"]

  const handleStatusChange = (status: string) => {
    setFilters({ ...filters, status })
  }

  const handleTipoChange = (tipo: string) => {
    setFilters({ ...filters, tipo })
  }

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag]
    setFilters({ ...filters, tags: newTags })
  }

  const clearFilters = () => {
    setFilters({ status: "todos", tipo: "todos", tags: [] })
  }

  const hasActiveFilters = filters.status !== "todos" || filters.tipo !== "todos" || filters.tags.length > 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#0A2240]" />
          <h3 className="font-semibold text-[#0A2240]">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-[#D4AF37] hover:text-[#C19B2F] font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Limpar filtros
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">Status</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusChange("todos")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.status === "todos"
                  ? "bg-[#0A2240] text-white"
                  : "bg-gray-100 text-[#333333] hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => handleStatusChange("ativo")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.status === "ativo"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-[#333333] hover:bg-gray-200"
              }`}
            >
              Ativos
            </button>
            <button
              onClick={() => handleStatusChange("inativo")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.status === "inativo"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-100 text-[#333333] hover:bg-gray-200"
              }`}
            >
              Inativos
            </button>
          </div>
        </div>

        {/* Tipo Filter */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">Tipo de Cliente</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTipoChange("todos")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.tipo === "todos"
                  ? "bg-[#0A2240] text-white"
                  : "bg-gray-100 text-[#333333] hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => handleTipoChange("fisica")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.tipo === "fisica"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-[#333333] hover:bg-gray-200"
              }`}
            >
              Pessoa Física
            </button>
            <button
              onClick={() => handleTipoChange("juridica")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.tipo === "juridica"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-[#333333] hover:bg-gray-200"
              }`}
            >
              Pessoa Jurídica
            </button>
          </div>
        </div>

        {/* Tags Filter */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tagsDisponiveis.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.tags.includes(tag)
                    ? "bg-[#D4AF37] text-white"
                    : "bg-gray-100 text-[#333333] hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
