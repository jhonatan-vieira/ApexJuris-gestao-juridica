"use client"

import { useState } from "react"
import { Plus, Search, Filter, Download, CheckCircle, Clock, DollarSign, FileText } from "lucide-react"
import Link from "next/link"
import { FinanceiroFilters } from "./financeiro-filters"

export function FinanceiroLancamentos() {
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - será substituído por dados reais do Supabase
  const lancamentos = [
    {
      id: "1",
      tipo: "receita",
      descricao: "Honorários contratuais - João Silva",
      valor: 5000,
      dataVencimento: "2024-02-15",
      status: "pago",
      clienteProcesso: "João Silva - Proc. 0001234-56.2024.8.02.0001",
      dataPagamento: "2024-02-14"
    },
    {
      id: "2",
      tipo: "receita",
      descricao: "Honorários de êxito - Maria Santos",
      valor: 15000,
      dataVencimento: "2024-03-01",
      status: "pendente",
      clienteProcesso: "Maria Santos - Proc. 0007890-12.2024.8.02.0001",
      dataPagamento: null
    },
    {
      id: "3",
      tipo: "despesa",
      descricao: "Custas processuais",
      valor: 350,
      dataVencimento: "2024-02-10",
      status: "pago",
      clienteProcesso: "Proc. 0001234-56.2024.8.02.0001",
      categoria: "Custas",
      dataPagamento: "2024-02-09"
    },
    {
      id: "4",
      tipo: "receita",
      descricao: "Consultoria jurídica - Empresa XYZ",
      valor: 8000,
      dataVencimento: "2024-02-20",
      status: "pendente",
      clienteProcesso: "Empresa XYZ Ltda",
      dataPagamento: null
    },
    {
      id: "5",
      tipo: "despesa",
      descricao: "Material de escritório",
      valor: 450,
      dataVencimento: "2024-02-28",
      status: "pendente",
      clienteProcesso: "Geral",
      categoria: "Material de Escritório",
      dataPagamento: null
    },
    {
      id: "6",
      tipo: "despesa",
      descricao: "Impostos - IRPJ",
      valor: 3200,
      dataVencimento: "2024-02-25",
      status: "pendente",
      clienteProcesso: "Geral",
      categoria: "Impostos",
      dataPagamento: null
    },
  ]

  const totalReceitas = lancamentos
    .filter(l => l.tipo === "receita")
    .reduce((acc, l) => acc + l.valor, 0)

  const totalDespesas = lancamentos
    .filter(l => l.tipo === "despesa")
    .reduce((acc, l) => acc + l.valor, 0)

  const saldoLiquido = totalReceitas - totalDespesas

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0A2240]">Lançamentos</h2>
          <p className="text-sm text-[#333333]/60 mt-1">
            Livro-caixa digital do escritório
          </p>
        </div>
        <Link
          href="/financeiro/novo"
          className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Novo Lançamento
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700 font-medium mb-1">Total Receitas</p>
          <p className="text-2xl font-bold text-green-800">
            R$ {totalReceitas.toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700 font-medium mb-1">Total Despesas</p>
          <p className="text-2xl font-bold text-red-800">
            R$ {totalDespesas.toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-medium mb-1">Saldo Líquido</p>
          <p className="text-2xl font-bold text-blue-800">
            R$ {saldoLiquido.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#333333]/40" />
          <input
            type="text"
            placeholder="Buscar lançamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-5 h-5" />
          Filtros
        </button>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="w-5 h-5" />
          Exportar
        </button>
      </div>

      {/* Filters Component */}
      {showFilters && <FinanceiroFilters />}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#333333]">Descrição</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#333333]">Tipo</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-[#333333]">Valor</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#333333]">Cliente/Processo</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#333333]">Vencimento</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-[#333333]">Status</th>
            </tr>
          </thead>
          <tbody>
            {lancamentos.map((lancamento) => (
              <tr
                key={lancamento.id}
                className="border-b border-gray-100 hover:bg-[#F5F5F5] transition-colors cursor-pointer"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      lancamento.tipo === "receita" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {lancamento.tipo === "receita" ? (
                        <DollarSign className="w-5 h-5 text-green-600" />
                      ) : (
                        <FileText className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-[#333333]">{lancamento.descricao}</p>
                      {lancamento.categoria && (
                        <p className="text-xs text-[#333333]/60">{lancamento.categoria}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    lancamento.tipo === "receita"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {lancamento.tipo === "receita" ? "Receita" : "Despesa"}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className={`font-bold ${
                    lancamento.tipo === "receita" ? "text-green-600" : "text-red-600"
                  }`}>
                    {lancamento.tipo === "receita" ? "+" : "-"} R$ {lancamento.valor.toLocaleString("pt-BR")}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-[#333333]">{lancamento.clienteProcesso}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-[#333333]">
                    {new Date(lancamento.dataVencimento).toLocaleDateString("pt-BR")}
                  </p>
                </td>
                <td className="py-4 px-4 text-center">
                  {lancamento.status === "pago" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3" />
                      Pago
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                      <Clock className="w-3 h-3" />
                      Pendente
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {lancamentos.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="w-16 h-16 text-[#333333]/20 mx-auto mb-4" />
          <p className="text-[#333333]/60 font-medium mb-2">Nenhum lançamento encontrado</p>
          <p className="text-sm text-[#333333]/40 mb-6">
            Comece adicionando receitas e despesas ao seu livro-caixa
          </p>
          <Link
            href="/financeiro/novo"
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            Adicionar Primeiro Lançamento
          </Link>
        </div>
      )}
    </div>
  )
}
