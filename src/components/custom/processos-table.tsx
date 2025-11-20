"use client"

import { Eye, Edit, MoreVertical } from "lucide-react"
import Link from "next/link"

// Mock data - será substituído por dados reais do banco
const processos = [
  {
    id: "1",
    numero: "0001234-56.2024.5.01.0001",
    cliente: "João Silva",
    parteContraria: "Empresa XYZ Ltda",
    status: "ativo",
    proximoPrazo: "2024-02-15",
    advogado: "Dr. Silva"
  },
  {
    id: "2",
    numero: "0002345-67.2024.5.01.0002",
    cliente: "Maria Santos",
    parteContraria: "ABC Comércio S.A.",
    status: "ativo",
    proximoPrazo: "2024-02-20",
    advogado: "Dra. Santos"
  },
  {
    id: "3",
    numero: "0003456-78.2024.5.01.0003",
    cliente: "Pedro Oliveira",
    parteContraria: "Construtora DEF",
    status: "suspenso",
    proximoPrazo: "-",
    advogado: "Dr. Oliveira"
  },
  {
    id: "4",
    numero: "0004567-89.2023.5.01.0004",
    cliente: "Ana Costa",
    parteContraria: "Banco GHI",
    status: "arquivado",
    proximoPrazo: "-",
    advogado: "Dr. Silva"
  },
]

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

export function ProcessosTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#0A2240] text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Nº do Processo</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Cliente Principal</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Parte Contrária</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Próximo Prazo</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {processos.map((processo) => (
              <tr key={processo.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-[#0A2240] font-medium">
                    {processo.numero}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#333333] font-medium">{processo.cliente}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#333333]">{processo.parteContraria}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[processo.status as keyof typeof statusColors]}`}>
                    {statusLabels[processo.status as keyof typeof statusLabels]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${processo.proximoPrazo !== "-" ? "text-[#D4AF37] font-semibold" : "text-gray-400"}`}>
                    {processo.proximoPrazo !== "-" 
                      ? new Date(processo.proximoPrazo).toLocaleDateString("pt-BR")
                      : processo.proximoPrazo
                    }
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/processos/${processo.id}`}
                      className="p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors group"
                      title="Ver detalhes"
                    >
                      <Eye className="w-5 h-5 text-[#0A2240] group-hover:text-[#D4AF37]" />
                    </Link>
                    <Link
                      href={`/processos/${processo.id}/editar`}
                      className="p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors group"
                      title="Editar"
                    >
                      <Edit className="w-5 h-5 text-[#0A2240] group-hover:text-[#D4AF37]" />
                    </Link>
                    <button
                      className="p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors group"
                      title="Mais opções"
                    >
                      <MoreVertical className="w-5 h-5 text-[#0A2240] group-hover:text-[#D4AF37]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-gray-200">
        {processos.map((processo) => (
          <div key={processo.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <span className="font-mono text-xs text-[#0A2240] font-medium block mb-1">
                  {processo.numero}
                </span>
                <h3 className="text-[#333333] font-semibold">{processo.cliente}</h3>
                <p className="text-sm text-gray-600 mt-1">vs. {processo.parteContraria}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${statusColors[processo.status as keyof typeof statusColors]}`}>
                {statusLabels[processo.status as keyof typeof statusLabels]}
              </span>
            </div>
            
            {processo.proximoPrazo !== "-" && (
              <div className="mb-3 text-sm">
                <span className="text-gray-600">Próximo prazo: </span>
                <span className="text-[#D4AF37] font-semibold">
                  {new Date(processo.proximoPrazo).toLocaleDateString("pt-BR")}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
              <Link
                href={`/processos/${processo.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0A2240] text-white rounded-lg hover:bg-[#0A2240]/90 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Ver
              </Link>
              <Link
                href={`/processos/${processo.id}/editar`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[#0A2240] text-[#0A2240] rounded-lg hover:bg-[#0A2240]/5 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando <span className="font-semibold">1-4</span> de <span className="font-semibold">4</span> processos
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-[#333333] disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Anterior
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-[#333333] disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Próximo
          </button>
        </div>
      </div>
    </div>
  )
}
