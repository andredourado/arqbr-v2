import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { IDocumentoDigitalDTO, ISolicitacao } from '@modules/digitalizacao/dtos/i-documento-digital-dto';
import { User } from '@modules/security/infra/typeorm/entities/user';
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository';
import { HttpResponse } from '@shared/helpers';

interface IRequest {
  rowsPerPage?: number,
  user: User
}

interface ResponseProps {
  items: IDocumentoDigitalDTO[],
  hasNext: boolean
}

@injectable()
class ListSolicitacaoUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository,
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) { }

  async execute({
    rowsPerPage,
    user
  }: IRequest): Promise<HttpResponse<ISolicitacao[]>> {
    const solicitante = await this.solicitanteRepository.getByEmail(user.login)

    if (!user.isAdmin && !user.isSuperUser && !solicitante) return

    return await this.documentoDigitalRepository.getDocumentosSolicitados(rowsPerPage)
  }
}

export { ListSolicitacaoUseCase }
