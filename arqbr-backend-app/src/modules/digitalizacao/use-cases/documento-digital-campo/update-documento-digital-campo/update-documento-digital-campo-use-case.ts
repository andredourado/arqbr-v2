import { inject, injectable } from 'tsyringe'
import { DocumentoDigitalCampo } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital-campo'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
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
    conteudo
  }: IRequest): Promise<HttpResponse> {
    const documentoDigitalCampo = await this.documentoDigitalCampoRepository.update({
      id,
      conteudo
    })

    return documentoDigitalCampo
  }
}

export { UpdateDocumentoDigitalCampoUseCase }
