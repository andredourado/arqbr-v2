import { inject, injectable } from 'tsyringe'
import { IRastreamentoDocumentoRepository } from '@modules/classificacao/repositories/i-rastreamento-documento-repository'
import { IRastreamentoDocumentoDTO } from '@modules/classificacao/dtos/i-rastreamento-documento-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IRastreamentoDocumentoDTO[],
  hasNext: boolean
}

@injectable()
class ListRastreamentoDocumentoUseCase {
  constructor(
    @inject('RastreamentoDocumentoRepository')
    private rastreamentoDocumentoRepository: IRastreamentoDocumentoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const rastreamentoDocumentos = await this.rastreamentoDocumentoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countRastreamentoDocumentos = await this.rastreamentoDocumentoRepository.count(
      search
    )

    const numeroRastreamentoDocumento = page * rowsPerPage

    const rastreamentoDocumentosResponse = {
      items: rastreamentoDocumentos.data,
      hasNext: numeroRastreamentoDocumento < countRastreamentoDocumentos.data.count
    }

    return rastreamentoDocumentosResponse
  }
}

export { ListRastreamentoDocumentoUseCase }
