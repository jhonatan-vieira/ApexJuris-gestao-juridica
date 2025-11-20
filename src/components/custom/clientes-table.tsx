"use client"

import { Building2, User, Phone, Mail, Eye, Edit } from "lucide-react"
import Link from "next/link"

interface ClientesTableProps {
  searchTerm: string
  filters: {
    status: string
    tipo: string
    tags: string[]
  }
}

export function ClientesTable({ searchTerm, filters }: ClientesTableProps) {
  // Mock data - será substituído por dados reais do Supabase
  const clientes = [
    {
      id: "1",
      tipo: "fisica",
      nome: "João Silva",
      cpfCnpj: "123.456.789-00",
      telefone: "(11) 98765-4321",
      email: "joao.silva@email.com",
      status: "ativo",
      tags: ["Contencioso", "VIP"],
      processos: 3
    },
    {
      id: "2",
      tipo: "juridica",
      nome: "Empresa XYZ Ltda",
      cpfCnpj: "12.345.678/0001-90",
      telefone: "(11) 3456-7890",
      email: "contato@empresaxyz.com.br",
      status: "ativo",
      tags: ["Consultivo", "Corporativo"],
      processos: 5
    },
    {
      id: "3",
      tipo: "fisica",
      nome: "Maria Santos",
      cpfCnpj: "987.654.321-00",
      telefone: "(11) 91234-5678",
      email: "maria.santos@email.com",
      status: "ativo",
      tags: ["Trabalhista"],
      processos: 2
    },
    {
      id: "4",
      tipo: "juridica",
      nome: "Tech Solutions S.A.",
      cpfCnpj: "98.765.432/0001-10",
      telefone: "(11) 2345-6789",
      email: "juridico@techsolutions.com",
      status: "inativo",
      tags: ["Consultivo", "Tecnologia"],
      processos: 1
    },
    {
      id: "5",
      tipo: "fisica",
      nome: "Carlos Oliveira",
      cpfCnpj: "456.789.123-00",
      telefone: "(11) 99876-5432",
      email: "carlos.oliveira@email.com",
      status: "ativo",
      tags: ["Família", "VIP"],
      processos: 4
    },
  ]

  // Filtrar clientes
  const clientesFiltrados = clientes.filter(cliente => {
    // Filtro de busca
    const matchSearch = searchTerm === "" || 
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cpfCnpj.includes(searchTerm) ||
      cliente.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filtro de status
    const matchStatus = filters.status === "todos" || cliente.status === filters.status

    // Filtro de tipo
    const matchTipo = filters.tipo === "todos" || cliente.tipo === filters.tipo

    // Filtro de tags
    const matchTags = filters.tags.length === 0 || 
      filters.tags.some(tag => cliente.tags.includes(tag))

    return matchSearch && matchStatus && matchTipo && matchTags
  })

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5F5F5] border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#0A2240] uppercase tracking-wider">
                Cliente
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#0A2240] uppercase tracking-wider">
                CPF/CNPJ
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#0A2240] uppercase tracking-wider">
                Contato
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#0A2240] uppercase tracking-wider">
                Tags
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#0A2240] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#0A2240] uppercase tracking-wider">
                Processos
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-[#0A2240] uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-[#F5F5F5] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${cliente.tipo === "fisica" ? "bg-blue-50" : "bg-purple-50"}`}>
                      {cliente.tipo === "fisica" ? (
                        <User className={`w-5 h-5 ${cliente.tipo === "fisica" ? "text-blue-600" : "text-purple-600"}`} />
                      ) : (
                        <Building2 className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0A2240]">{cliente.nome}</p>
                      <p className="text-xs text-[#333333]/60">
                        {cliente.tipo === "fisica" ? "Pessoa Física" : "Pessoa Jurídica"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-[#333333] font-mono">{cliente.cpfCnpj}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="text-sm text-[#333333] flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#333333]/40" />
                      {cliente.telefone}
                    </p>
                    <p className="text-sm text-[#333333] flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#333333]/40" />
                      {cliente.email}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {cliente.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#D4AF37]/10 text-[#D4AF37]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      cliente.status === "ativo"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cliente.status === "ativo" ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#0A2240]/10 text-[#0A2240]">
                    {cliente.processos} {cliente.processos === 1 ? "processo" : "processos"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/clientes/${cliente.id}`}
                      className="p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors group"
                      title="Ver detalhes"
                    >
                      <Eye className="w-4 h-4 text-[#333333] group-hover:text-[#D4AF37]" />
                    </Link>
                    <Link
                      href={`/clientes/${cliente.id}/editar`}
                      className="p-2 hover:bg-[#0A2240]/10 rounded-lg transition-colors group"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4 text-[#333333] group-hover:text-[#0A2240]" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-gray-200">
        {clientesFiltrados.map((cliente) => (
          <div key={cliente.id} className="p-4 hover:bg-[#F5F5F5] transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${cliente.tipo === "fisica" ? "bg-blue-50" : "bg-purple-50"}`}>
                  {cliente.tipo === "fisica" ? (
                    <User className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Building2 className="w-5 h-5 text-purple-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#0A2240]">{cliente.nome}</p>
                  <p className="text-xs text-[#333333]/60 font-mono">{cliente.cpfCnpj}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                  cliente.status === "ativo"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {cliente.status === "ativo" ? "Ativo" : "Inativo"}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              <p className="text-sm text-[#333333] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#333333]/40" />
                {cliente.telefone}
              </p>
              <p className="text-sm text-[#333333] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#333333]/40" />
                {cliente.email}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {cliente.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#D4AF37]/10 text-[#D4AF37]"
                >
                  {tag}
                </span>
              ))}
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-[#0A2240]/10 text-[#0A2240]">
                {cliente.processos} {cliente.processos === 1 ? "processo" : "processos"}
              </span>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-200">
              <Link
                href={`/clientes/${cliente.id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                Ver Detalhes
              </Link>
              <Link
                href={`/clientes/${cliente.id}/editar`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#0A2240] text-[#0A2240] rounded-lg hover:bg-[#0A2240]/10 transition-colors text-sm font-medium"
              >
                <Edit className="w-4 h-4" />
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {clientesFiltrados.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-[#333333]/20 mx-auto mb-4" />
          <p className="text-[#333333]/60 font-medium">Nenhum cliente encontrado</p>
          <p className="text-sm text-[#333333]/40 mt-1">
            Tente ajustar os filtros ou adicionar um novo cliente
          </p>
        </div>
      )}
    </div>
  )
}
