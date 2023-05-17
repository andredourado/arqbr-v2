import { inject, injectable } from 'tsyringe'
import { Coleta } from '@modules/coleta/infra/typeorm/entities/coleta'
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
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
class UpdateColetaUseCase {
  constructor(
    @inject('ColetaRepository')
    private coletaRepository: IColetaRepository
  ) {}

  async execute({
    id,
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
  }: IRequest): Promise<HttpResponse> {
    const coleta = await this.coletaRepository.update({
      id,
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

    return coleta
  }
}

export { UpdateColetaUseCase }
