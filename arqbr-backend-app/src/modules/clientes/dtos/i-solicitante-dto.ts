interface ISolicitanteDTO {
  id?: string
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

export { ISolicitanteDTO }
