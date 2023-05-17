import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { IDocumentoDigitalDTO } from '@modules/digitalizacao/dtos/i-documento-digital-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter: any
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
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const documentosDigitais = await this.documentoDigitalRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countDocumentosDigitais = await this.documentoDigitalRepository.count(
      search
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
