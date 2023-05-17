import { inject, injectable } from 'tsyringe'
import { DocumentoDigital } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  clienteId: string
  departamentoId: string
  tipoDocumentoId: string
  nomeArquivo: string
  nomeArquivoOrigem: string
  conteudoEmTexto: string
  numeroPaginas: number
  solicitacaoFisico: boolean
  dataSolicitacao: Date
  solicitanteId: string
}

@injectable()
class UpdateDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository
  ) {}

  async execute({
    id,
    clienteId,
    departamentoId,
    tipoDocumentoId,
    nomeArquivo,
    nomeArquivoOrigem,
    conteudoEmTexto,
    numeroPaginas,
    solicitacaoFisico,
    dataSolicitacao,
    solicitanteId
  }: IRequest): Promise<HttpResponse> {
    const documentoDigital = await this.documentoDigitalRepository.update({
      id,
      clienteId,
      departamentoId,
      tipoDocumentoId,
      nomeArquivo,
      nomeArquivoOrigem,
      conteudoEmTexto,
      numeroPaginas,
      solicitacaoFisico,
      dataSolicitacao,
      solicitanteId
    })

    return documentoDigital
  }
}

export { UpdateDocumentoDigitalUseCase }
