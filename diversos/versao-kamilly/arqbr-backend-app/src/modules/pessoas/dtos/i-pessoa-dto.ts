interface IPessoaDTO {
  id?: string
  unidadeId?: string
  nome?: string
  email?: string
  funcaoId?: string
  gerente?: boolean
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IPessoaDTO }
