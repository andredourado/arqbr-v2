import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectTimeColetaUseCase } from './id-select-time-coleta-use-case'

class IdSelectTimeColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectTimeColetaUseCase = container.resolve(IdSelectTimeColetaUseCase)

    const timeColeta = await idSelectTimeColetaUseCase.execute({
      id: id as string
    })

    return response.json(timeColeta.data)
  }
}

export { IdSelectTimeColetaController }
