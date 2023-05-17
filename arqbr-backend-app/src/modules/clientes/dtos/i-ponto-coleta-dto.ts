interface IPontoColetaDTO {
  id?: string
  clienteId?: string
  descricao?: string
  estadoId?: string
  cidadeId?: string
  endereco?: string
  numero?: string
  complemento?: string
  pessoaContatoNome?: string
  pessoaContatoCelular?: string
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IPontoColetaDTO }
