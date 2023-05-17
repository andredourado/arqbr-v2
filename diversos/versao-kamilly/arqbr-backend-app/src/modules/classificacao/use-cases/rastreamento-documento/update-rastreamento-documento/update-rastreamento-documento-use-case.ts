import { inject, injectable } from 'tsyringe'
import { RastreamentoDocumento } from '@modules/classificacao/infra/typeorm/entities/rastreamento-documento'
import { IRastreamentoDocumentoRepository } from '@modules/classificacao/repositories/i-rastreamento-documento-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  volumeId: string
  dataMovimentacao: Date
  horaMovimentacao: string
  localDeArmazenagem: string
  statusId: string
}

@injectable()
class UpdateRastreamentoDocumentoUseCase {
  constructor(
    @inject('RastreamentoDocumentoRepository')
    private rastreamentoDocumentoRepository: IRastreamentoDocumentoRepository
  ) {}

  async execute({
    id,
    volumeId,
    dataMovimentacao,
    horaMovimentacao,
    localDeArmazenagem,
    statusId
  }: IRequest): Promise<HttpResponse> {
    const rastreamentoDocumento = await this.rastreamentoDocumentoRepository.update({
      id,
      volumeId,
      dataMovimentacao,
      horaMovimentacao,
      localDeArmazenagem,
      statusId
    })

    return rastreamentoDocumento
  }
}

export { UpdateRastreamentoDocumentoUseCase }
