"use client"

import { useState } from "react"
import { Calculator, ArrowLeft, Save, FileText, Link as LinkIcon, Calendar, Percent } from "lucide-react"
import Link from "next/link"

interface ResultadoCalculo {
  valorPrincipal: number
  dataInicial: string
  dataFinal: string
  taxaJuros: number
  tipoJuros: string
  valorJuros: number
  valorTotal: number
  nomeCalculo?: string
}

export default function JurosMoratoriosPage() {
  const [valorPrincipal, setValorPrincipal] = useState("")
  const [dataInicial, setDataInicial] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [taxaJuros, setTaxaJuros] = useState("1")
  const [tipoJuros, setTipoJuros] = useState("simples")
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null)
  const [showSalvarModal, setShowSalvarModal] = useState(false)
  const [showAnexarModal, setShowAnexarModal] = useState(false)
  const [nomeCalculo, setNomeCalculo] = useState("")

  const tiposJuros = [
    { value: "simples", label: "Juros Simples" },
    { value: "compostos", label: "Juros Compostos" },
  ]

  const calcularJuros = () => {
    const valor = parseFloat(valorPrincipal.replace(/\./g, "").replace(",", "."))
    const taxa = parseFloat(taxaJuros) / 100

    // Calcular dias entre as datas
    const inicio = new Date(dataInicial)
    const fim = new Date(dataFinal)
    const dias = Math.floor((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24))
    const meses = dias / 30

    let valorJuros = 0
    if (tipoJuros === "simples") {
      valorJuros = valor * taxa * meses
    } else {
      valorJuros = valor * (Math.pow(1 + taxa, meses) - 1)
    }

    const valorTotal = valor + valorJuros

    setResultado({
      valorPrincipal: valor,
      dataInicial,
      dataFinal,
      taxaJuros: parseFloat(taxaJuros),
      tipoJuros,
      valorJuros,
      valorTotal,
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
      console.log("Salvando cálculo:", { ...resultado, nomeCalculo })
      setShowSalvarModal(false)
      setNomeCalculo("")
      alert("Cálculo salvo com sucesso!")
    }
  }

  const gerarPDF = () => {
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
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Percent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Juros Moratórios
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Calcule juros de mora sobre valores devidos
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
                {/* Valor Principal */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Valor Principal *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      R$
                    </span>
                    <input
                      type="text"
                      value={valorPrincipal}
                      onChange={(e) => setValorPrincipal(e.target.value)}
                      placeholder="0,00"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Data Inicial */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data Inicial (Vencimento) *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={dataInicial}
                      onChange={(e) => setDataInicial(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Data Final */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data Final (Pagamento) *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={dataFinal}
                      onChange={(e) => setDataFinal(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Taxa de Juros */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Taxa de Juros (% ao mês) *
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={taxaJuros}
                      onChange={(e) => setTaxaJuros(e.target.value)}
                      placeholder="1,00"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Taxa legal: 1% ao mês (Código Civil, art. 406)
                  </p>
                </div>

                {/* Tipo de Juros */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo de Juros *
                  </label>
                  <select
                    value={tipoJuros}
                    onChange={(e) => setTipoJuros(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {tiposJuros.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Botão Calcular */}
                <button
                  onClick={calcularJuros}
                  disabled={!valorPrincipal || !dataInicial || !dataFinal || !taxaJuros}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  Calcular Juros
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
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Valor Principal:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatarMoeda(resultado.valorPrincipal)}
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
                          Taxa de Juros:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {resultado.taxaJuros}% ao mês
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Tipo:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {resultado.tipoJuros === "simples" ? "Juros Simples" : "Juros Compostos"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-emerald-200 dark:border-emerald-700">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Valor dos Juros:
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {formatarMoeda(resultado.valorJuros)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Valor Total */}
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#C19B2B] rounded-xl p-6 text-white">
                    <p className="text-sm opacity-90 mb-2">Valor Total (Principal + Juros)</p>
                    <p className="text-4xl font-bold">
                      {formatarMoeda(resultado.valorTotal)}
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
              placeholder="Ex: Juros de mora - Contrato XYZ"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
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
