import { inject, injectable } from 'tsyringe'
import { DocumentoDigitalCampo } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital-campo'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  documentoDigitalId: string
  campoId: string
  conteudo: string
  indiceQualidadeExtracao: number
  pessoaId: string
}

@injectable()
class CreateDocumentoDigitalCampoUseCase {
  constructor(
    @inject('DocumentoDigitalCampoRepository')
    private documentoDigitalCampoRepository: IDocumentoDigitalCampoRepository
  ) {}

  async execute({
    documentoDigitalId,
    campoId,
    conteudo,
    indiceQualidadeExtracao,
    pessoaId
  }: IRequest): Promise<DocumentoDigitalCampo> {
    const result = await this.documentoDigitalCampoRepository.create({
        documentoDigitalId,
        campoId,
        conteudo,
        indiceQualidadeExtracao,
        pessoaId
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
