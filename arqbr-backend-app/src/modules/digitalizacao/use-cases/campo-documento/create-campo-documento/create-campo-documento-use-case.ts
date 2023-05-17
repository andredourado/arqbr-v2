import { inject, injectable } from 'tsyringe'
import { CampoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/campo-documento'
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  tipoDocumentoId: string
  nomeCampo: string
  titulo: string
  metodoExtracao: string
  desabilitado: boolean
}

@injectable()
class CreateCampoDocumentoUseCase {
  constructor(
    @inject('CampoDocumentoRepository')
    private campoDocumentoRepository: ICampoDocumentoRepository
  ) {}

  async execute({
    tipoDocumentoId,
    nomeCampo,
    titulo,
    metodoExtracao,
    desabilitado
  }: IRequest): Promise<CampoDocumento> {
    const result = await this.campoDocumentoRepository.create({
        tipoDocumentoId,
        nomeCampo,
        titulo,
        metodoExtracao,
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
