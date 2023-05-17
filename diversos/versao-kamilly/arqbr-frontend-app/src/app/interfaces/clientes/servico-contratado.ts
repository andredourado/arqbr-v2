export interface ServicoContratadoInterface {
  id?: number
  clienteId?: string
  contratoId?: string
  servicoId?: string
  unidadeSlaId?: string
  sla?: number
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}
