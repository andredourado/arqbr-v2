import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListComposicaoLoteUseCase } from './list-composicao-lote-use-case'

class ListComposicaoLoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listComposicaoLoteUseCase = container.resolve(ListComposicaoLoteUseCase)

    const composicaoLotes = await listComposicaoLoteUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(composicaoLotes)
  }
}

export { ListComposicaoLoteController }
