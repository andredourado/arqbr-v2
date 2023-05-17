import { inject, injectable } from 'tsyringe'
import { DocumentoDigitalCampo } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital-campo'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  documentoDigitalId: string
  campoDocumentoId: string
  conteudo: string
}

@injectable()
class UpdateDocumentoDigitalCampoUseCase {
  constructor(
    @inject('DocumentoDigitalCampoRepository')
    private documentoDigitalCampoRepository: IDocumentoDigitalCampoRepository
  ) {}

  async execute({
    id,
    documentoDigitalId,
    campoDocumentoId,
    conteudo
  }: IRequest): Promise<HttpResponse> {
    const documentoDigitalCampo = await this.documentoDigitalCampoRepository.update({
      id,
      documentoDigitalId,
      campoDocumentoId,
      conteudo
    })

    return documentoDigitalCampo
  }
}

export { UpdateDocumentoDigitalCampoUseCase }
