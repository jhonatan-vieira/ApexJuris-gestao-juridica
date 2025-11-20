"use client"

import { useState } from "react"
import { ArrowLeft, DollarSign, FileText, Calendar, User, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NovoLancamentoPage() {
  const router = useRouter()
  const [tipoLancamento, setTipoLancamento] = useState<"receita" | "despesa" | null>(null)
  const [formData, setFormData] = useState({
    descricao: "",
    valor: "",
    dataVencimento: "",
    status: "pendente",
    categoria: "",
    clienteProcesso: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui será implementada a lógica de salvamento no Supabase
    console.log("Salvando lançamento:", { tipo: tipoLancamento, ...formData })
    router.push("/financeiro")
  }

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/financeiro"
            className="inline-flex items-center gap-2 text-[#333333] hover:text-[#0A2240] mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Lançamentos
          </Link>
          <h1 className="text-3xl font-bold text-[#0A2240]">Novo Lançamento</h1>
          <p className="text-[#333333]/60 mt-2">
            Adicione uma nova receita ou despesa ao livro-caixa
          </p>
        </div>

        <div className="max-w-4xl">
          {/* Seleção de Tipo */}
          {!tipoLancamento && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-[#0A2240] mb-6 text-center">
                Selecione o tipo de lançamento
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                  onClick={() => setTipoLancamento("receita")}
                  className="group p-8 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors">
                    <DollarSign className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2240] mb-2">Receita</h3>
                  <p className="text-sm text-[#333333]/60">
                    Honorários, consultorias e outros recebimentos
                  </p>
                </button>

                <button
                  onClick={() => setTipoLancamento("despesa")}
                  className="group p-8 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors">
                    <FileText className="w-8 h-8 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2240] mb-2">Despesa</h3>
                  <p className="text-sm text-[#333333]/60">
                    Custas, impostos, materiais e outros pagamentos
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Formulário */}
          {tipoLancamento && (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0A2240]">
                  {tipoLancamento === "receita" ? "Nova Receita" : "Nova Despesa"}
                </h2>
                <button
                  type="button"
                  onClick={() => setTipoLancamento(null)}
                  className="text-sm text-[#D4AF37] hover:text-[#C19B2F] font-medium"
                >
                  Alterar tipo
                </button>
              </div>

              <div className="space-y-6">
                {/* Descrição */}
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2">
                    Descrição *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    placeholder={tipoLancamento === "receita" ? "Ex: Honorários contratuais" : "Ex: Custas processuais"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  />
                </div>

                {/* Valor */}
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2">
                    Valor *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333333]/60 font-medium">
                      R$
                    </span>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={formData.valor}
                      onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                      placeholder="0,00"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Data de Vencimento */}
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2">
                    Data de {tipoLancamento === "receita" ? "Vencimento" : "Pagamento"} *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#333333]/40" />
                    <input
                      type="date"
                      required
                      value={formData.dataVencimento}
                      onChange={(e) => setFormData({ ...formData, dataVencimento: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2">
                    Status *
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
                  >
                    <option value="pendente">
                      {tipoLancamento === "receita" ? "Pendente" : "A Pagar"}
                    </option>
                    <option value="pago">
                      {tipoLancamento === "receita" ? "Recebido" : "Pago"}
                    </option>
                  </select>
                </div>

                {/* Categoria (apenas para despesas) */}
                {tipoLancamento === "despesa" && (
                  <div>
                    <label className="block text-sm font-semibold text-[#333333] mb-2">
                      Categoria *
                    </label>
                    <select
                      required
                      value={formData.categoria}
                      onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="custas">Custas Processuais</option>
                      <option value="impostos">Impostos</option>
                      <option value="material">Material de Escritório</option>
                      <option value="aluguel">Aluguel</option>
                      <option value="salarios">Salários</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                )}

                {/* Cliente/Processo Vinculado */}
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2">
                    Vincular a Cliente ou Processo
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#333333]/40" />
                    <input
                      type="text"
                      value={formData.clienteProcesso}
                      onChange={(e) => setFormData({ ...formData, clienteProcesso: e.target.value })}
                      placeholder="Digite o nome do cliente ou número do processo..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-[#333333]/60 mt-2">
                    Opcional: vincule este lançamento a um cliente ou processo específico
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.push("/financeiro")}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-[#333333] hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#D4AF37] hover:bg-[#C19B2F] text-white rounded-lg font-semibold transition-colors"
                >
                  Salvar Lançamento
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
