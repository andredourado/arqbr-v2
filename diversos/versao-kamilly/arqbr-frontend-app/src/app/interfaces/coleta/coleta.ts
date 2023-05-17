export interface ColetaInterface {
  id?: number
  clienteId?: string
  contratoId?: string
  departamentoId?: string
  solicitanteId?: string
  pontoColetaId?: string
  identificador?: string
  dataProgramadaColeta?: Date
  horaProgramadaColeta?: Date
  volumes?: number
  veiculoId?: string
  entregadorId?: string
  dataEfetivaColeta?: Date
  horaEfetivaColeta?: Date
  arquivoFotoProtocolo?: string
  statusId?: string
  createdAt?: Date
  updatedAt?: Date
}
