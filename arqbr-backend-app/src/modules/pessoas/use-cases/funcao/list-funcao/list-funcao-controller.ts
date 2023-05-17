import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListFuncaoUseCase } from './list-funcao-use-case'

class ListFuncaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listFuncaoUseCase = container.resolve(ListFuncaoUseCase)

    const funcoes = await listFuncaoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(funcoes)
  }
}

export { ListFuncaoController }
