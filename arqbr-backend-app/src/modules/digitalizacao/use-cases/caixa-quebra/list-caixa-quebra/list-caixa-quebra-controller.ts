import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCaixaQuebraUseCase } from './list-caixa-quebra-use-case'

class ListCaixaQuebraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listCaixaQuebraUseCase = container.resolve(ListCaixaQuebraUseCase)

    const caixasQuebras = await listCaixaQuebraUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(caixasQuebras)
  }
}

export { ListCaixaQuebraController }
