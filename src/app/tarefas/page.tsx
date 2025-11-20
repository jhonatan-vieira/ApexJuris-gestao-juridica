"use client"

import { Sidebar } from "@/components/custom/sidebar"
import { Header } from "@/components/custom/header"
import { TarefasView } from "@/components/custom/tarefas-view"

export default function TarefasPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <Header />
        
        {/* Tarefas Content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#0A2240] mb-2">Minha Agenda</h1>
            <p className="text-[#333333]/60">Gerencie todas as suas tarefas e prazos</p>
          </div>

          <TarefasView />
        </main>
      </div>
    </div>
  )
}
