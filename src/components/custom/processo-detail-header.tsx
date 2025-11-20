"use client"

import { Edit, FileText, DollarSign } from "lucide-react"
import Link from "next/link"

interface ProcessoDetailHeaderProps {
  processo: {
    id: string
    numero: string
    cliente: string
    status: string
    advogado: string
    vara: string
    comarca: string
    tipoAcao: string
    valorCausa: string
  }
}

const statusColors = {
  ativo: "bg-green-100 text-green-800 border-green-200",
  suspenso: "bg-yellow-100 text-yellow-800 border-yellow-200",
  arquivado: "bg-gray-100 text-gray-800 border-gray-200"
}

const statusLabels = {
  ativo: "Ativo",
  suspenso: "Suspenso",
  arquivado: "Arquivado"
}

export function ProcessoDetailHeader({ processo }: ProcessoDetailHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0A2240] font-mono">
              {processo.numero}
            </h1>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[processo.status as keyof typeof statusColors]}`}>
              {statusLabels[processo.status as keyof typeof statusLabels]}
            </span>
          </div>
          <p className="text-lg text-[#333333] font-semibold">{processo.cliente}</p>
          <p className="text-sm text-gray-600 mt-1">vs. {processo.parteContraria}</p>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/processos/${processo.id}/editar`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#0A2240] text-[#0A2240] rounded-lg hover:bg-[#0A2240]/5 transition-colors font-medium"
          >
            <Edit className="w-4 h-4" />
            Editar
          </Link>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white rounded-lg transition-colors font-medium">
            <FileText className="w-4 h-4" />
            Gerar Relatório
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        <div>
          <p className="text-xs text-gray-500 mb-1">Advogado Responsável</p>
          <p className="text-sm font-semibold text-[#0A2240]">{processo.advogado}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Vara</p>
          <p className="text-sm font-semibold text-[#0A2240]">{processo.vara}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Tipo de Ação</p>
          <p className="text-sm font-semibold text-[#0A2240]">{processo.tipoAcao}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Valor da Causa</p>
          <p className="text-sm font-semibold text-[#D4AF37] flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            {processo.valorCausa}
          </p>
        </div>
      </div>
    </div>
  )
}
