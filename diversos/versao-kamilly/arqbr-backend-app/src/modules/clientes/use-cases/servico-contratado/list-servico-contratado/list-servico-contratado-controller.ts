import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListServicoContratadoUseCase } from './list-servico-contratado-use-case'

class ListServicoContratadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listServicoContratadoUseCase = container.resolve(ListServicoContratadoUseCase)

    const servicosContratados = await listServicoContratadoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(servicosContratados)
  }
}

export { ListServicoContratadoController }
