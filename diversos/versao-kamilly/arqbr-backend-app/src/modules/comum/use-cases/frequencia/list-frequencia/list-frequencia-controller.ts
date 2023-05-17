import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListFrequenciaUseCase } from './list-frequencia-use-case'

class ListFrequenciaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listFrequenciaUseCase = container.resolve(ListFrequenciaUseCase)

    const frequencias = await listFrequenciaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(frequencias)
  }
}

export { ListFrequenciaController }
