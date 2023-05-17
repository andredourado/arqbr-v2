import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListFrequenciaColetaUseCase } from './list-frequencia-coleta-use-case'

class ListFrequenciaColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listFrequenciaColetaUseCase = container.resolve(ListFrequenciaColetaUseCase)

    const frequenciaColetas = await listFrequenciaColetaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(frequenciaColetas)
  }
}

export { ListFrequenciaColetaController }
