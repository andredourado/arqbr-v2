import { inject, injectable } from 'tsyringe'
import { FrequenciaColeta } from '@modules/clientes/infra/typeorm/entities/frequencia-coleta'
import { IFrequenciaColetaRepository } from '@modules/clientes/repositories/i-frequencia-coleta-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  clienteId: string
  diasDoMes: string
  segHorarioInicio: string
  segHorarioFim: string
  terHorarioInicio: string
  terHorarioFim: string
  quaHorarioInicio: string
  quaHorarioFim: string
  quiHorarioInicio: string
  quiHorarioFim: string
  sexHorarioInicio: string
  sexHorarioFim: string
  sabHorarioInicio: string
  sabHorarioFim: string
  domHorarioInicio: string
  domHorarioFim: string
  desabilitado: boolean
}

@injectable()
class UpdateFrequenciaColetaUseCase {
  constructor(
    @inject('FrequenciaColetaRepository')
    private frequenciaColetaRepository: IFrequenciaColetaRepository
  ) {}

  async execute({
    id,
    clienteId,
    diasDoMes,
    segHorarioInicio,
    segHorarioFim,
    terHorarioInicio,
    terHorarioFim,
    quaHorarioInicio,
    quaHorarioFim,
    quiHorarioInicio,
    quiHorarioFim,
    sexHorarioInicio,
    sexHorarioFim,
    sabHorarioInicio,
    sabHorarioFim,
    domHorarioInicio,
    domHorarioFim,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const frequenciaColeta = await this.frequenciaColetaRepository.update({
      id,
      clienteId,
      diasDoMes,
      segHorarioInicio,
      segHorarioFim,
      terHorarioInicio,
      terHorarioFim,
      quaHorarioInicio,
      quaHorarioFim,
      quiHorarioInicio,
      quiHorarioFim,
      sexHorarioInicio,
      sexHorarioFim,
      sabHorarioInicio,
      sabHorarioFim,
      domHorarioInicio,
      domHorarioFim,
      desabilitado
    })

    return frequenciaColeta
  }
}

export { UpdateFrequenciaColetaUseCase }
