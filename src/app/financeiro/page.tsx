"use client"

import { Sidebar } from "@/components/custom/sidebar"
import { Header } from "@/components/custom/header"
import { FinanceiroPainel } from "@/components/custom/financeiro-painel"
import { FinanceiroLancamentos } from "@/components/custom/financeiro-lancamentos"

export default function FinanceiroPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        
        <main className="p-6 space-y-6">
          {/* Painel Financeiro com Métricas e Gráfico */}
          <FinanceiroPainel />
          
          {/* Tabela de Lançamentos */}
          <FinanceiroLancamentos />
        </main>
      </div>
    </div>
  )
}
