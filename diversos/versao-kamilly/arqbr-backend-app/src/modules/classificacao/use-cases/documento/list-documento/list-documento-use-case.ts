import { inject, injectable } from 'tsyringe'
import { IDocumentoRepository } from '@modules/classificacao/repositories/i-documento-repository'
import { IDocumentoDTO } from '@modules/classificacao/dtos/i-documento-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IDocumentoDTO[],
  hasNext: boolean
}

@injectable()
class ListDocumentoUseCase {
  constructor(
    @inject('DocumentoRepository')
    private documentoRepository: IDocumentoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const documentos = await this.documentoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countDocumentos = await this.documentoRepository.count(
      search
    )

    const numeroDocumento = page * rowsPerPage

    const documentosResponse = {
      items: documentos.data,
      hasNext: numeroDocumento < countDocumentos.data.count
    }

    return documentosResponse
  }
}

export { ListDocumentoUseCase }
