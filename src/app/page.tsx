'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { 
  Scale, 
  Users, 
  Briefcase, 
  CheckSquare, 
  DollarSign,
  TrendingUp,
  AlertCircle,
  Calendar,
  FileText,
  LogOut
} from 'lucide-react'

export default function HomePage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#F4E5C3] rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Apex Juris</h1>
                <p className="text-xs text-slate-400">Gestão Jurídica Inteligente</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-white font-medium">
                  {user.user_metadata?.nome || user.email}
                </p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Bem-vindo ao Apex Juris! 👋
          </h2>
          <p className="text-slate-400">
            Seu sistema de gestão jurídica está pronto para uso. Comece explorando as funcionalidades abaixo.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">0</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Processos Ativos</h3>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-2xl font-bold text-white">0</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Clientes</h3>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-2xl font-bold text-white">0</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Tarefas Pendentes</h3>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <span className="text-2xl font-bold text-white">R$ 0</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Faturamento</h3>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
              Ações Rápidas
            </h3>
            <div className="space-y-3">
              <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors border border-white/10">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Novo Cliente</p>
                    <p className="text-slate-400 text-sm">Cadastrar novo cliente</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors border border-white/10">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Novo Processo</p>
                    <p className="text-slate-400 text-sm">Cadastrar novo processo</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors border border-white/10">
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">Nova Tarefa</p>
                    <p className="text-slate-400 text-sm">Criar nova tarefa</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              Próximos Prazos
            </h3>
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">Nenhum prazo cadastrado</p>
              <p className="text-slate-500 text-sm mt-1">
                Cadastre tarefas para acompanhar seus prazos
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#F4E5C3]/20 backdrop-blur-lg rounded-2xl p-6 border border-[#D4AF37]/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Sistema Configurado com Sucesso! 🎉
              </h3>
              <p className="text-slate-300 mb-4">
                O Apex Juris está conectado ao Supabase e pronto para uso. Todos os seus dados serão salvos de forma segura e sincronizados em tempo real.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium border border-green-500/30">
                  ✓ Autenticação Ativa
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium border border-green-500/30">
                  ✓ Banco de Dados Conectado
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium border border-green-500/30">
                  ✓ Storage Configurado
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
