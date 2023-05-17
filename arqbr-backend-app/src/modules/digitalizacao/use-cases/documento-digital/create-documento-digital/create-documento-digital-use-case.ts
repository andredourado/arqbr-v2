import { inject, injectable } from 'tsyringe'
import { DocumentoDigital } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
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
class CreateDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository
  ) {}

  async execute({
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
  }: IRequest): Promise<DocumentoDigital> {
    const result = await this.documentoDigitalRepository.create({
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
      .then(documentoDigitalResult => {
        return documentoDigitalResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateDocumentoDigitalUseCase }
