import { inject, injectable } from 'tsyringe'
import { ITipoDocumentoRepository } from '@modules/digitalizacao/repositories/i-tipo-documento-repository'
import { ITipoDocumentoDTO } from '@modules/digitalizacao/dtos/i-tipo-documento-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ITipoDocumentoDTO[],
  hasNext: boolean
}

@injectable()
class ListTipoDocumentoUseCase {
  constructor(
    @inject('TipoDocumentoRepository')
    private tipoDocumentoRepository: ITipoDocumentoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const tiposDocumento = await this.tipoDocumentoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countTiposDocumento = await this.tipoDocumentoRepository.count(
      search,
      filter
    )

    const numeroTipoDocumento = page * rowsPerPage

    const tiposDocumentoResponse = {
      items: tiposDocumento.data,
      hasNext: numeroTipoDocumento < countTiposDocumento.data.count
    }

    return tiposDocumentoResponse
  }
}

export { ListTipoDocumentoUseCase }
