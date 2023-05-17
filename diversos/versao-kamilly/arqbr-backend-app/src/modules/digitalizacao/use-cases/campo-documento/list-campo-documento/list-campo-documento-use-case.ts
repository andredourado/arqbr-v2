import { inject, injectable } from 'tsyringe'
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository'
import { ICampoDocumentoDTO } from '@modules/digitalizacao/dtos/i-campo-documento-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter: any
}

interface ResponseProps {
  items: ICampoDocumentoDTO[],
  hasNext: boolean
}

@injectable()
class ListCampoDocumentoUseCase {
  constructor(
    @inject('CampoDocumentoRepository')
    private campoDocumentoRepository: ICampoDocumentoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const camposDocumento = await this.campoDocumentoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countCamposDocumento = await this.campoDocumentoRepository.count(
      search
    )

    const numeroCampoDocumento = page * rowsPerPage

    const camposDocumentoResponse = {
      items: camposDocumento.data,
      hasNext: numeroCampoDocumento < countCamposDocumento.data.count
    }

    return camposDocumentoResponse
  }
}

export { ListCampoDocumentoUseCase }
