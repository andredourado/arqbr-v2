import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectJornadaUseCase } from './select-jornada-use-case'

class SelectJornadaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectJornadaUseCase = container.resolve(SelectJornadaUseCase)

    const jornadas = await selectJornadaUseCase.execute({
      filter: filter as string,
    })

    return response.json(jornadas)
  }
}

export { SelectJornadaController }
