"use client"

import { Sidebar } from "@/components/custom/sidebar"
import { Header } from "@/components/custom/header"
import { ProcessoForm } from "@/components/custom/processo-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { use } from "react"

export default function EditarProcessoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <Header />
        
        {/* Form Content */}
        <main className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <Link
              href={`/processos/${id}`}
              className="inline-flex items-center gap-2 text-[#0A2240] hover:text-[#D4AF37] transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar para Detalhes</span>
            </Link>
            <h1 className="text-3xl font-bold text-[#0A2240]">Editar Processo</h1>
            <p className="text-[#333333] mt-1">Atualize as informações do processo</p>
          </div>

          {/* Form */}
          <ProcessoForm isEditing processoId={id} />
        </main>
      </div>
    </div>
  )
}
