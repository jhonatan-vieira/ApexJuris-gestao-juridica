"use client"

import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react"

export function FinanceiroPainel() {
  // Mock data - será substituído por dados reais do Supabase
  const faturamentoMes = 45280
  const totalReceber = 28450
  const totalPagar = 12340

  // Dados dos últimos 6 meses para o gráfico
  const mesesData = [
    { mes: "Set", receitas: 38000, despesas: 11000 },
    { mes: "Out", receitas: 42000, despesas: 10500 },
    { mes: "Nov", receitas: 39500, despesas: 12000 },
    { mes: "Dez", receitas: 48000, despesas: 13500 },
    { mes: "Jan", receitas: 40500, despesas: 11800 },
    { mes: "Fev", receitas: 45280, despesas: 12340 },
  ]

  const maxValue = Math.max(...mesesData.flatMap(m => [m.receitas, m.despesas]))

  return (
    <div className="space-y-6">
      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Faturamento no Mês */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-[#333333]/60 mb-1">Faturamento no Mês</p>
              <p className="text-3xl font-bold text-green-600">
                R$ {faturamentoMes.toLocaleString("pt-BR")}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-600">+12% vs mês anterior</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total a Receber */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-[#333333]/60 mb-1">Total a Receber</p>
              <p className="text-3xl font-bold text-[#D4AF37]">
                R$ {totalReceber.toLocaleString("pt-BR")}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <AlertCircle className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-medium text-[#D4AF37]">12 faturas pendentes</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-[#D4AF37]/10">
              <DollarSign className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
        </div>

        {/* Total a Pagar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-[#333333]/60 mb-1">Total a Pagar</p>
              <p className="text-3xl font-bold text-red-600">
                R$ {totalPagar.toLocaleString("pt-BR")}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="text-xs font-medium text-red-600">+5% vs mês anterior</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[#0A2240]">Performance Financeira</h3>
          <p className="text-sm text-[#333333]/60 mt-1">Receitas vs. Despesas - Últimos 6 meses</p>
        </div>

        {/* Gráfico de Barras */}
        <div className="space-y-6">
          {mesesData.map((data, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#333333] w-12">{data.mes}</span>
                <div className="flex-1 flex gap-2">
                  {/* Barra de Receitas */}
                  <div className="flex-1">
                    <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-[#D4AF37] rounded-lg flex items-center justify-end pr-2 transition-all duration-500"
                        style={{ width: `${(data.receitas / maxValue) * 100}%` }}
                      >
                        <span className="text-xs font-semibold text-white">
                          R$ {(data.receitas / 1000).toFixed(0)}k
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Barra de Despesas */}
                  <div className="flex-1">
                    <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-lg flex items-center justify-end pr-2 transition-all duration-500"
                        style={{ width: `${(data.despesas / maxValue) * 100}%` }}
                      >
                        <span className="text-xs font-semibold text-white">
                          R$ {(data.despesas / 1000).toFixed(0)}k
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legenda */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#D4AF37]"></div>
            <span className="text-sm font-medium text-[#333333]">Receitas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-sm font-medium text-[#333333]">Despesas</span>
          </div>
        </div>
      </div>
    </div>
  )
}
