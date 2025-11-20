"use client"

import { FolderOpen, Calendar, FileText, Users, Clock, AlertCircle, CheckCircle, Flag, User } from "lucide-react"
import Link from "next/link"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  trend?: string
  trendUp?: boolean
  color: string
}

function StatCard({ title, value, icon: Icon, trend, trendUp, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[#333333]/60 mb-1">{title}</p>
          <p className="text-3xl font-bold text-[#0A2240] mb-2">{value}</p>
          {trend && (
            <p className={`text-xs font-medium ${trendUp ? "text-green-600" : "text-red-600"}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}

interface TaskItemProps {
  title: string
  process: string
  deadline: string
  priority: "urgente" | "alta" | "media" | "baixa"
  responsavel: string
}

function TaskItem({ title, process, deadline, priority, responsavel }: TaskItemProps) {
  const priorityColors = {
    urgente: "bg-red-500",
    alta: "bg-orange-500",
    media: "bg-yellow-500",
    baixa: "bg-green-500",
  }

  const priorityLabels = {
    urgente: "Urgente",
    alta: "Alta",
    media: "Média",
    baixa: "Baixa",
  }

  return (
    <div className="flex items-start gap-4 p-4 hover:bg-[#F5F5F5] rounded-lg transition-colors cursor-pointer">
      <div className="flex-shrink-0 mt-1">
        <div className="w-5 h-5 rounded border-2 border-gray-300 hover:border-[#D4AF37] transition-colors"></div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-[#0A2240] text-sm mb-1">{title}</h4>
        <p className="text-xs text-[#333333]/60 mb-2">{process}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-[#333333]/60">
            <User className="w-3 h-3" />
            {responsavel}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#333333]/60">
            <Clock className="w-3 h-3" />
            {deadline}
          </span>
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full text-white ${priorityColors[priority]}`}>
            <Flag className="w-3 h-3" />
            {priorityLabels[priority]}
          </span>
        </div>
      </div>
    </div>
  )
}

interface DeadlineItemProps {
  title: string
  date: string
  status: "urgent" | "warning" | "ok"
  processo: string
}

function DeadlineItem({ title, date, status, processo }: DeadlineItemProps) {
  const statusConfig = {
    urgent: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", barColor: "bg-red-500" },
    warning: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50", barColor: "bg-yellow-500" },
    ok: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", barColor: "bg-green-500" },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="p-3 hover:bg-[#F5F5F5] rounded-lg transition-colors cursor-pointer">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${config.bg}`}>
          <Icon className={`w-4 h-4 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-[#0A2240] text-sm truncate">{title}</h4>
          <p className="text-xs text-[#333333]/60">{date}</p>
        </div>
      </div>
      <p className="text-xs text-[#333333]/60 mb-2 ml-12">{processo}</p>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 ml-12">
        <div 
          className={`h-1.5 rounded-full ${config.barColor}`}
          style={{ 
            width: status === "urgent" ? "90%" : status === "warning" ? "60%" : "30%" 
          }}
        />
      </div>
    </div>
  )
}

export function DashboardCards() {
  // Mock data - será substituído por dados reais do Supabase
  const processosAtivos = 47
  const tarefasPendentes = 28
  const tarefasUrgentes = 5
  const prazosProximos = 12
  const clientesAtivos = 34 // Conectado ao Módulo de Clientes

  // Dados financeiros - conectados ao Módulo Financeiro
  const faturamentoMes = 45280
  const totalReceber = 28450
  const totalDespesas = 12340

  const tarefasPrioritarias = [
    {
      title: "Elaborar contestação",
      process: "Processo 0001234-56.2024.8.02.0001",
      deadline: "Vence em 2 dias",
      priority: "urgente" as const,
      responsavel: "Dr. Silva"
    },
    {
      title: "Reunião com cliente",
      process: "João Silva - Ação Trabalhista",
      deadline: "Hoje às 15h",
      priority: "urgente" as const,
      responsavel: "Dra. Santos"
    },
    {
      title: "Revisar petição inicial",
      process: "Processo 0007890-12.2024.8.02.0001",
      deadline: "Vence em 5 dias",
      priority: "alta" as const,
      responsavel: "Dr. Oliveira"
    },
    {
      title: "Protocolar recurso",
      process: "Processo 0003456-78.2024.8.02.0001",
      deadline: "Vence em 7 dias",
      priority: "media" as const,
      responsavel: "Dr. Silva"
    },
  ]

  const prazos = [
    {
      title: "Contestação - Ação Civil",
      date: "Vence amanhã",
      status: "urgent" as const,
      processo: "Proc. 0001234-56.2024.8.02.0001"
    },
    {
      title: "Recurso - Processo Trabalhista",
      date: "Vence em 3 dias",
      status: "warning" as const,
      processo: "Proc. 0007890-12.2024.5.01.0001"
    },
    {
      title: "Petição Inicial - Ação de Cobrança",
      date: "Vence em 5 dias",
      status: "warning" as const,
      processo: "Proc. 0002468-13.2024.8.02.0001"
    },
    {
      title: "Manifestação - Processo Cível",
      date: "Vence em 10 dias",
      status: "ok" as const,
      processo: "Proc. 0009876-54.2024.8.02.0001"
    },
    {
      title: "Alegações Finais",
      date: "Vence em 15 dias",
      status: "ok" as const,
      processo: "Proc. 0003456-78.2024.8.02.0001"
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Processos Ativos"
          value={processosAtivos}
          icon={FolderOpen}
          trend="+3 este mês"
          trendUp={true}
          color="bg-[#0A2240]"
        />
        <StatCard
          title="Prazos Próximos"
          value={prazosProximos}
          icon={Calendar}
          trend={`${tarefasUrgentes} urgentes`}
          trendUp={false}
          color="bg-[#D4AF37]"
        />
        <StatCard
          title="Tarefas Pendentes"
          value={tarefasPendentes}
          icon={FileText}
          trend="-4 esta semana"
          trendUp={true}
          color="bg-[#333333]"
        />
        <Link href="/clientes">
          <StatCard
            title="Clientes Ativos"
            value={clientesAtivos}
            icon={Users}
            trend="+2 este mês"
            trendUp={true}
            color="bg-[#0A2240]"
          />
        </Link>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#0A2240]">Tarefas Prioritárias</h3>
              <p className="text-xs text-[#333333]/60 mt-1">
                Tarefas com prioridade Alta ou Urgente
              </p>
            </div>
            <Link
              href="/tarefas"
              className="text-sm text-[#D4AF37] hover:text-[#C49F2F] font-medium transition-colors"
            >
              Ver todas
            </Link>
          </div>
          <div className="space-y-2">
            {tarefasPrioritarias.map((tarefa, index) => (
              <TaskItem key={index} {...tarefa} />
            ))}
          </div>
        </div>

        {/* Deadlines Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#0A2240]">Prazos Próximos</h3>
              <p className="text-xs text-[#333333]/60 mt-1">
                {prazosProximos} prazos nos próximos 15 dias
              </p>
            </div>
            <Link
              href="/tarefas"
              className="text-sm text-[#D4AF37] hover:text-[#C49F2F] font-medium transition-colors"
            >
              Ver agenda
            </Link>
          </div>
          <div className="space-y-2">
            {prazos.map((prazo, index) => (
              <DeadlineItem key={index} {...prazo} />
            ))}
          </div>
        </div>
      </div>

      {/* Financial Summary - Conectado ao Módulo Financeiro */}
      <Link href="/financeiro">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#0A2240]">Resumo Financeiro</h3>
            <span className="text-sm text-[#D4AF37] group-hover:text-[#C19B2F] font-medium transition-colors">
              Ver detalhes →
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-[#333333]/60 mb-1">Faturamento (mês)</p>
              <p className="text-2xl font-bold text-green-600">R$ {faturamentoMes.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-green-600 mt-1">+12% vs mês anterior</p>
            </div>
            <div>
              <p className="text-sm text-[#333333]/60 mb-1">A Receber</p>
              <p className="text-2xl font-bold text-[#D4AF37]">R$ {totalReceber.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-[#333333]/60 mt-1">12 faturas pendentes</p>
            </div>
            <div>
              <p className="text-sm text-[#333333]/60 mb-1">Despesas (mês)</p>
              <p className="text-2xl font-bold text-red-600">R$ {totalDespesas.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-red-600 mt-1">+5% vs mês anterior</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
