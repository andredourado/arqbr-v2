import { inject, injectable } from 'tsyringe'
import { Coleta } from '@modules/coleta/infra/typeorm/entities/coleta'
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
  contratoId: string
  departamentoId: string
  solicitanteId: string
  pontoColetaId: string
  identificador: string
  dataProgramadaColeta: Date
  horaProgramadaColeta: Date
  volumes: number
  veiculoId: string
  entregadorId: string
  dataEfetivaColeta: Date
  horaEfetivaColeta: Date
  arquivoFotoProtocolo: string
  statusId: string
}

@injectable()
class CreateColetaUseCase {
  constructor(
    @inject('ColetaRepository')
    private coletaRepository: IColetaRepository
  ) {}

  async execute({
    clienteId,
    contratoId,
    departamentoId,
    solicitanteId,
    pontoColetaId,
    identificador,
    dataProgramadaColeta,
    horaProgramadaColeta,
    volumes,
    veiculoId,
    entregadorId,
    dataEfetivaColeta,
    horaEfetivaColeta,
    arquivoFotoProtocolo,
    statusId
  }: IRequest): Promise<Coleta> {
    const result = await this.coletaRepository.create({
        clienteId,
        contratoId,
        departamentoId,
        solicitanteId,
        pontoColetaId,
        identificador,
        dataProgramadaColeta,
        horaProgramadaColeta,
        volumes,
        veiculoId,
        entregadorId,
        dataEfetivaColeta,
        horaEfetivaColeta,
        arquivoFotoProtocolo,
        statusId
      })
      .then(coletaResult => {
        return coletaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateColetaUseCase }
