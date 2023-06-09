import { inject, injectable } from 'tsyringe'
import { DocumentoDigital } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { HttpResponse, noContent } from '@shared/helpers'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'

interface IRequest {
  search: string,
  filter?: any,
  tipoDocumentoId?: string,
  user: User
}

@injectable()
class CountDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository,
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}

  async execute({
    search,
    filter,
    tipoDocumentoId,
    user
  }: IRequest): Promise<HttpResponse> {
    const solicitante = await this.solicitanteRepository.getByEmail(user.login)
    
    const documentosDigitaisCount = await this.documentoDigitalRepository.count(
      search,
      filter,
      tipoDocumentoId,
      user,
      solicitante
    )

    return documentosDigitaisCount
  }
}

export { CountDocumentoDigitalUseCase }
