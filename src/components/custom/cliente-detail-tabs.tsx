"use client"

import { useState } from "react"
import { FileText, DollarSign, MessageSquare, Info, Plus, Calendar, User, ExternalLink, Download } from "lucide-react"
import Link from "next/link"
import { FaturaGenerator } from "./fatura-generator"

interface ClienteDetailTabsProps {
  clienteId: string
}

export function ClienteDetailTabs({ clienteId }: ClienteDetailTabsProps) {
  const [activeTab, setActiveTab] = useState("visao-geral")
  const [showFaturaGenerator, setShowFaturaGenerator] = useState(false)

  // Mock data - será substituído por dados reais do Supabase
  const cliente = {
    tipo: "fisica",
    nomeCompleto: "João Silva",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    dataNascimento: "15/03/1985",
    profissao: "Engenheiro",
    estadoCivil: "Casado",
    telefones: [
      { numero: "(11) 98765-4321", tipo: "Celular" },
      { numero: "(11) 3456-7890", tipo: "Fixo" }
    ],
    emails: [
      { email: "joao.silva@email.com", tipo: "Principal" },
      { email: "joao.trabalho@empresa.com", tipo: "Comercial" }
    ],
    endereco: {
      cep: "01234-567",
      logradouro: "Rua das Flores",
      numero: "123",
      complemento: "Apto 45",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP"
    },
    observacoes: "Cliente VIP. Preferência por atendimento presencial."
  }

  const processos = [
    {
      id: "1",
      numero: "0001234-56.2024.5.01.0001",
      tipo: "Trabalhista",
      status: "ativo",
      dataAbertura: "15/01/2024",
      valorCausa: "R$ 50.000,00"
    },
    {
      id: "2",
      numero: "0007890-12.2024.8.02.0001",
      tipo: "Civil",
      status: "ativo",
      dataAbertura: "20/02/2024",
      valorCausa: "R$ 30.000,00"
    },
    {
      id: "3",
      numero: "0003456-78.2024.8.02.0001",
      tipo: "Consumidor",
      status: "arquivado",
      dataAbertura: "10/12/2023",
      valorCausa: "R$ 15.000,00"
    }
  ]

  const anotacoes = [
    {
      id: "1",
      data: "15/03/2024",
      hora: "14:30",
      tipo: "Reunião",
      titulo: "Reunião inicial sobre processo trabalhista",
      conteudo: "Cliente relatou problemas com rescisão contratual. Solicitou análise de documentos.",
      autor: "Dr. Silva"
    },
    {
      id: "2",
      data: "10/03/2024",
      hora: "10:00",
      tipo: "Ligação",
      titulo: "Ligação de acompanhamento",
      conteudo: "Cliente perguntou sobre andamento do processo. Informado sobre próxima audiência.",
      autor: "Dra. Santos"
    },
    {
      id: "3",
      data: "05/03/2024",
      hora: "16:45",
      tipo: "E-mail",
      titulo: "Envio de documentação",
      conteudo: "Cliente enviou documentos complementares solicitados.",
      autor: "Dr. Silva"
    }
  ]

  // Mock data financeiro
  const lancamentosCliente = [
    {
      id: "1",
      tipo: "receita",
      descricao: "Honorários contratuais - Proc. 0001234-56.2024.8.02.0001",
      valor: 5000,
      data: "2024-02-15",
      status: "pago",
      processo: "0001234-56.2024.5.01.0001"
    },
    {
      id: "2",
      tipo: "receita",
      descricao: "Honorários de êxito - Proc. 0007890-12.2024.8.02.0001",
      valor: 15000,
      data: "2024-03-01",
      status: "pendente",
      processo: "0007890-12.2024.8.02.0001"
    },
    {
      id: "3",
      tipo: "receita",
      descricao: "Consultoria jurídica - Fevereiro 2024",
      valor: 3000,
      data: "2024-02-28",
      status: "pendente",
      processo: null
    },
    {
      id: "4",
      tipo: "despesa",
      descricao: "Custas processuais - Proc. 0001234-56.2024.8.02.0001",
      valor: 350,
      data: "2024-02-10",
      status: "pago",
      processo: "0001234-56.2024.5.01.0001"
    },
  ]

  const totalFaturado = lancamentosCliente
    .filter(l => l.tipo === "receita")
    .reduce((acc, l) => acc + l.valor, 0)

  const totalPago = lancamentosCliente
    .filter(l => l.tipo === "receita" && l.status === "pago")
    .reduce((acc, l) => acc + l.valor, 0)

  const totalPendente = lancamentosCliente
    .filter(l => l.tipo === "receita" && l.status === "pendente")
    .reduce((acc, l) => acc + l.valor, 0)

  const totalDespesas = lancamentosCliente
    .filter(l => l.tipo === "despesa")
    .reduce((acc, l) => acc + l.valor, 0)

  const tabs = [
    { id: "visao-geral", label: "Visão Geral", icon: Info },
    { id: "processos", label: "Processos", icon: FileText },
    { id: "financeiro", label: "Financeiro", icon: DollarSign },
    { id: "anotacoes", label: "Anotações", icon: MessageSquare },
  ]

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-x-auto">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                    : "text-[#333333]/60 hover:text-[#333333]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* Visão Geral Tab */}
        {activeTab === "visao-geral" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#0A2240] mb-4">Informações Cadastrais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cliente.tipo === "fisica" ? (
                  <>
                    <div>
                      <label className="text-sm font-medium text-[#333333]/60">Nome Completo</label>
                      <p className="text-[#0A2240] font-medium mt-1">{cliente.nomeCompleto}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#333333]/60">CPF</label>
                      <p className="text-[#0A2240] font-medium mt-1 font-mono">{cliente.cpf}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#333333]/60">RG</label>
                      <p className="text-[#0A2240] font-medium mt-1">{cliente.rg}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#333333]/60">Data de Nascimento</label>
                      <p className="text-[#0A2240] font-medium mt-1">{cliente.dataNascimento}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#333333]/60">Profissão</label>
                      <p className="text-[#0A2240] font-medium mt-1">{cliente.profissao}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#333333]/60">Estado Civil</label>
                      <p className="text-[#0A2240] font-medium mt-1">{cliente.estadoCivil}</p>
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-[#0A2240] mb-4">Contatos</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#333333]/60 mb-2 block">Telefones</label>
                  <div className="space-y-2">
                    {cliente.telefones.map((telefone, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-[#0A2240] font-medium">{telefone.numero}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-[#333333]">
                          {telefone.tipo}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#333333]/60 mb-2 block">E-mails</label>
                  <div className="space-y-2">
                    {cliente.emails.map((email, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-[#0A2240] font-medium">{email.email}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-[#333333]">
                          {email.tipo}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-[#0A2240] mb-4">Endereço</h3>
              <div className="text-[#0A2240]">
                <p className="font-medium">
                  {cliente.endereco.logradouro}, {cliente.endereco.numero}
                  {cliente.endereco.complemento && ` - ${cliente.endereco.complemento}`}
                </p>
                <p className="text-[#333333]/60 mt-1">
                  {cliente.endereco.bairro} - {cliente.endereco.cidade}/{cliente.endereco.estado}
                </p>
                <p className="text-[#333333]/60 font-mono">CEP: {cliente.endereco.cep}</p>
              </div>
            </div>

            {cliente.observacoes && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-[#0A2240] mb-4">Observações</h3>
                <p className="text-[#333333]">{cliente.observacoes}</p>
              </div>
            )}
          </div>
        )}

        {/* Processos Tab */}
        {activeTab === "processos" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0A2240]">
                Processos Associados ({processos.length})
              </h3>
              <Link
                href="/processos/novo"
                className="inline-flex items-center gap-2 text-sm text-[#D4AF37] hover:text-[#C19B2F] font-medium"
              >
                <Plus className="w-4 h-4" />
                Novo Processo
              </Link>
            </div>

            <div className="space-y-4">
              {processos.map((processo) => (
                <Link
                  key={processo.id}
                  href={`/processos/${processo.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-mono text-sm font-semibold text-[#0A2240] group-hover:text-[#D4AF37] transition-colors">
                          {processo.numero}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                            processo.status === "ativo"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {processo.status === "ativo" ? "Ativo" : "Arquivado"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-[#333333]/60">
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {processo.tipo}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Aberto em {processo.dataAbertura}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {processo.valorCausa}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-[#333333]/40 group-hover:text-[#D4AF37] transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>

            {processos.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-[#333333]/20 mx-auto mb-4" />
                <p className="text-[#333333]/60 font-medium">Nenhum processo associado</p>
                <p className="text-sm text-[#333333]/40 mt-1">
                  Adicione processos para este cliente
                </p>
              </div>
            )}
          </div>
        )}

        {/* Financeiro Tab */}
        {activeTab === "financeiro" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0A2240]">Balanço Financeiro</h3>
              <button
                onClick={() => setShowFaturaGenerator(true)}
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Gerar Fatura
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700 font-medium mb-1">Total Faturado</p>
                <p className="text-2xl font-bold text-blue-800">
                  R$ {totalFaturado.toLocaleString("pt-BR")}
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700 font-medium mb-1">Total Pago</p>
                <p className="text-2xl font-bold text-green-800">
                  R$ {totalPago.toLocaleString("pt-BR")}
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-700 font-medium mb-1">Total Pendente</p>
                <p className="text-2xl font-bold text-yellow-800">
                  R$ {totalPendente.toLocaleString("pt-BR")}
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700 font-medium mb-1">Despesas</p>
                <p className="text-2xl font-bold text-red-800">
                  R$ {totalDespesas.toLocaleString("pt-BR")}
                </p>
              </div>
            </div>

            {/* Transactions List */}
            <div className="space-y-3">
              <h4 className="font-semibold text-[#0A2240] mb-3">Histórico de Lançamentos</h4>
              {lancamentosCliente.map((lancamento) => (
                <div
                  key={lancamento.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      lancamento.tipo === "receita" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      <DollarSign className={`w-5 h-5 ${
                        lancamento.tipo === "receita" ? "text-green-600" : "text-red-600"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#333333] truncate">{lancamento.descricao}</p>
                      <p className="text-xs text-[#333333]/60">
                        {new Date(lancamento.data).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className={`font-bold ${
                      lancamento.tipo === "receita" ? "text-green-600" : "text-red-600"
                    }`}>
                      {lancamento.tipo === "receita" ? "+" : "-"} R$ {lancamento.valor.toLocaleString("pt-BR")}
                    </p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      lancamento.status === "pago"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {lancamento.status === "pago" ? "Pago" : "Pendente"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {lancamentosCliente.length === 0 && (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 text-[#333333]/20 mx-auto mb-4" />
                <p className="text-[#333333]/60 font-medium">Nenhum lançamento financeiro</p>
                <p className="text-sm text-[#333333]/40 mt-1">
                  Adicione receitas e despesas vinculadas a este cliente
                </p>
              </div>
            )}
          </div>
        )}

        {/* Anotações Tab */}
        {activeTab === "anotacoes" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0A2240]">
                Histórico de Interações
              </h3>
              <button className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                <Plus className="w-4 h-4" />
                Nova Anotação
              </button>
            </div>

            <div className="space-y-4">
              {anotacoes.map((anotacao) => (
                <div key={anotacao.id} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0">
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-white"></div>
                  
                  <div className="bg-[#F5F5F5] rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="font-semibold text-[#0A2240]">{anotacao.titulo}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-[#333333]/60">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {anotacao.data} às {anotacao.hora}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {anotacao.autor}
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#0A2240]/10 text-[#0A2240]">
                        {anotacao.tipo}
                      </span>
                    </div>
                    <p className="text-sm text-[#333333] mt-2">{anotacao.conteudo}</p>
                  </div>
                </div>
              ))}
            </div>

            {anotacoes.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-[#333333]/20 mx-auto mb-4" />
                <p className="text-[#333333]/60 font-medium">Nenhuma anotação registrada</p>
                <p className="text-sm text-[#333333]/40 mt-1">
                  Adicione anotações sobre interações com o cliente
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fatura Generator Modal */}
      {showFaturaGenerator && (
        <FaturaGenerator
          clienteId={clienteId}
          clienteNome={cliente.nomeCompleto}
          onClose={() => setShowFaturaGenerator(false)}
        />
      )}
    </div>
  )
}
