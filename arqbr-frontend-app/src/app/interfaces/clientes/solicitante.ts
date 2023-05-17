export interface SolicitanteInterface {
  id?: number
  clienteId?: string
  departamentoId?: string
  nome?: string
  email?: string
  telefonesFixos?: string
  celular?: string
  gerenteDepartamento?: boolean
  gestorContrato?: boolean
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}
