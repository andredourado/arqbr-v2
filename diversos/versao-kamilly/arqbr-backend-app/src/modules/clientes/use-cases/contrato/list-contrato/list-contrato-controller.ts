import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListContratoUseCase } from './list-contrato-use-case'

class ListContratoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listContratoUseCase = container.resolve(ListContratoUseCase)

    const contratos = await listContratoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(contratos)
  }
}

export { ListContratoController }
