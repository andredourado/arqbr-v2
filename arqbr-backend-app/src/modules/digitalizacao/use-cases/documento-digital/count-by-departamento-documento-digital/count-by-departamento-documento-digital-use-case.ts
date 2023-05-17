import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { HttpResponse, noContent } from '@shared/helpers'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'

@injectable()
class CountByDepartamentoDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository,
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}

  async execute(): Promise<HttpResponse> {    
    const countByDepartamento = await this.documentoDigitalRepository.countByDepartamento()

    return countByDepartamento
  }
}

export { CountByDepartamentoDocumentoDigitalUseCase }
