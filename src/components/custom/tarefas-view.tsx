"use client"

import { useState } from "react"
import { LayoutGrid, List, Plus } from "lucide-react"
import { TarefasKanban } from "./tarefas-kanban"
import { TarefasLista } from "./tarefas-lista"
import { TarefasFilters } from "./tarefas-filters"
import { TarefaModal } from "./tarefa-modal"

export function TarefasView() {
  const [view, setView] = useState<"kanban" | "lista">("kanban")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTarefa, setSelectedTarefa] = useState<any>(null)

  const handleEditTarefa = (tarefa: any) => {
    setSelectedTarefa(tarefa)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTarefa(null)
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setView("kanban")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              view === "kanban"
                ? "bg-[#0A2240] text-white"
                : "text-[#333333] hover:bg-gray-100"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="text-sm font-medium">Kanban</span>
          </button>
          <button
            onClick={() => setView("lista")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              view === "lista"
                ? "bg-[#0A2240] text-white"
                : "text-[#333333] hover:bg-gray-100"
            }`}
          >
            <List className="w-4 h-4" />
            <span className="text-sm font-medium">Lista</span>
          </button>
        </div>

        {/* New Task Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C49F2F] text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Nova Tarefa / Prazo</span>
        </button>
      </div>

      {/* Filters */}
      <TarefasFilters />

      {/* Content */}
      {view === "kanban" ? (
        <TarefasKanban onEditTarefa={handleEditTarefa} />
      ) : (
        <TarefasLista onEditTarefa={handleEditTarefa} />
      )}

      {/* Modal */}
      <TarefaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        tarefa={selectedTarefa}
      />
    </div>
  )
}
