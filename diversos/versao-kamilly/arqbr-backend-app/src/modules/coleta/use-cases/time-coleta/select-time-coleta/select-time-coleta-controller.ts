import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectTimeColetaUseCase } from './select-time-coleta-use-case'

class SelectTimeColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectTimeColetaUseCase = container.resolve(SelectTimeColetaUseCase)

    const timesColeta = await selectTimeColetaUseCase.execute({
      filter: filter as string,
    })

    return response.json(timesColeta)
  }
}

export { SelectTimeColetaController }
