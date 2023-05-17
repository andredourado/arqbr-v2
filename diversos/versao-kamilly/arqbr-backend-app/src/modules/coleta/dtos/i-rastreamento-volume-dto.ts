interface IRastreamentoVolumeDTO {
  id?: string
  volumeId?: string
  dataMovimentacao?: Date
  horaMovimentacao?: Date
  localDeArmazenagem?: string
  statusId?: string
  createdAt?: Date
  updatedAt?: Date
}

export { IRastreamentoVolumeDTO }
