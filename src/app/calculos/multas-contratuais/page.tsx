"use client"

import { useState } from "react"
import { Calculator, ArrowLeft, Save, FileText, Link as LinkIcon, Calendar, Percent, DollarSign } from "lucide-react"
import Link from "next/link"

interface ResultadoCalculo {
  valorContrato: number
  percentualMulta: number
  dataVencimento: string
  dataPagamento: string
  valorMulta: number
  valorTotal: number
  diasAtraso: number
  nomeCalculo?: string
}

export default function MultasContratuaisPage() {
  const [valorContrato, setValorContrato] = useState("")
  const [percentualMulta, setPercentualMulta] = useState("2")
  const [dataVencimento, setDataVencimento] = useState("")
  const [dataPagamento, setDataPagamento] = useState("")
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null)
  const [showSalvarModal, setShowSalvarModal] = useState(false)
  const [showAnexarModal, setShowAnexarModal] = useState(false)
  const [nomeCalculo, setNomeCalculo] = useState("")

  const calcularMulta = () => {
    const valor = parseFloat(valorContrato.replace(/\./g, "").replace(",", "."))
    const percentual = parseFloat(percentualMulta) / 100

    // Calcular dias de atraso
    const vencimento = new Date(dataVencimento)
    const pagamento = new Date(dataPagamento)
    const diasAtraso = Math.floor((pagamento.getTime() - vencimento.getTime()) / (1000 * 60 * 60 * 24))

    const valorMulta = valor * percentual
    const valorTotal = valor + valorMulta

    setResultado({
      valorContrato: valor,
      percentualMulta: parseFloat(percentualMulta),
      dataVencimento,
      dataPagamento,
      valorMulta,
      valorTotal,
      diasAtraso,
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
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Multas Contratuais
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Calcule multas por inadimplência contratual
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
                {/* Valor do Contrato */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Valor do Contrato *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      R$
                    </span>
                    <input
                      type="text"
                      value={valorContrato}
                      onChange={(e) => setValorContrato(e.target.value)}
                      placeholder="0,00"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Percentual da Multa */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Percentual da Multa (%) *
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={percentualMulta}
                      onChange={(e) => setPercentualMulta(e.target.value)}
                      placeholder="2,00"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Limite legal: 2% (Código Civil, art. 412)
                  </p>
                </div>

                {/* Data de Vencimento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data de Vencimento *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={dataVencimento}
                      onChange={(e) => setDataVencimento(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Data de Pagamento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data de Pagamento/Referência *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={dataPagamento}
                      onChange={(e) => setDataPagamento(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Informação sobre tipos de multa */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2 text-sm">
                    📋 Tipos de Multa
                  </h4>
                  <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1">
                    <li>• <strong>Compensatória:</strong> Prefixação de perdas e danos</li>
                    <li>• <strong>Moratória:</strong> Atraso no cumprimento (máx. 2%)</li>
                    <li>• <strong>Penitencial:</strong> Descumprimento total da obrigação</li>
                  </ul>
                </div>

                {/* Botão Calcular */}
                <button
                  onClick={calcularMulta}
                  disabled={!valorContrato || !percentualMulta || !dataVencimento || !dataPagamento}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  Calcular Multa
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
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Valor do Contrato:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatarMoeda(resultado.valorContrato)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Percentual da Multa:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {resultado.percentualMulta}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Data de Vencimento:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatarData(resultado.dataVencimento)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Data de Pagamento:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatarData(resultado.dataPagamento)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Dias de Atraso:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {resultado.diasAtraso} dias
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-amber-200 dark:border-amber-700">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Valor da Multa:
                        </span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          {formatarMoeda(resultado.valorMulta)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Valor Total */}
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#C19B2B] rounded-xl p-6 text-white">
                    <p className="text-sm opacity-90 mb-2">Valor Total (Contrato + Multa)</p>
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
              placeholder="Ex: Multa contratual - Contrato de Locação"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
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
