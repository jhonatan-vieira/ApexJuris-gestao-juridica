"use client"

import { useState } from "react"
import { FileText, Download, Check, X } from "lucide-react"

interface FaturaGeneratorProps {
  clienteId: string
  clienteNome: string
  onClose: () => void
}

export function FaturaGenerator({ clienteId, clienteNome, onClose }: FaturaGeneratorProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock data - lançamentos de receita pendentes para este cliente
  const lancamentosPendentes = [
    {
      id: "1",
      descricao: "Honorários contratuais - Processo 0001234-56.2024.8.02.0001",
      valor: 5000,
      dataVencimento: "2024-03-01",
      processo: "0001234-56.2024.8.02.0001"
    },
    {
      id: "2",
      descricao: "Honorários de êxito - Processo 0007890-12.2024.8.02.0001",
      valor: 15000,
      dataVencimento: "2024-03-15",
      processo: "0007890-12.2024.8.02.0001"
    },
    {
      id: "3",
      descricao: "Consultoria jurídica - Fevereiro 2024",
      valor: 3000,
      dataVencimento: "2024-02-28",
      processo: null
    },
  ]

  const toggleItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedItems(lancamentosPendentes.map(l => l.id))
  }

  const deselectAll = () => {
    setSelectedItems([])
  }

  const totalSelecionado = lancamentosPendentes
    .filter(l => selectedItems.includes(l.id))
    .reduce((acc, l) => acc + l.valor, 0)

  const handleGeneratePDF = () => {
    setIsGenerating(true)
    
    // Aqui será implementada a lógica de geração do PDF
    setTimeout(() => {
      console.log("Gerando PDF com itens:", selectedItems)
      setIsGenerating(false)
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#0A2240]">Gerar Fatura</h2>
              <p className="text-sm text-[#333333]/60 mt-1">
                Cliente: {clienteNome}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-[#333333]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-[#333333]/60">
              Selecione os itens que deseja incluir na fatura
            </p>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="text-xs text-[#D4AF37] hover:text-[#C19B2F] font-medium"
              >
                Selecionar todos
              </button>
              <span className="text-xs text-[#333333]/40">|</span>
              <button
                onClick={deselectAll}
                className="text-xs text-[#D4AF37] hover:text-[#C19B2F] font-medium"
              >
                Limpar seleção
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {lancamentosPendentes.map((lancamento) => (
              <div
                key={lancamento.id}
                onClick={() => toggleItem(lancamento.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedItems.includes(lancamento.id)
                    ? "border-[#D4AF37] bg-[#D4AF37]/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedItems.includes(lancamento.id)
                          ? "border-[#D4AF37] bg-[#D4AF37]"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedItems.includes(lancamento.id) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#333333] mb-1">
                      {lancamento.descricao}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#333333]/60">
                      <span>
                        Vencimento: {new Date(lancamento.dataVencimento).toLocaleDateString("pt-BR")}
                      </span>
                      {lancamento.processo && (
                        <span className="font-mono">{lancamento.processo}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#0A2240]">
                      R$ {lancamento.valor.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {lancamentosPendentes.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-[#333333]/20 mx-auto mb-4" />
              <p className="text-[#333333]/60 font-medium">
                Nenhum lançamento pendente encontrado
              </p>
              <p className="text-sm text-[#333333]/40 mt-1">
                Adicione receitas pendentes para gerar faturas
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-[#333333]/60">Total da Fatura</p>
              <p className="text-2xl font-bold text-[#0A2240]">
                R$ {totalSelecionado.toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="text-right text-sm text-[#333333]/60">
              {selectedItems.length} {selectedItems.length === 1 ? "item selecionado" : "itens selecionados"}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-[#333333] hover:bg-white transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleGeneratePDF}
              disabled={selectedItems.length === 0 || isGenerating}
              className="flex-1 px-6 py-3 bg-[#D4AF37] hover:bg-[#C19B2F] text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Gerar PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
