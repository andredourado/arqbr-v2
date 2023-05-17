import { inject, injectable } from 'tsyringe'
import { DocumentoDigital } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  dataDigitalizacao: Date
  versaoDocumentoId: string
  nip: string
  conteudoQrCode: string
  nomeArquivo: string
  conteudoEmTexto: string
  pessoaId: string
}

@injectable()
class CreateDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository
  ) {}

  async execute({
    dataDigitalizacao,
    versaoDocumentoId,
    nip,
    conteudoQrCode,
    nomeArquivo,
    conteudoEmTexto,
    pessoaId
  }: IRequest): Promise<DocumentoDigital> {
    const result = await this.documentoDigitalRepository.create({
        dataDigitalizacao,
        versaoDocumentoId,
        nip,
        conteudoQrCode,
        nomeArquivo,
        conteudoEmTexto,
        pessoaId
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
