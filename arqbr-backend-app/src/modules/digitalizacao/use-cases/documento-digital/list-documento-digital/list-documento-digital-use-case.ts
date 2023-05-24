import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { IDocumentoDigitalDTO } from '@modules/digitalizacao/dtos/i-documento-digital-dto';
import { User } from '@modules/security/infra/typeorm/entities/user';
import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: any
  tipoDocumentoId?: string,
  user?: User,
  solicitante?: Solicitante
}

interface ResponseProps {
  items: IDocumentoDigitalDTO[],
  hasNext: boolean
}

@injectable()
class ListDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter,
    tipoDocumentoId,
    user,
    solicitante
  }: IRequest): Promise<ResponseProps> {
    const documentosDigitais = await this.documentoDigitalRepository.list(
      search,
      page,
      rowsPerPage,
      order,
      filter,
      tipoDocumentoId,
      user,
      solicitante
    )

    const countDocumentosDigitais = await this.documentoDigitalRepository.count(
      search,
      filter,
      tipoDocumentoId,
      user,
      solicitante
    )

    const numeroDocumentoDigital = page * rowsPerPage

    const documentosDigitaisResponse = {
      items: documentosDigitais.data,
      hasNext: numeroDocumentoDigital < countDocumentosDigitais.data.count
    }

    return documentosDigitaisResponse
  }
}

export { ListDocumentoDigitalUseCase }
