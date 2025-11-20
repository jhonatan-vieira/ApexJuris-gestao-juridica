"use client"

import { Calculator, TrendingUp, FileText, Plus } from "lucide-react"
import Link from "next/link"

const calculadoras = [
  {
    id: "correcao-monetaria",
    titulo: "Correção Monetária",
    descricao: "Atualize valores monetários com base em índices oficiais como INPC, IPCA e IGP-M",
    icon: TrendingUp,
    href: "/calculos/correcao-monetaria",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "juros-moratorios",
    titulo: "Juros Moratórios",
    descricao: "Calcule juros de mora sobre valores devidos com taxas personalizáveis",
    icon: Calculator,
    href: "/calculos/juros-moratorios",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    id: "multas-contratuais",
    titulo: "Multas Contratuais",
    descricao: "Determine valores de multas contratuais e penalidades por inadimplência",
    icon: FileText,
    href: "/calculos/multas-contratuais",
    color: "from-amber-500 to-amber-600"
  }
]

export default function CalculosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#C19B2B] rounded-xl flex items-center justify-center shadow-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Cálculos Jurídicos
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Ferramentas profissionais para cálculos processuais
                </p>
              </div>
            </div>
          </div>

          {/* Cards de Calculadoras */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculadoras.map((calc) => {
              const Icon = calc.icon
              return (
                <Link
                  key={calc.id}
                  href={calc.href}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-105"
                >
                  {/* Header do Card com Gradiente */}
                  <div className={`bg-gradient-to-br ${calc.color} p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {calc.titulo}
                    </h3>
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                      {calc.descricao}
                    </p>
                    <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>Iniciar Cálculo</span>
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Seção de Cálculos Salvos */}
          <div className="mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Cálculos Salvos
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Acesse seus cálculos anteriores
                  </p>
                </div>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                  Ver Todos
                </button>
              </div>

              {/* Lista de Cálculos Salvos (Placeholder) */}
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  Nenhum cálculo salvo ainda
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Seus cálculos salvos aparecerão aqui
                </p>
              </div>
            </div>
          </div>

          {/* Dicas Rápidas */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 text-sm">
                💡 Dica Rápida
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                Todos os cálculos podem ser salvos e anexados diretamente aos processos
              </p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
              <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-2 text-sm">
                📄 Relatórios PDF
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                Gere relatórios profissionais em PDF para anexar aos autos
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2 text-sm">
                🔗 Integração Total
              </h4>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Vincule cálculos aos processos para manter tudo organizado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
