import { inject, injectable } from 'tsyringe'
import { DefinicaoExtracao } from '@modules/digitalizacao/infra/typeorm/entities/definicao-extracao'
import { IDefinicaoExtracaoRepository } from '@modules/digitalizacao/repositories/i-definicao-extracao-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
  departamentoId: string
  tipoDocumentoId: string
  pdf: string,
  textos: any[]
}

@injectable()
class CreateDefinicaoExtracaoUseCase {
  constructor(
    @inject('DefinicaoExtracaoRepository')
    private definicaoExtracaoRepository: IDefinicaoExtracaoRepository
  ) {}

  async execute({
    clienteId,
    departamentoId,
    tipoDocumentoId,
    pdf,
    textos
  }: IRequest): Promise<DefinicaoExtracao> {
    const result = await this.definicaoExtracaoRepository.create({
        clienteId,
        departamentoId,
        tipoDocumentoId,
        pdf,
        textos
      })
      .then(definicaoExtracaoResult => {
        return definicaoExtracaoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateDefinicaoExtracaoUseCase }
