import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPosicaoUseCase } from './list-posicao-use-case'

class ListPosicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listPosicaoUseCase = container.resolve(ListPosicaoUseCase)

    const posicoes = await listPosicaoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(posicoes)
  }
}

export { ListPosicaoController }
