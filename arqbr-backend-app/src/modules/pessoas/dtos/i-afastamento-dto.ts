interface IAfastamentoDTO {
  id?: string
  pessoaId?: string
  tipoAfastamentoId?: string
  inicio?: Date
  fim?: Date
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IAfastamentoDTO }
