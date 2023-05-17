import { inject, injectable } from 'tsyringe'
import { RastreamentoDocumento } from '@modules/classificacao/infra/typeorm/entities/rastreamento-documento'
import { IRastreamentoDocumentoRepository } from '@modules/classificacao/repositories/i-rastreamento-documento-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  volumeId: string
  dataMovimentacao: Date
  horaMovimentacao: string
  localDeArmazenagem: string
  statusId: string
}

@injectable()
class CreateRastreamentoDocumentoUseCase {
  constructor(
    @inject('RastreamentoDocumentoRepository')
    private rastreamentoDocumentoRepository: IRastreamentoDocumentoRepository
  ) {}

  async execute({
    volumeId,
    dataMovimentacao,
    horaMovimentacao,
    localDeArmazenagem,
    statusId
  }: IRequest): Promise<RastreamentoDocumento> {
    const result = await this.rastreamentoDocumentoRepository.create({
        volumeId,
        dataMovimentacao,
        horaMovimentacao,
        localDeArmazenagem,
        statusId
      })
      .then(rastreamentoDocumentoResult => {
        return rastreamentoDocumentoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateRastreamentoDocumentoUseCase }
