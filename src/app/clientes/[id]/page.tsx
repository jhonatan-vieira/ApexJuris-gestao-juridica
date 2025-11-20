"use client"

import { Sidebar } from "@/components/custom/sidebar"
import { Header } from "@/components/custom/header"
import { ClienteDetailHeader } from "@/components/custom/cliente-detail-header"
import { ClienteDetailTabs } from "@/components/custom/cliente-detail-tabs"

export default function ClienteDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        
        <main className="p-6">
          <ClienteDetailHeader clienteId={params.id} />
          <ClienteDetailTabs clienteId={params.id} />
        </main>
      </div>
    </div>
  )
}
