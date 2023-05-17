import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListVeiculoUseCase } from './list-veiculo-use-case'

class ListVeiculoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listVeiculoUseCase = container.resolve(ListVeiculoUseCase)

    const veiculos = await listVeiculoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(veiculos)
  }
}

export { ListVeiculoController }
