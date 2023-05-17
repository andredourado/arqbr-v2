interface ISugestaoDTO {
  id?: string
  clienteId?: string
  departamentoId?: string
  solicitanteId?: string
  titulo?: string
  descricao?: string
  atendido?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { ISugestaoDTO }
