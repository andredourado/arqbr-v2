interface IDefinicaoExtracaoDTO {
  id?: string
  clienteId?: string
  departamentoId?: string
  tipoDocumentoId?: string
  pdf?: string
  textoQuebra?: string
  nomeCampo?: string
  titulo?: string
  estrategia?: string
  texto?: string
  linha?: string
  inicio?: string
  comprimento?: Number
  textos?: any[]
  createdAt?: Date
  updatedAt?: Date
}

export { IDefinicaoExtracaoDTO }
