import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteTimeColetaUseCase } from './multi-delete-time-coleta-use-case'
import { ListTimeColetaUseCase } from '../list-time-coleta/list-time-coleta-use-case'

class MultiDeleteTimeColetaController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteTimeColetaUseCase = container.resolve(MultiDeleteTimeColetaUseCase)
    await multiDeleteTimeColetaUseCase.execute(ids)


    // restore list with updated records

    const listTimeColetaUseCase = container.resolve(ListTimeColetaUseCase)
    const timesColeta = await listTimeColetaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(timesColeta)
  }
}

export { MultiDeleteTimeColetaController }
