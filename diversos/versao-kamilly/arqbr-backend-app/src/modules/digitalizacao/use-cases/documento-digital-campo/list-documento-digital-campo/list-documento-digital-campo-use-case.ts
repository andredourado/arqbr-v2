import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { IDocumentoDigitalCampoDTO } from '@modules/digitalizacao/dtos/i-documento-digital-campo-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
  filter: any
}

interface ResponseProps {
  items: IDocumentoDigitalCampoDTO[],
  hasNext: boolean
}

@injectable()
class ListDocumentoDigitalCampoUseCase {
  constructor(
    @inject('DocumentoDigitalCampoRepository')
    private documentoDigitalCampoRepository: IDocumentoDigitalCampoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const documentosDigitaisCampos = await this.documentoDigitalCampoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countDocumentosDigitaisCampos = await this.documentoDigitalCampoRepository.count(
      search
    )

    const numeroDocumentoDigitalCampo = page * rowsPerPage

    const documentosDigitaisCamposResponse = {
      items: documentosDigitaisCampos.data,
      hasNext: numeroDocumentoDigitalCampo < countDocumentosDigitaisCampos.data.count
    }

    return documentosDigitaisCamposResponse
  }
}

export { ListDocumentoDigitalCampoUseCase }
