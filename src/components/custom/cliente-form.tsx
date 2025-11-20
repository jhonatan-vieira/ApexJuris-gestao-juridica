"use client"

import { useState } from "react"
import { Save, X, User, Building2, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface ClienteFormProps {
  isEditing?: boolean
  clienteId?: string
}

export function ClienteForm({ isEditing = false, clienteId }: ClienteFormProps) {
  const router = useRouter()
  const [tipoCliente, setTipoCliente] = useState<"fisica" | "juridica">("fisica")
  const [telefones, setTelefones] = useState([{ id: 1, numero: "", tipo: "celular" }])
  const [emails, setEmails] = useState([{ id: 1, email: "", tipo: "principal" }])
  const [tags, setTags] = useState<string[]>([])
  const [novaTag, setNovaTag] = useState("")

  const [formData, setFormData] = useState({
    // Pessoa Física
    nomeCompleto: "",
    cpf: "",
    rg: "",
    dataNascimento: "",
    profissao: "",
    estadoCivil: "",
    
    // Pessoa Jurídica
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: "",
    inscricaoEstadual: "",
    inscricaoMunicipal: "",
    
    // Endereço
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    
    // Outros
    status: "ativo",
    observacoes: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Cliente salvo:", { ...formData, tipo: tipoCliente, telefones, emails, tags })
    router.push("/clientes")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const addTelefone = () => {
    setTelefones([...telefones, { id: Date.now(), numero: "", tipo: "celular" }])
  }

  const removeTelefone = (id: number) => {
    if (telefones.length > 1) {
      setTelefones(telefones.filter(t => t.id !== id))
    }
  }

  const updateTelefone = (id: number, field: string, value: string) => {
    setTelefones(telefones.map(t => t.id === id ? { ...t, [field]: value } : t))
  }

  const addEmail = () => {
    setEmails([...emails, { id: Date.now(), email: "", tipo: "secundario" }])
  }

  const removeEmail = (id: number) => {
    if (emails.length > 1) {
      setEmails(emails.filter(e => e.id !== id))
    }
  }

  const updateEmail = (id: number, field: string, value: string) => {
    setEmails(emails.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  const addTag = () => {
    if (novaTag.trim() && !tags.includes(novaTag.trim())) {
      setTags([...tags, novaTag.trim()])
      setNovaTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tipo de Cliente */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-[#0A2240] mb-4">Tipo de Cliente</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setTipoCliente("fisica")}
            className={`p-6 rounded-lg border-2 transition-all ${
              tipoCliente === "fisica"
                ? "border-[#D4AF37] bg-[#D4AF37]/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <User className={`w-8 h-8 mx-auto mb-2 ${tipoCliente === "fisica" ? "text-[#D4AF37]" : "text-[#333333]"}`} />
            <p className={`font-semibold ${tipoCliente === "fisica" ? "text-[#D4AF37]" : "text-[#333333]"}`}>
              Pessoa Física
            </p>
          </button>
          <button
            type="button"
            onClick={() => setTipoCliente("juridica")}
            className={`p-6 rounded-lg border-2 transition-all ${
              tipoCliente === "juridica"
                ? "border-[#D4AF37] bg-[#D4AF37]/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Building2 className={`w-8 h-8 mx-auto mb-2 ${tipoCliente === "juridica" ? "text-[#D4AF37]" : "text-[#333333]"}`} />
            <p className={`font-semibold ${tipoCliente === "juridica" ? "text-[#D4AF37]" : "text-[#333333]"}`}>
              Pessoa Jurídica
            </p>
          </button>
        </div>
      </div>

      {/* Dados Principais */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-[#0A2240] mb-4">Dados Principais</h3>
        
        {tipoCliente === "fisica" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                CPF <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                RG
              </label>
              <input
                type="text"
                name="rg"
                value={formData.rg}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                Data de Nascimento
              </label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                Profissão
              </label>
              <input
                type="text"
                name="profissao"
                value={formData.profissao}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                Estado Civil
              </label>
              <select
                name="estadoCivil"
                value={formData.estadoCivil}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] bg-white"
              >
                <option value="">Selecione</option>
                <option value="solteiro">Solteiro(a)</option>
                <option value="casado">Casado(a)</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="viuvo">Viúvo(a)</option>
                <option value="uniao-estavel">União Estável</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] bg-white"
                required
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                Razão Social <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="razaoSocial"
                value={formData.razaoSocial}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
                required
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                Nome Fantasia
              </label>
              <input
                type="text"
                name="nomeFantasia"
                value={formData.nomeFantasia}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                CNPJ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                placeholder="00.000.000/0000-00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                Inscrição Estadual
              </label>
              <input
                type="text"
                name="inscricaoEstadual"
                value={formData.inscricaoEstadual}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                Inscrição Municipal
              </label>
              <input
                type="text"
                name="inscricaoMunicipal"
                value={formData.inscricaoMunicipal}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0A2240] mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] bg-white"
                required
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Informações de Contato */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-[#0A2240] mb-4">Informações de Contato</h3>
        
        {/* Telefones */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-semibold text-[#0A2240]">
              Telefones <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={addTelefone}
              className="text-sm text-[#D4AF37] hover:text-[#C19B2F] font-medium flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Adicionar telefone
            </button>
          </div>
          <div className="space-y-3">
            {telefones.map((telefone, index) => (
              <div key={telefone.id} className="flex gap-3">
                <input
                  type="tel"
                  value={telefone.numero}
                  onChange={(e) => updateTelefone(telefone.id, "numero", e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
                  required={index === 0}
                />
                <select
                  value={telefone.tipo}
                  onChange={(e) => updateTelefone(telefone.id, "tipo", e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] bg-white"
                >
                  <option value="celular">Celular</option>
                  <option value="fixo">Fixo</option>
                  <option value="comercial">Comercial</option>
                </select>
                {telefones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTelefone(telefone.id)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* E-mails */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-semibold text-[#0A2240]">
              E-mails <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={addEmail}
              className="text-sm text-[#D4AF37] hover:text-[#C19B2F] font-medium flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Adicionar e-mail
            </button>
          </div>
          <div className="space-y-3">
            {emails.map((email, index) => (
              <div key={email.id} className="flex gap-3">
                <input
                  type="email"
                  value={email.email}
                  onChange={(e) => updateEmail(email.id, "email", e.target.value)}
                  placeholder="email@exemplo.com"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
                  required={index === 0}
                />
                <select
                  value={email.tipo}
                  onChange={(e) => updateEmail(email.id, "tipo", e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] bg-white"
                >
                  <option value="principal">Principal</option>
                  <option value="secundario">Secundário</option>
                  <option value="comercial">Comercial</option>
                </select>
                {emails.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEmail(email.id)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Endereço */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-[#0A2240] mb-4">Endereço</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#0A2240] mb-2">CEP</label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="00000-000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-[#0A2240] mb-2">Logradouro</label>
            <input
              type="text"
              name="logradouro"
              value={formData.logradouro}
              onChange={handleChange}
              placeholder="Rua, Avenida, etc."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A2240] mb-2">Número</label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A2240] mb-2">Complemento</label>
            <input
              type="text"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A2240] mb-2">Bairro</label>
            <input
              type="text"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A2240] mb-2">Cidade</label>
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A2240] mb-2">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] bg-white"
            >
              <option value="">Selecione</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-[#0A2240] mb-4">Tags de Categorização</h3>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={novaTag}
            onChange={(e) => setNovaTag(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder="Digite uma tag (ex: VIP, Contencioso)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333]"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C19B2F] text-white rounded-lg font-medium transition-colors"
          >
            Adicionar
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-[#D4AF37]/10 text-[#D4AF37]"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-[#C19B2F]"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Observações */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-[#0A2240] mb-4">Observações</h3>
        <textarea
          name="observacoes"
          value={formData.observacoes}
          onChange={handleChange}
          placeholder="Adicione observações importantes sobre o cliente..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-[#333333] resize-none"
        />
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Save className="w-5 h-5" />
          {isEditing ? "Atualizar Cliente" : "Salvar Cliente"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/clientes")}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-[#333333] px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          <X className="w-5 h-5" />
          Cancelar
        </button>
      </div>
    </form>
  )
}
