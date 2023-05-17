import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPessoaUseCase } from './list-pessoa-use-case'

class ListPessoaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listPessoaUseCase = container.resolve(ListPessoaUseCase)

    const pessoas = await listPessoaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(pessoas)
  }
}

export { ListPessoaController }
