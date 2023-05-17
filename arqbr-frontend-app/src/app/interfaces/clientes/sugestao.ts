export interface SugestaoInterface {
  id?: number
  clienteId?: string
  departamentoId?: string
  solicitanteId?: string
  titulo?: string
  descricao?: string
  atendido?: boolean
  createdAt?: Date
  updatedAt?: Date
}
