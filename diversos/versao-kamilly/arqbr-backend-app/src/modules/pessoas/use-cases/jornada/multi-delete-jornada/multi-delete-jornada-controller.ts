import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteJornadaUseCase } from './multi-delete-jornada-use-case'
import { ListJornadaUseCase } from '../list-jornada/list-jornada-use-case'

class MultiDeleteJornadaController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteJornadaUseCase = container.resolve(MultiDeleteJornadaUseCase)
    await multiDeleteJornadaUseCase.execute(ids)


    // restore list with updated records

    const listJornadaUseCase = container.resolve(ListJornadaUseCase)
    const jornadas = await listJornadaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(jornadas)
  }
}

export { MultiDeleteJornadaController }
