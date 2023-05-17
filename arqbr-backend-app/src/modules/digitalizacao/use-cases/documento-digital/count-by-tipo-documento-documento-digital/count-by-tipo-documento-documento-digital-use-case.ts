import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { HttpResponse, noContent } from '@shared/helpers'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'

interface IRequest {
  user: User
}

@injectable()
class CountByTipoDocumentoDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository,
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}

  async execute({
    user
  }: IRequest): Promise<HttpResponse> {
    const solicitante = await this.solicitanteRepository.getByEmail(user.login)

    if (!user.isAdmin && !user.isSuperUser && !solicitante) return noContent()
    
    const countByTipoDocumento = await this.documentoDigitalRepository.countByTipoDocumento(
      user,
      solicitante
    )

    return countByTipoDocumento
  }
}

export { CountByTipoDocumentoDocumentoDigitalUseCase }
