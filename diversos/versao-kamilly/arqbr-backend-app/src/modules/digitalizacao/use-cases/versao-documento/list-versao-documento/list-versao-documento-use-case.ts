import { inject, injectable } from 'tsyringe'
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository'
import { IVersaoDocumentoDTO } from '@modules/digitalizacao/dtos/i-versao-documento-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IVersaoDocumentoDTO[],
  hasNext: boolean
}

@injectable()
class ListVersaoDocumentoUseCase {
  constructor(
    @inject('VersaoDocumentoRepository')
    private versaoDocumentoRepository: IVersaoDocumentoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const versoesDocumento = await this.versaoDocumentoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countVersoesDocumento = await this.versaoDocumentoRepository.count(
      search
    )

    const numeroVersaoDocumento = page * rowsPerPage

    const versoesDocumentoResponse = {
      items: versoesDocumento.data,
      hasNext: numeroVersaoDocumento < countVersoesDocumento.data.count
    }

    return versoesDocumentoResponse
  }
}

export { ListVersaoDocumentoUseCase }
