import { inject, injectable } from 'tsyringe'
import { DocumentoDigitalCampo } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital-campo'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  documentoDigitalId: string
  campoId: string
  conteudo: string
  indiceQualidadeExtracao: number
  pessoaId: string
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
    campoId,
    conteudo,
    indiceQualidadeExtracao,
    pessoaId
  }: IRequest): Promise<HttpResponse> {
    const documentoDigitalCampo = await this.documentoDigitalCampoRepository.update({
      id,
      documentoDigitalId,
      campoId,
      conteudo,
      indiceQualidadeExtracao,
      pessoaId
    })

    return documentoDigitalCampo
  }
}

export { UpdateDocumentoDigitalCampoUseCase }
