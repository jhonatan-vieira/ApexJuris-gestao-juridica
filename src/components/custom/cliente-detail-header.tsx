"use client"

import { ArrowLeft, Edit, User, Building2, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

interface ClienteDetailHeaderProps {
  clienteId: string
}

export function ClienteDetailHeader({ clienteId }: ClienteDetailHeaderProps) {
  // Mock data - será substituído por dados reais do Supabase
  const cliente = {
    id: clienteId,
    tipo: "fisica",
    nome: "João Silva",
    cpfCnpj: "123.456.789-00",
    telefone: "(11) 98765-4321",
    email: "joao.silva@email.com",
    endereco: "São Paulo, SP",
    status: "ativo",
    tags: ["Contencioso", "VIP"],
    processos: 3
  }

  return (
    <div className="mb-6">
      {/* Back Button */}
      <Link
        href="/clientes"
        className="inline-flex items-center gap-2 text-[#333333] hover:text-[#0A2240] mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Voltar para Clientes</span>
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Client Info */}
          <div className="flex items-start gap-4 flex-1">
            <div className={`p-4 rounded-xl ${cliente.tipo === "fisica" ? "bg-blue-50" : "bg-purple-50"}`}>
              {cliente.tipo === "fisica" ? (
                <User className="w-8 h-8 text-blue-600" />
              ) : (
                <Building2 className="w-8 h-8 text-purple-600" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0A2240]">
                  {cliente.nome}
                </h1>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    cliente.status === "ativo"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {cliente.status === "ativo" ? "Ativo" : "Inativo"}
                </span>
              </div>
              
              <p className="text-sm text-[#333333]/60 mb-4 font-mono">
                {cliente.cpfCnpj}
              </p>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#333333]/40" />
                  <span className="text-sm text-[#333333]">{cliente.telefone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#333333]/40" />
                  <span className="text-sm text-[#333333]">{cliente.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#333333]/40" />
                  <span className="text-sm text-[#333333]">{cliente.endereco}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {cliente.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#D4AF37]/10 text-[#D4AF37]"
                  >
                    {tag}
                  </span>
                ))}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#0A2240]/10 text-[#0A2240]">
                  {cliente.processos} {cliente.processos === 1 ? "processo" : "processos"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href={`/clientes/${clienteId}/editar`}
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C19B2F] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Edit className="w-5 h-5" />
              Editar Cliente
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
