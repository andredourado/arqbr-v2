import { inject, injectable } from 'tsyringe'
import { CaixaQuebra } from '@modules/digitalizacao/infra/typeorm/entities/caixa-quebra'
import { ICaixaQuebraRepository } from '@modules/digitalizacao/repositories/i-caixa-quebra-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
  departamentoId: string
  tipoDocumentoId: string
  nomeArquivoOrigem: string
  sequencia: number
  paginaInicial: number
  paginaFinal: number
  status: string
}

@injectable()
class CreateCaixaQuebraUseCase {
  constructor(
    @inject('CaixaQuebraRepository')
    private caixaQuebraRepository: ICaixaQuebraRepository
  ) {}

  async execute({
    clienteId,
    departamentoId,
    tipoDocumentoId,
    nomeArquivoOrigem,
    sequencia,
    paginaInicial,
    paginaFinal,
    status
  }: IRequest): Promise<CaixaQuebra> {
    const result = await this.caixaQuebraRepository.create({
        clienteId,
        departamentoId,
        tipoDocumentoId,
        nomeArquivoOrigem,
        sequencia,
        paginaInicial,
        paginaFinal,
        status
      })
      .then(caixaQuebraResult => {
        return caixaQuebraResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateCaixaQuebraUseCase }
