import { inject, injectable } from 'tsyringe'
import { FrequenciaColeta } from '@modules/clientes/infra/typeorm/entities/frequencia-coleta'
import { IFrequenciaColetaRepository } from '@modules/clientes/repositories/i-frequencia-coleta-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
  contratoId: string
  frequenciaId: string
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
class CreateFrequenciaColetaUseCase {
  constructor(
    @inject('FrequenciaColetaRepository')
    private frequenciaColetaRepository: IFrequenciaColetaRepository
  ) {}

  async execute({
    clienteId,
    contratoId,
    frequenciaId,
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
  }: IRequest): Promise<FrequenciaColeta> {
    const result = await this.frequenciaColetaRepository.create({
        clienteId,
        contratoId,
        frequenciaId,
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
      .then(frequenciaColetaResult => {
        return frequenciaColetaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateFrequenciaColetaUseCase }
