"use client"

import { Sidebar } from "@/components/custom/sidebar"
import { Header } from "@/components/custom/header"
import { ProcessoDetailHeader } from "@/components/custom/processo-detail-header"
import { ProcessoDetailTabs } from "@/components/custom/processo-detail-tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { use } from "react"

export default function ProcessoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  // Mock data - será substituído por dados reais do banco
  const processo = {
    id,
    numero: "0001234-56.2024.5.01.0001",
    cliente: "João Silva",
    parteContraria: "Empresa XYZ Ltda",
    status: "ativo",
    advogado: "Dr. Silva",
    vara: "1ª Vara do Trabalho",
    comarca: "São Paulo",
    tipoAcao: "Trabalhista",
    valorCausa: "R$ 50.000,00"
  }

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <Header />
        
        {/* Detail Content */}
        <main className="p-6">
          {/* Back Button */}
          <Link
            href="/processos"
            className="inline-flex items-center gap-2 text-[#0A2240] hover:text-[#D4AF37] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar para Processos</span>
          </Link>

          {/* Fixed Header */}
          <ProcessoDetailHeader processo={processo} />

          {/* Tabs Content */}
          <ProcessoDetailTabs processoId={id} />
        </main>
      </div>
    </div>
  )
}
