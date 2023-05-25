import { inject, injectable } from 'tsyringe'
import { CampoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/campo-documento'
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  tipoDocumentoId: string
  nomeCampo: string
}

@injectable()
class GetCampoDocumentoByTipoDocumentoUseCase {
  constructor(
    @inject('CampoDocumentoRepository')
    private campoDocumentoRepository: ICampoDocumentoRepository
  ) {}

  async execute({ tipoDocumentoId, nomeCampo }: IRequest): Promise<HttpResponse> {
    const campoDocumento = await this.campoDocumentoRepository.getByTipoDocumento(tipoDocumentoId, nomeCampo)

    return campoDocumento
  }
}

export { GetCampoDocumentoByTipoDocumentoUseCase }
