interface IPosicaoDTO {
  id?: string
  unidadeId?: string
  plantaId?: string
  rua?: string
  linha?: string
  coluna?: string
  posicoes?: number
  posicoesDisponíveis?: number
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IPosicaoDTO }
