import { inject, injectable } from 'tsyringe'
import { CampoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/campo-documento'
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  tipoDocumentoId: string
  nomeCampo: string
  titulo: string
  metodoExtracao: string
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
    tipoDocumentoId,
    nomeCampo,
    titulo,
    metodoExtracao,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const campoDocumento = await this.campoDocumentoRepository.update({
      id,
      tipoDocumentoId,
      nomeCampo,
      titulo,
      metodoExtracao,
      desabilitado
    })

    return campoDocumento
  }
}

export { UpdateCampoDocumentoUseCase }
