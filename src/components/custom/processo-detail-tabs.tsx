"use client"

import { useState } from "react"
import { Clock, FileText, CheckSquare, DollarSign, Users, Plus, Upload, Download, Calendar, Paperclip, Flag, User } from "lucide-react"

interface ProcessoDetailTabsProps {
  processoId: string
}

export function ProcessoDetailTabs({ processoId }: ProcessoDetailTabsProps) {
  const [activeTab, setActiveTab] = useState("andamentos")

  const tabs = [
    { id: "andamentos", label: "Andamentos", icon: Clock },
    { id: "documentos", label: "Documentos", icon: FileText },
    { id: "tarefas", label: "Tarefas", icon: CheckSquare },
    { id: "financeiro", label: "Financeiro", icon: DollarSign },
    { id: "envolvidos", label: "Envolvidos", icon: Users },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Tabs Header */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-[#D4AF37] text-[#D4AF37]"
                    : "border-transparent text-gray-600 hover:text-[#0A2240]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="p-6">
        {activeTab === "andamentos" && <AndamentosTab />}
        {activeTab === "documentos" && <DocumentosTab />}
        {activeTab === "tarefas" && <TarefasTab processoId={processoId} />}
        {activeTab === "financeiro" && <FinanceiroTab />}
        {activeTab === "envolvidos" && <EnvolvidosTab />}
      </div>
    </div>
  )
}

function AndamentosTab() {
  const andamentos = [
    {
      id: "1",
      data: "2024-02-10",
      descricao: "Petição inicial protocolada",
      anexo: "peticao_inicial.pdf"
    },
    {
      id: "2",
      data: "2024-02-05",
      descricao: "Audiência de conciliação realizada",
      anexo: null
    },
    {
      id: "3",
      data: "2024-01-28",
      descricao: "Contestação apresentada pela parte contrária",
      anexo: "contestacao.pdf"
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#0A2240]">Linha do Tempo</h3>
        <button className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Adicionar Andamento
        </button>
      </div>

      <div className="space-y-4">
        {andamentos.map((andamento, index) => (
          <div key={andamento.id} className="flex gap-4">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#D4AF37] border-4 border-[#D4AF37]/20" />
              {index < andamentos.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200 mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(andamento.data).toLocaleDateString("pt-BR")}
                  </div>
                  {andamento.anexo && (
                    <button className="flex items-center gap-1 text-xs text-[#D4AF37] hover:text-[#C19B2F] font-medium">
                      <Paperclip className="w-3 h-3" />
                      {andamento.anexo}
                    </button>
                  )}
                </div>
                <p className="text-[#333333] font-medium">{andamento.descricao}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DocumentosTab() {
  const documentos = [
    { id: "1", nome: "Petição Inicial.pdf", data: "2024-02-10", tamanho: "2.4 MB" },
    { id: "2", nome: "Contestação.pdf", data: "2024-01-28", tamanho: "1.8 MB" },
    { id: "3", nome: "Procuração.pdf", data: "2024-01-15", tamanho: "856 KB" },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#0A2240]">Documentos do Processo</h3>
        <button className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
          <Upload className="w-4 h-4" />
          Upload de Arquivo
        </button>
      </div>

      {/* Drag and Drop Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 hover:border-[#D4AF37] transition-colors cursor-pointer">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-[#333333] font-medium mb-1">Arraste arquivos aqui ou clique para selecionar</p>
        <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG até 10MB</p>
      </div>

      {/* Documents List */}
      <div className="space-y-2">
        {documentos.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#D4AF37] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-medium text-[#333333]">{doc.nome}</p>
                <p className="text-xs text-gray-500">
                  {new Date(doc.data).toLocaleDateString("pt-BR")} • {doc.tamanho}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-white rounded-lg transition-colors">
              <Download className="w-5 h-5 text-[#0A2240]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function TarefasTab({ processoId }: { processoId: string }) {
  // Mock data - tarefas vinculadas a este processo específico
  const tarefas = [
    { 
      id: "1", 
      titulo: "Elaborar réplica", 
      prazo: "2024-02-20", 
      prioridade: "urgente",
      tipo: "tarefa",
      responsavel: "Dr. Silva",
      status: "todo",
      concluida: false 
    },
    { 
      id: "2", 
      titulo: "Agendar reunião com cliente", 
      prazo: "2024-02-15", 
      prioridade: "alta",
      tipo: "tarefa",
      responsavel: "Dra. Santos",
      status: "doing",
      concluida: false 
    },
    { 
      id: "3", 
      titulo: "Revisar documentação", 
      prazo: "2024-02-12", 
      prioridade: "media",
      tipo: "tarefa",
      responsavel: "Dr. Oliveira",
      status: "done",
      concluida: true 
    },
    { 
      id: "4", 
      titulo: "Protocolar recurso - PRAZO FATAL", 
      prazo: "2024-02-25", 
      prioridade: "urgente",
      tipo: "prazo",
      responsavel: "Dr. Silva",
      status: "todo",
      concluida: false 
    },
  ]

  const prioridadeConfig = {
    urgente: { color: "bg-red-500", label: "Urgente" },
    alta: { color: "bg-orange-500", label: "Alta" },
    media: { color: "bg-yellow-500", label: "Média" },
    baixa: { color: "bg-green-500", label: "Baixa" }
  }

  const statusConfig = {
    todo: { label: "A Fazer", color: "bg-gray-100 text-gray-700" },
    doing: { label: "Em Andamento", color: "bg-blue-100 text-blue-700" },
    done: { label: "Concluído", color: "bg-green-100 text-green-700" }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#0A2240]">Tarefas Associadas</h3>
          <p className="text-sm text-[#333333]/60 mt-1">
            {tarefas.length} {tarefas.length === 1 ? 'tarefa vinculada' : 'tarefas vinculadas'} a este processo
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Nova Tarefa
        </button>
      </div>

      <div className="space-y-3">
        {tarefas.map((tarefa) => (
          <div 
            key={tarefa.id} 
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md cursor-pointer ${
              tarefa.concluida 
                ? "bg-gray-50 border-gray-200 opacity-60" 
                : "bg-white border-gray-200 hover:border-[#D4AF37]"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={tarefa.concluida}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer"
                readOnly
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className={`font-semibold ${tarefa.concluida ? "line-through text-gray-500" : "text-[#333333]"}`}>
                    {tarefa.titulo}
                  </h4>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-white font-semibold ${prioridadeConfig[tarefa.prioridade as keyof typeof prioridadeConfig].color} flex-shrink-0`}>
                    <Flag className="w-3 h-3" />
                    {prioridadeConfig[tarefa.prioridade as keyof typeof prioridadeConfig].label}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-[#333333]/60">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {tarefa.responsavel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Prazo: {new Date(tarefa.prazo).toLocaleDateString("pt-BR")}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full ${statusConfig[tarefa.status as keyof typeof statusConfig].color}`}>
                    {statusConfig[tarefa.status as keyof typeof statusConfig].label}
                  </span>
                  {tarefa.tipo === "prazo" && (
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">
                      PRAZO FATAL
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tarefas.length === 0 && (
        <div className="text-center py-12">
          <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-[#333333]/60 mb-4">Nenhuma tarefa vinculada a este processo</p>
          <button className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C49F2F] text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Criar primeira tarefa
          </button>
        </div>
      )}
    </div>
  )
}

function FinanceiroTab() {
  // Mock data - lançamentos vinculados a este processo específico
  const lancamentos = [
    { id: "1", tipo: "receita", descricao: "Honorários contratuais", valor: 5000, data: "2024-02-01", status: "pago" },
    { id: "2", tipo: "despesa", descricao: "Custas processuais", valor: 350, data: "2024-02-10", status: "pago", categoria: "Custas" },
    { id: "3", tipo: "receita", descricao: "Honorários de êxito", valor: 15000, data: "2024-03-01", status: "pendente" },
  ]

  const totalReceitas = lancamentos.filter(l => l.tipo === "receita").reduce((acc, l) => acc + l.valor, 0)
  const totalDespesas = lancamentos.filter(l => l.tipo === "despesa").reduce((acc, l) => acc + l.valor, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#0A2240]">Movimentação Financeira</h3>
        <button className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Novo Lançamento
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700 mb-1">Total Receitas</p>
          <p className="text-2xl font-bold text-green-800">
            R$ {totalReceitas.toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700 mb-1">Total Despesas</p>
          <p className="text-2xl font-bold text-red-800">
            R$ {totalDespesas.toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700 mb-1">Saldo Líquido</p>
          <p className="text-2xl font-bold text-blue-800">
            R$ {(totalReceitas - totalDespesas).toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2">
        {lancamentos.map((lancamento) => (
          <div key={lancamento.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${lancamento.tipo === "receita" ? "bg-green-100" : "bg-red-100"}`}>
                <DollarSign className={`w-5 h-5 ${lancamento.tipo === "receita" ? "text-green-600" : "text-red-600"}`} />
              </div>
              <div>
                <p className="font-medium text-[#333333]">{lancamento.descricao}</p>
                <p className="text-xs text-gray-500">
                  {new Date(lancamento.data).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${lancamento.tipo === "receita" ? "text-green-600" : "text-red-600"}`}>
                {lancamento.tipo === "receita" ? "+" : "-"} R$ {lancamento.valor.toLocaleString("pt-BR")}
              </p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${lancamento.status === "pago" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                {lancamento.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EnvolvidosTab() {
  const envolvidos = [
    { id: "1", nome: "João Silva", tipo: "Cliente", contato: "joao@email.com", telefone: "(11) 98765-4321" },
    { id: "2", nome: "Dr. Silva", tipo: "Advogado", contato: "silva@escritorio.com", telefone: "(11) 91234-5678" },
    { id: "3", nome: "Empresa XYZ Ltda", tipo: "Parte Contrária", contato: "contato@xyz.com", telefone: "(11) 3456-7890" },
    { id: "4", nome: "Dr. Santos", tipo: "Advogado Contrário", contato: "santos@adv.com", telefone: "(11) 92345-6789" },
  ]

  const tipoColors = {
    "Cliente": "bg-blue-100 text-blue-800",
    "Advogado": "bg-green-100 text-green-800",
    "Parte Contrária": "bg-red-100 text-red-800",
    "Advogado Contrário": "bg-orange-100 text-orange-800"
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#0A2240]">Partes e Envolvidos</h3>
        <button className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Adicionar Envolvido
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {envolvidos.map((envolvido) => (
          <div key={envolvido.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0A2240] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {envolvido.nome.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#333333]">{envolvido.nome}</h4>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${tipoColors[envolvido.tipo as keyof typeof tipoColors]}`}>
                    {envolvido.tipo}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>📧 {envolvido.contato}</p>
              <p>📱 {envolvido.telefone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
