"use client"

import { useState } from "react"
import { GripVertical, Clock, User, Flag, FileText } from "lucide-react"

interface Tarefa {
  id: string
  titulo: string
  tipo: "tarefa" | "prazo"
  responsavel: string
  dataVencimento: string
  prioridade: "urgente" | "alta" | "media" | "baixa"
  processo?: string
  status: "todo" | "doing" | "done"
}

interface TarefasKanbanProps {
  onEditTarefa: (tarefa: Tarefa) => void
}

export function TarefasKanban({ onEditTarefa }: TarefasKanbanProps) {
  const [tarefas] = useState<Tarefa[]>([
    {
      id: "1",
      titulo: "Elaborar contestação",
      tipo: "tarefa",
      responsavel: "Dr. Silva",
      dataVencimento: "2024-01-15",
      prioridade: "urgente",
      processo: "0001234-56.2024.5.01.0001",
      status: "todo"
    },
    {
      id: "2",
      titulo: "Reunião com cliente",
      tipo: "tarefa",
      responsavel: "Dra. Santos",
      dataVencimento: "2024-01-12",
      prioridade: "alta",
      processo: "0007890-12.2024.8.02.0001",
      status: "todo"
    },
    {
      id: "3",
      titulo: "Revisar petição inicial",
      tipo: "tarefa",
      responsavel: "Dr. Oliveira",
      dataVencimento: "2024-01-18",
      prioridade: "media",
      processo: "0003456-78.2024.8.02.0001",
      status: "doing"
    },
    {
      id: "4",
      titulo: "Protocolar recurso",
      tipo: "prazo",
      responsavel: "Dr. Silva",
      dataVencimento: "2024-01-20",
      prioridade: "alta",
      processo: "0009876-54.2024.5.01.0001",
      status: "doing"
    },
    {
      id: "5",
      titulo: "Análise de documentos",
      tipo: "tarefa",
      responsavel: "Dra. Santos",
      dataVencimento: "2024-01-08",
      prioridade: "baixa",
      status: "done"
    }
  ])

  const columns = [
    { id: "todo", title: "A Fazer", color: "border-gray-300" },
    { id: "doing", title: "Em Andamento", color: "border-blue-400" },
    { id: "done", title: "Concluído", color: "border-green-400" }
  ]

  const priorityConfig = {
    urgente: { color: "bg-red-500", label: "Urgente" },
    alta: { color: "bg-orange-500", label: "Alta" },
    media: { color: "bg-yellow-500", label: "Média" },
    baixa: { color: "bg-green-500", label: "Baixa" }
  }

  const tipoConfig = {
    tarefa: { icon: FileText, color: "text-blue-600" },
    prazo: { icon: Clock, color: "text-red-600" }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {columns.map((column) => (
        <div key={column.id} className="flex flex-col">
          {/* Column Header */}
          <div className={`bg-white rounded-t-xl border-t-4 ${column.color} p-4`}>
            <h3 className="font-bold text-[#0A2240] text-lg">{column.title}</h3>
            <p className="text-sm text-[#333333]/60 mt-1">
              {tarefas.filter(t => t.status === column.id).length} {tarefas.filter(t => t.status === column.id).length === 1 ? 'tarefa' : 'tarefas'}
            </p>
          </div>

          {/* Column Content */}
          <div className="bg-[#F5F5F5] rounded-b-xl p-4 space-y-3 min-h-[400px]">
            {tarefas
              .filter(tarefa => tarefa.status === column.id)
              .map((tarefa) => {
                const TipoIcon = tipoConfig[tarefa.tipo].icon
                return (
                  <div
                    key={tarefa.id}
                    onClick={() => onEditTarefa(tarefa)}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all cursor-move group"
                  >
                    {/* Drag Handle */}
                    <div className="flex items-start gap-3">
                      <GripVertical className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                      
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h4 className="font-semibold text-[#0A2240] mb-2 line-clamp-2">
                          {tarefa.titulo}
                        </h4>

                        {/* Processo */}
                        {tarefa.processo && (
                          <p className="text-xs text-[#333333]/60 mb-3 truncate">
                            {tarefa.processo}
                          </p>
                        )}

                        {/* Meta Info */}
                        <div className="space-y-2">
                          {/* Tipo e Prioridade */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`flex items-center gap-1 text-xs ${tipoConfig[tarefa.tipo].color}`}>
                              <TipoIcon className="w-3 h-3" />
                              {tarefa.tipo === "tarefa" ? "Tarefa" : "Prazo Fatal"}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-white ${priorityConfig[tarefa.prioridade].color}`}>
                              <Flag className="w-3 h-3" />
                              {priorityConfig[tarefa.prioridade].label}
                            </span>
                          </div>

                          {/* Responsável e Data */}
                          <div className="flex items-center justify-between text-xs text-[#333333]/60">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {tarefa.responsavel}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(tarefa.dataVencimento).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}
