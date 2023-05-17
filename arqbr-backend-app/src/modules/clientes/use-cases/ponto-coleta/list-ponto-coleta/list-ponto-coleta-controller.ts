import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPontoColetaUseCase } from './list-ponto-coleta-use-case'

class ListPontoColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listPontoColetaUseCase = container.resolve(ListPontoColetaUseCase)

    const pontosColeta = await listPontoColetaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(pontosColeta)
  }
}

export { ListPontoColetaController }
