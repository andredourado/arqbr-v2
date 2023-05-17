import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListRastreamentoDocumentoUseCase } from './list-rastreamento-documento-use-case'

class ListRastreamentoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listRastreamentoDocumentoUseCase = container.resolve(ListRastreamentoDocumentoUseCase)

    const rastreamentoDocumentos = await listRastreamentoDocumentoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(rastreamentoDocumentos)
  }
}

export { ListRastreamentoDocumentoController }
