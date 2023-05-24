import { inject, injectable } from 'tsyringe'
import { CaixaQuebra } from '@modules/digitalizacao/infra/typeorm/entities/caixa-quebra'
import { ICaixaQuebraRepository } from '@modules/digitalizacao/repositories/i-caixa-quebra-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
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
class UpdateCaixaQuebraUseCase {
  constructor(
    @inject('CaixaQuebraRepository')
    private caixaQuebraRepository: ICaixaQuebraRepository
  ) {}

  async execute({
    id,
    clienteId,
    departamentoId,
    tipoDocumentoId,
    nomeArquivoOrigem,
    sequencia,
    paginaInicial,
    paginaFinal,
    status
  }: IRequest): Promise<HttpResponse> {
    const caixaQuebra = await this.caixaQuebraRepository.update({
      id,
      clienteId,
      departamentoId,
      tipoDocumentoId,
      nomeArquivoOrigem,
      sequencia,
      paginaInicial,
      paginaFinal,
      status
    })

    return caixaQuebra
  }
}

export { UpdateCaixaQuebraUseCase }
