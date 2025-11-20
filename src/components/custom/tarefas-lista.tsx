"use client"

import { useState } from "react"
import { Clock, User, Flag, FileText, ChevronDown, ChevronUp } from "lucide-react"

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

interface TarefasListaProps {
  onEditTarefa: (tarefa: Tarefa) => void
}

export function TarefasLista({ onEditTarefa }: TarefasListaProps) {
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
    },
    {
      id: "6",
      titulo: "Preparar audiência",
      tipo: "prazo",
      responsavel: "Dr. Silva",
      dataVencimento: "2024-01-11",
      prioridade: "urgente",
      processo: "0002468-13.2024.5.01.0001",
      status: "todo"
    }
  ])

  const [expandedGroups, setExpandedGroups] = useState<string[]>(["hoje", "amanha", "esta-semana"])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

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

  const statusConfig = {
    todo: { label: "A Fazer", color: "bg-gray-100 text-gray-700" },
    doing: { label: "Em Andamento", color: "bg-blue-100 text-blue-700" },
    done: { label: "Concluído", color: "bg-green-100 text-green-700" }
  }

  // Agrupar tarefas por período
  const hoje = new Date()
  const amanha = new Date(hoje)
  amanha.setDate(amanha.getDate() + 1)
  const fimSemana = new Date(hoje)
  fimSemana.setDate(fimSemana.getDate() + 7)

  const grupos = [
    {
      id: "hoje",
      titulo: "Hoje",
      tarefas: tarefas.filter(t => {
        const data = new Date(t.dataVencimento)
        return data.toDateString() === hoje.toDateString()
      })
    },
    {
      id: "amanha",
      titulo: "Amanhã",
      tarefas: tarefas.filter(t => {
        const data = new Date(t.dataVencimento)
        return data.toDateString() === amanha.toDateString()
      })
    },
    {
      id: "esta-semana",
      titulo: "Esta Semana",
      tarefas: tarefas.filter(t => {
        const data = new Date(t.dataVencimento)
        return data > amanha && data <= fimSemana
      })
    },
    {
      id: "futuro",
      titulo: "Futuro",
      tarefas: tarefas.filter(t => {
        const data = new Date(t.dataVencimento)
        return data > fimSemana
      })
    }
  ]

  return (
    <div className="space-y-4">
      {grupos.map((grupo) => {
        if (grupo.tarefas.length === 0) return null
        
        const isExpanded = expandedGroups.includes(grupo.id)

        return (
          <div key={grupo.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(grupo.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-[#0A2240] text-lg">{grupo.titulo}</h3>
                <span className="text-sm text-[#333333]/60">
                  {grupo.tarefas.length} {grupo.tarefas.length === 1 ? 'tarefa' : 'tarefas'}
                </span>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-[#333333]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#333333]" />
              )}
            </button>

            {/* Group Content */}
            {isExpanded && (
              <div className="border-t border-gray-200">
                {grupo.tarefas.map((tarefa) => {
                  const TipoIcon = tipoConfig[tarefa.tipo].icon
                  return (
                    <div
                      key={tarefa.id}
                      onClick={() => onEditTarefa(tarefa)}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      {/* Checkbox */}
                      <div className="flex-shrink-0">
                        <div className={`w-5 h-5 rounded border-2 ${
                          tarefa.status === "done" 
                            ? "bg-green-500 border-green-500" 
                            : "border-gray-300 hover:border-[#D4AF37]"
                        } transition-colors`}>
                          {tarefa.status === "done" && (
                            <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h4 className="font-semibold text-[#0A2240]">{tarefa.titulo}</h4>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-white ${priorityConfig[tarefa.prioridade].color} flex-shrink-0`}>
                            <Flag className="w-3 h-3" />
                            {priorityConfig[tarefa.prioridade].label}
                          </span>
                        </div>

                        {tarefa.processo && (
                          <p className="text-xs text-[#333333]/60 mb-2">{tarefa.processo}</p>
                        )}

                        <div className="flex items-center gap-4 text-xs text-[#333333]/60">
                          <span className={`flex items-center gap-1 ${tipoConfig[tarefa.tipo].color}`}>
                            <TipoIcon className="w-3 h-3" />
                            {tarefa.tipo === "tarefa" ? "Tarefa" : "Prazo Fatal"}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {tarefa.responsavel}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(tarefa.dataVencimento).toLocaleDateString('pt-BR')}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full ${statusConfig[tarefa.status].color}`}>
                            {statusConfig[tarefa.status].label}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
