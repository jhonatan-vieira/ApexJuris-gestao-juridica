"use client"

import { useState } from "react"
import { X, Calendar, User, Flag, FileText, Clock, Plus, Trash2 } from "lucide-react"

interface TarefaModalProps {
  isOpen: boolean
  onClose: () => void
  tarefa?: any
}

export function TarefaModal({ isOpen, onClose, tarefa }: TarefaModalProps) {
  const [formData, setFormData] = useState({
    titulo: tarefa?.titulo || "",
    tipo: tarefa?.tipo || "tarefa",
    responsavel: tarefa?.responsavel || "",
    dataVencimento: tarefa?.dataVencimento || "",
    hora: tarefa?.hora || "",
    prioridade: tarefa?.prioridade || "media",
    processo: tarefa?.processo || "",
    descricao: tarefa?.descricao || "",
    subtarefas: tarefa?.subtarefas || []
  })

  const [novaSubtarefa, setNovaSubtarefa] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui será implementada a lógica de salvar no banco
    console.log("Salvando tarefa:", formData)
    onClose()
  }

  const adicionarSubtarefa = () => {
    if (novaSubtarefa.trim()) {
      setFormData({
        ...formData,
        subtarefas: [...formData.subtarefas, { id: Date.now().toString(), texto: novaSubtarefa, concluida: false }]
      })
      setNovaSubtarefa("")
    }
  }

  const removerSubtarefa = (id: string) => {
    setFormData({
      ...formData,
      subtarefas: formData.subtarefas.filter((st: any) => st.id !== id)
    })
  }

  const toggleSubtarefa = (id: string) => {
    setFormData({
      ...formData,
      subtarefas: formData.subtarefas.map((st: any) =>
        st.id === id ? { ...st, concluida: !st.concluida } : st
      )
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#0A2240]">
            {tarefa ? "Editar Tarefa" : "Nova Tarefa / Prazo"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#333333]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Título *
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ex: Elaborar Apelação"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              required
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Tipo *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipo: "tarefa" })}
                className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg transition-all ${
                  formData.tipo === "tarefa"
                    ? "border-[#D4AF37] bg-[#D4AF37]/10"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Tarefa</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipo: "prazo" })}
                className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg transition-all ${
                  formData.tipo === "prazo"
                    ? "border-[#D4AF37] bg-[#D4AF37]/10"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Clock className="w-5 h-5" />
                <span className="font-medium">Prazo Fatal</span>
              </button>
            </div>
          </div>

          {/* Responsável e Prioridade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Responsável *
              </label>
              <select
                value={formData.responsavel}
                onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                required
              >
                <option value="">Selecione...</option>
                <option value="Dr. Silva">Dr. Silva</option>
                <option value="Dra. Santos">Dra. Santos</option>
                <option value="Dr. Oliveira">Dr. Oliveira</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">
                <Flag className="w-4 h-4 inline mr-1" />
                Prioridade *
              </label>
              <select
                value={formData.prioridade}
                onChange={(e) => setFormData({ ...formData, prioridade: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                required
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>
          </div>

          {/* Data e Hora */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Data de Vencimento *
              </label>
              <input
                type="date"
                value={formData.dataVencimento}
                onChange={(e) => setFormData({ ...formData, dataVencimento: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Hora (opcional)
              </label>
              <input
                type="time"
                value={formData.hora}
                onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              />
            </div>
          </div>

          {/* Vincular ao Processo */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Vincular ao Processo
            </label>
            <input
              type="text"
              value={formData.processo}
              onChange={(e) => setFormData({ ...formData, processo: e.target.value })}
              placeholder="Digite o número ou nome do processo..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
            <p className="text-xs text-[#333333]/60 mt-1">
              Comece a digitar para buscar processos existentes
            </p>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Adicione detalhes ou instruções..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none"
            />
          </div>

          {/* Checklist de Subtarefas */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Checklist de Subtarefas
            </label>
            
            {/* Lista de Subtarefas */}
            {formData.subtarefas.length > 0 && (
              <div className="space-y-2 mb-3">
                {formData.subtarefas.map((subtarefa: any) => (
                  <div key={subtarefa.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={subtarefa.concluida}
                      onChange={() => toggleSubtarefa(subtarefa.id)}
                      className="w-4 h-4 text-[#D4AF37] rounded focus:ring-[#D4AF37]"
                    />
                    <span className={`flex-1 text-sm ${subtarefa.concluida ? "line-through text-gray-400" : "text-[#333333]"}`}>
                      {subtarefa.texto}
                    </span>
                    <button
                      type="button"
                      onClick={() => removerSubtarefa(subtarefa.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Adicionar Subtarefa */}
            <div className="flex gap-2">
              <input
                type="text"
                value={novaSubtarefa}
                onChange={(e) => setNovaSubtarefa(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), adicionarSubtarefa())}
                placeholder="Adicionar item..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              />
              <button
                type="button"
                onClick={adicionarSubtarefa}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#333333] rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-[#333333] rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C49F2F] text-white rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
            >
              {tarefa ? "Salvar Alterações" : "Criar Tarefa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
