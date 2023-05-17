export interface EntregadorInterface {
  id?: number
  cpfCnpj?: string
  nome?: string
  email?: string
  endereco?: string
  numero?: string
  complemento?: string
  cep?: string
  telefonesFixos?: string
  celular?: string
  capacidade?: number
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}
