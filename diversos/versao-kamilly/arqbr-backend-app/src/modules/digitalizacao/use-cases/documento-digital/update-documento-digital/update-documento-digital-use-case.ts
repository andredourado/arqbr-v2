import { inject, injectable } from 'tsyringe'
import { DocumentoDigital } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  dataDigitalizacao: Date
  versaoDocumentoId: string
  nip: string
  conteudoQrCode: string
  nomeArquivo: string
  conteudoEmTexto: string
  pessoaId: string
}

@injectable()
class UpdateDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository
  ) {}

  async execute({
    id,
    dataDigitalizacao,
    versaoDocumentoId,
    nip,
    conteudoQrCode,
    nomeArquivo,
    conteudoEmTexto,
    pessoaId
  }: IRequest): Promise<HttpResponse> {
    const documentoDigital = await this.documentoDigitalRepository.update({
      id,
      dataDigitalizacao,
      versaoDocumentoId,
      nip,
      conteudoQrCode,
      nomeArquivo,
      conteudoEmTexto,
      pessoaId
    })

    return documentoDigital
  }
}

export { UpdateDocumentoDigitalUseCase }
