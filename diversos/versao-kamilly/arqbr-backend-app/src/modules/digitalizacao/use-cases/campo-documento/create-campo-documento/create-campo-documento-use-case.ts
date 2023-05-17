import { inject, injectable } from 'tsyringe'
import { CampoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/campo-documento'
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
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
class CreateCampoDocumentoUseCase {
  constructor(
    @inject('CampoDocumentoRepository')
    private campoDocumentoRepository: ICampoDocumentoRepository
  ) {}

  async execute({
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
  }: IRequest): Promise<CampoDocumento> {
    const result = await this.campoDocumentoRepository.create({
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
      .then(campoDocumentoResult => {
        return campoDocumentoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateCampoDocumentoUseCase }
