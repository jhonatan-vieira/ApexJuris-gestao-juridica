"use client"

import { useState } from "react"
import { Calculator, ArrowLeft, Save, FileText, Link as LinkIcon, Calendar } from "lucide-react"
import Link from "next/link"

interface ResultadoCalculo {
  valorOriginal: number
  dataInicial: string
  dataFinal: string
  indice: string
  fatorCorrecao: number
  valorCorrigido: number
  nomeCalculo?: string
}

export default function CorrecaoMonetariaPage() {
  const [valorOriginal, setValorOriginal] = useState("")
  const [dataInicial, setDataInicial] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [indice, setIndice] = useState("INPC")
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null)
  const [showSalvarModal, setShowSalvarModal] = useState(false)
  const [showAnexarModal, setShowAnexarModal] = useState(false)
  const [nomeCalculo, setNomeCalculo] = useState("")

  const indices = [
    { value: "INPC", label: "INPC - Índice Nacional de Preços ao Consumidor" },
    { value: "IPCA", label: "IPCA - Índice de Preços ao Consumidor Amplo" },
    { value: "IGP-M", label: "IGP-M - Índice Geral de Preços do Mercado" },
    { value: "SELIC", label: "SELIC - Taxa Básica de Juros" },
    { value: "TR", label: "TR - Taxa Referencial" },
  ]

  const calcularCorrecao = () => {
    // Simulação de cálculo (em produção, usar API real de índices)
    const valor = parseFloat(valorOriginal.replace(/\./g, "").replace(",", "."))
    const fator = 1.2847 // Fator simulado
    const valorCorrigido = valor * fator

    setResultado({
      valorOriginal: valor,
      dataInicial,
      dataFinal,
      indice,
      fatorCorrecao: fator,
      valorCorrigido,
    })
  }

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor)
  }

  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-")
    return `${dia}/${mes}/${ano}`
  }

  const handleSalvar = () => {
    if (resultado && nomeCalculo) {
      // Aqui salvaria no Supabase
      console.log("Salvando cálculo:", { ...resultado, nomeCalculo })
      setShowSalvarModal(false)
      setNomeCalculo("")
      alert("Cálculo salvo com sucesso!")
    }
  }

  const gerarPDF = () => {
    // Aqui geraria o PDF
    alert("Gerando PDF... (funcionalidade será implementada)")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/calculos"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#D4AF37] transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Voltar para Cálculos</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Correção Monetária
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Atualize valores com base em índices oficiais
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulário */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Parâmetros do Cálculo
              </h2>

              <div className="space-y-5">
                {/* Valor Original */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Valor Original *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      R$
                    </span>
                    <input
                      type="text"
                      value={valorOriginal}
                      onChange={(e) => setValorOriginal(e.target.value)}
                      placeholder="0,00"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Data Inicial */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data Inicial *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={dataInicial}
                      onChange={(e) => setDataInicial(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Data Final */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data Final *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={dataFinal}
                      onChange={(e) => setDataFinal(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Índice de Correção */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Índice de Correção *
                  </label>
                  <select
                    value={indice}
                    onChange={(e) => setIndice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {indices.map((idx) => (
                      <option key={idx.value} value={idx.value}>
                        {idx.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Botão Calcular */}
                <button
                  onClick={calcularCorrecao}
                  disabled={!valorOriginal || !dataInicial || !dataFinal}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  Calcular Correção
                </button>
              </div>
            </div>

            {/* Resultado */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Resultado do Cálculo
              </h2>

              {!resultado ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    Preencha os campos e clique em "Calcular"
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    O resultado aparecerá aqui
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Detalhes do Cálculo */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Valor Original:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatarMoeda(resultado.valorOriginal)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Período:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatarData(resultado.dataInicial)} a {formatarData(resultado.dataFinal)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Índice:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {resultado.indice}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Fator de Correção:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {resultado.fatorCorrecao.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Valor Corrigido */}
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#C19B2B] rounded-xl p-6 text-white">
                    <p className="text-sm opacity-90 mb-2">Valor Corrigido</p>
                    <p className="text-4xl font-bold">
                      {formatarMoeda(resultado.valorCorrigido)}
                    </p>
                  </div>

                  {/* Ações */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowSalvarModal(true)}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      Salvar Cálculo
                    </button>

                    <button
                      onClick={gerarPDF}
                      className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      Gerar Relatório PDF
                    </button>

                    <button
                      onClick={() => setShowAnexarModal(true)}
                      className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2B] text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      <LinkIcon className="w-5 h-5" />
                      Anexar ao Processo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Salvar */}
      {showSalvarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Salvar Cálculo
            </h3>
            <input
              type="text"
              value={nomeCalculo}
              onChange={(e) => setNomeCalculo(e.target.value)}
              placeholder="Ex: Correção de aluguel - Processo Silva"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSalvarModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                disabled={!nomeCalculo}
                className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Anexar ao Processo */}
      {showAnexarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Anexar ao Processo
            </h3>
            <input
              type="text"
              placeholder="Buscar processo por número ou nome..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
            />
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Lista de processos aparecerá aqui
            </div>
            <button
              onClick={() => setShowAnexarModal(false)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
