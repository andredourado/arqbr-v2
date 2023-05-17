import { inject, injectable } from 'tsyringe'
import { CampoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/campo-documento'
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  versaoDocumentoId: string
  nomeCampo: string
  identificador: string
  cantoSuperiorX: number
  cantoSuperiorY: number
  cantoInferiorX: number
  cantoInferiorY: number
  conteudoParaValidacao: string
  pessoaId: string
  desabilitado: boolean
}

@injectable()
class UpdateCampoDocumentoUseCase {
  constructor(
    @inject('CampoDocumentoRepository')
    private campoDocumentoRepository: ICampoDocumentoRepository
  ) {}

  async execute({
    id,
    versaoDocumentoId,
    nomeCampo,
    identificador,
    cantoSuperiorX,
    cantoSuperiorY,
    cantoInferiorX,
    cantoInferiorY,
    conteudoParaValidacao,
    pessoaId,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const campoDocumento = await this.campoDocumentoRepository.update({
      id,
      versaoDocumentoId,
      nomeCampo,
      identificador,
      cantoSuperiorX,
      cantoSuperiorY,
      cantoInferiorX,
      cantoInferiorY,
      conteudoParaValidacao,
      pessoaId,
      desabilitado
    })

    return campoDocumento
  }
}

export { UpdateCampoDocumentoUseCase }
