"use client"

import { useState, useEffect } from "react"
import { Save, X, Search } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProcessoFormProps {
  isEditing?: boolean
  processoId?: string
}

export function ProcessoForm({ isEditing = false, processoId }: ProcessoFormProps) {
  const router = useRouter()
  const [showClienteSearch, setShowClienteSearch] = useState(false)
  const [clienteSearch, setClienteSearch] = useState("")
  const [selectedCliente, setSelectedCliente] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    numeroProcesso: "",
    advogadoResponsavel: "",
    clienteId: "",
    parteContraria: "",
    vara: "",
    comarca: "",
    tipoAcao: "",
    valorCausa: "",
    status: "ativo",
    anotacoes: ""
  })

  // Mock data de clientes - será substituído por dados reais do Supabase
  const clientes = [
    { id: "1", nome: "João Silva", cpfCnpj: "123.456.789-00", tipo: "fisica" },
    { id: "2", nome: "Empresa XYZ Ltda", cpfCnpj: "12.345.678/0001-90", tipo: "juridica" },
    { id: "3", nome: "Maria Santos", cpfCnpj: "987.654.321-00", tipo: "fisica" },
    { id: "4", nome: "Tech Solutions S.A.", cpfCnpj: "98.765.432/0001-10", tipo: "juridica" },
    { id: "5", nome: "Carlos Oliveira", cpfCnpj: "456.789.123-00", tipo: "fisica" },
  ]

  // Filtrar clientes baseado na busca
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(clienteSearch.toLowerCase()) ||
    cliente.cpfCnpj.includes(clienteSearch)
  )

  // Se estiver editando, carregar dados do processo
  useEffect(() => {
    if (isEditing && processoId) {
      // Mock data - será substituído por dados reais do banco
      const processoMock = {
        numeroProcesso: "0001234-56.2024.5.01.0001",
        advogadoResponsavel: "dr-silva",
        clienteId: "1",
        parteContraria: "Empresa XYZ Ltda",
        vara: "1ª Vara do Trabalho",
        comarca: "São Paulo",
        tipoAcao: "trabalhista",
        valorCausa: "R$ 50.000,00",
        status: "ativo",
        anotacoes: "Cliente busca reconhecimento de vínculo empregatício."
      }
      setFormData(processoMock)
      
      // Carregar cliente selecionado
      const cliente = clientes.find(c => c.id === processoMock.clienteId)
      if (cliente) {
        setSelectedCliente(cliente)
      }
    }
  }, [isEditing, processoId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui será implementada a lógica de salvamento no banco
    console.log(isEditing ? "Processo atualizado:" : "Processo cadastrado:", formData)
    
    if (isEditing && processoId) {
      router.push(`/processos/${processoId}`)
    } else {
      router.push("/processos")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectCliente = (cliente: any) => {
    setSelectedCliente(cliente)
    setFormData({ ...formData, clienteId: cliente.id })
    setShowClienteSearch(false)
    setClienteSearch("")
  }

  const handleCancel = () => {
    if (isEditing && processoId) {
      router.push(`/processos/${processoId}`)
    } else {
      router.push("/processos")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Número do Processo */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-[#0A2240] mb-2">
            Número do Processo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="numeroProcesso"
            value={formData.numeroProcesso}
            onChange={handleChange}
            placeholder="0000000-00.0000.0.00.0000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] font-mono"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Formato: 0000000-00.0000.0.00.0000</p>
        </div>

        {/* Advogado Responsável */}
        <div>
          <label className="block text-sm font-semibold text-[#0A2240] mb-2">
            Advogado Responsável <span className="text-red-500">*</span>
          </label>
          <select
            name="advogadoResponsavel"
            value={formData.advogadoResponsavel}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] bg-white"
            required
          >
            <option value="">Selecione um advogado</option>
            <option value="dr-silva">Dr. Silva</option>
            <option value="dra-santos">Dra. Santos</option>
            <option value="dr-oliveira">Dr. Oliveira</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-[#0A2240] mb-2">
            Status do Processo <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] bg-white"
            required
          >
            <option value="ativo">Ativo</option>
            <option value="suspenso">Suspenso</option>
            <option value="arquivado">Arquivado</option>
          </select>
        </div>

        {/* Cliente - Campo de Busca/Seleção */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-[#0A2240] mb-2">
            Cliente(s) <span className="text-red-500">*</span>
          </label>
          
          {selectedCliente ? (
            <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg bg-[#F5F5F5]">
              <div className="flex-1">
                <p className="font-semibold text-[#0A2240]">{selectedCliente.nome}</p>
                <p className="text-sm text-[#333333]/60 font-mono">{selectedCliente.cpfCnpj}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCliente(null)
                  setFormData({ ...formData, clienteId: "" })
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Remover
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#333333]/40" />
                <input
                  type="text"
                  value={clienteSearch}
                  onChange={(e) => {
                    setClienteSearch(e.target.value)
                    setShowClienteSearch(true)
                  }}
                  onFocus={() => setShowClienteSearch(true)}
                  placeholder="Buscar cliente por nome ou CPF/CNPJ..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
                  required={!selectedCliente}
                />
              </div>

              {/* Dropdown de Resultados */}
              {showClienteSearch && clienteSearch && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {clientesFiltrados.length > 0 ? (
                    clientesFiltrados.map((cliente) => (
                      <button
                        key={cliente.id}
                        type="button"
                        onClick={() => handleSelectCliente(cliente)}
                        className="w-full text-left px-4 py-3 hover:bg-[#F5F5F5] transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <p className="font-semibold text-[#0A2240]">{cliente.nome}</p>
                        <p className="text-sm text-[#333333]/60 font-mono">{cliente.cpfCnpj}</p>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-center text-[#333333]/60">
                      Nenhum cliente encontrado
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Busque e selecione o cliente associado ao processo
          </p>
        </div>

        {/* Parte Contrária */}
        <div>
          <label className="block text-sm font-semibold text-[#0A2240] mb-2">
            Parte(s) Contrária(s) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="parteContraria"
            value={formData.parteContraria}
            onChange={handleChange}
            placeholder="Nome da parte contrária"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
            required
          />
        </div>

        {/* Vara */}
        <div>
          <label className="block text-sm font-semibold text-[#0A2240] mb-2">
            Vara
          </label>
          <input
            type="text"
            name="vara"
            value={formData.vara}
            onChange={handleChange}
            placeholder="Ex: 1ª Vara Cível"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
          />
        </div>

        {/* Comarca */}
        <div>
          <label className="block text-sm font-semibold text-[#0A2240] mb-2">
            Comarca
          </label>
          <input
            type="text"
            name="comarca"
            value={formData.comarca}
            onChange={handleChange}
            placeholder="Ex: São Paulo"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
          />
        </div>

        {/* Tipo de Ação */}
        <div>
          <label className="block text-sm font-semibold text-[#0A2240] mb-2">
            Tipo de Ação <span className="text-red-500">*</span>
          </label>
          <select
            name="tipoAcao"
            value={formData.tipoAcao}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] bg-white"
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="trabalhista">Trabalhista</option>
            <option value="civil">Civil</option>
            <option value="criminal">Criminal</option>
            <option value="tributario">Tributário</option>
            <option value="familia">Família</option>
            <option value="consumidor">Consumidor</option>
          </select>
        </div>

        {/* Valor da Causa */}
        <div>
          <label className="block text-sm font-semibold text-[#0A2240] mb-2">
            Valor da Causa
          </label>
          <input
            type="text"
            name="valorCausa"
            value={formData.valorCausa}
            onChange={handleChange}
            placeholder="R$ 0,00"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
          />
        </div>

        {/* Anotações */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-[#0A2240] mb-2">
            Anotações Iniciais
          </label>
          <textarea
            name="anotacoes"
            value={formData.anotacoes}
            onChange={handleChange}
            placeholder="Adicione observações importantes sobre o processo..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] resize-none"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Save className="w-5 h-5" />
          {isEditing ? "Atualizar Processo" : "Salvar Processo"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-[#333333] px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          <X className="w-5 h-5" />
          Cancelar
        </button>
      </div>
    </form>
  )
}
