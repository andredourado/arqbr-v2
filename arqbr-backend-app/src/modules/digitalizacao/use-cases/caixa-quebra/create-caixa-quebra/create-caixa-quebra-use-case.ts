import { inject, injectable } from 'tsyringe'
import { CaixaQuebra } from '@modules/digitalizacao/infra/typeorm/entities/caixa-quebra'
import { ICaixaQuebraRepository } from '@modules/digitalizacao/repositories/i-caixa-quebra-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
  departamentoId: string
  tipoDocumentoId: string
  nomeArquivoOrigem: string
  status: string
  quebras: any[]
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
    status,
    quebras
  }: IRequest): Promise<CaixaQuebra> {
    const result = await this.caixaQuebraRepository.create({
        clienteId,
        departamentoId,
        tipoDocumentoId,
        nomeArquivoOrigem,
        status,
        quebras
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
