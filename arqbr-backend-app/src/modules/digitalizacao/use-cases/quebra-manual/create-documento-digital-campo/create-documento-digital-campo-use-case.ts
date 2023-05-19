import { inject, injectable } from 'tsyringe'
import { DocumentoDigitalCampo } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital-campo'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  documentoDigitalId: string
  campoDocumentoId: string
  conteudo: string
}

@injectable()
class CreateDocumentoDigitalCampoUseCase {
  constructor(
    @inject('DocumentoDigitalCampoRepository')
    private documentoDigitalCampoRepository: IDocumentoDigitalCampoRepository
  ) {}

  async execute({
    documentoDigitalId,
    campoDocumentoId,
    conteudo
  }: IRequest): Promise<DocumentoDigitalCampo> {
    const result = await this.documentoDigitalCampoRepository.create({
        documentoDigitalId,
        campoDocumentoId,
        conteudo
      })
      .then(documentoDigitalCampoResult => {
        return documentoDigitalCampoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateDocumentoDigitalCampoUseCase }
