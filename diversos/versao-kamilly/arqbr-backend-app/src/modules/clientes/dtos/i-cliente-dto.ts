interface IClienteDTO {
  id?: string
  cnpj?: string
  nomeFantasia?: string
  razaoSocial?: string
  inscricaoEstadual?: string
  endereco?: string
  numero?: string
  complemento?: string
  estadoId?: string
  cidadeId?: string
  cep?: string
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IClienteDTO }
