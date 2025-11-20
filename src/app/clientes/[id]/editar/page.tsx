"use client"

import { Sidebar } from "@/components/custom/sidebar"
import { Header } from "@/components/custom/header"
import { ClienteForm } from "@/components/custom/cliente-form"

export default function EditarClientePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        
        <main className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#0A2240]">
              Editar Cliente
            </h1>
            <p className="text-sm text-[#333333]/60 mt-1">
              Atualize as informações do cliente
            </p>
          </div>

          {/* Form */}
          <ClienteForm isEditing={true} clienteId={params.id} />
        </main>
      </div>
    </div>
  )
}
