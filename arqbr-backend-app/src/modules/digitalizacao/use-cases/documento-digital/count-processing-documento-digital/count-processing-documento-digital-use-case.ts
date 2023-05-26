import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { HttpResponse, noContent } from '@shared/helpers'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'

@injectable()
class CountProcessingDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository,
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}

  async execute(user: User): Promise<HttpResponse> {
    const solicitante = await this.solicitanteRepository.getByEmail(user.login)
    
    const documentosDigitaisCount = await this.documentoDigitalRepository.countProcessing(user, solicitante)

    return documentosDigitaisCount
  }
}

export { CountProcessingDocumentoDigitalUseCase }
