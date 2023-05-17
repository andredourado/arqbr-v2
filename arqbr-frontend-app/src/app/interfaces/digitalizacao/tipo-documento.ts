export interface TipoDocumentoInterface {
  id?: number
  clienteId?: string
  departamentoId?: string
  descricao?: string
  identificador?: string
  estrategiaQuebra?: string
  prazoDescarteAnos?: string
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}
