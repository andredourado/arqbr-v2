interface IFrequenciaColetaDTO {
  id?: string
  clienteId?: string
  contratoId?: string
  frequenciaId?: string
  diasDoMes?: string
  segHorarioInicio?: string
  segHorarioFim?: string
  terHorarioInicio?: string
  terHorarioFim?: string
  quaHorarioInicio?: string
  quaHorarioFim?: string
  quiHorarioInicio?: string
  quiHorarioFim?: string
  sexHorarioInicio?: string
  sexHorarioFim?: string
  sabHorarioInicio?: string
  sabHorarioFim?: string
  domHorarioInicio?: string
  domHorarioFim?: string
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IFrequenciaColetaDTO }
