import { inject, injectable } from 'tsyringe'
import { Coleta } from '@modules/coleta/infra/typeorm/entities/coleta'
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
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
}

@injectable()
class CreateColetaUseCase {
  constructor(
    @inject('ColetaRepository')
    private coletaRepository: IColetaRepository
  ) {}

  async execute({
    clienteId,
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
    arquivoFotoProtocolo
  }: IRequest): Promise<Coleta> {
    const result = await this.coletaRepository.create({
        clienteId,
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
        arquivoFotoProtocolo
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
