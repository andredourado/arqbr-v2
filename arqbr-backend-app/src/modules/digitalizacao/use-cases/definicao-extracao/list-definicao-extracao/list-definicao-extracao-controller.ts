import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListDefinicaoExtracaoUseCase } from './list-definicao-extracao-use-case'

class ListDefinicaoExtracaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listDefinicaoExtracaoUseCase = container.resolve(ListDefinicaoExtracaoUseCase)

    const definicoesExtracao = await listDefinicaoExtracaoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(definicoesExtracao)
  }
}

export { ListDefinicaoExtracaoController }
