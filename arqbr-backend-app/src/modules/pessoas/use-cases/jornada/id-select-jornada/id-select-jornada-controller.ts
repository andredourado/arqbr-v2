import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectJornadaUseCase } from './id-select-jornada-use-case'

class IdSelectJornadaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectJornadaUseCase = container.resolve(IdSelectJornadaUseCase)

    const jornada = await idSelectJornadaUseCase.execute({
      id: id as string
    })

    return response.json(jornada.data)
  }
}

export { IdSelectJornadaController }
