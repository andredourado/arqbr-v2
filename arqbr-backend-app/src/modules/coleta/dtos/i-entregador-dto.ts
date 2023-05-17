interface IEntregadorDTO {
  id?: string
  cpfCnpj?: string
  nome?: string
  email?: string
  endereco?: string
  numero?: string
  complemento?: string
  cep?: string
  telefonesFixos?: string
  celular?: string
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IEntregadorDTO }
