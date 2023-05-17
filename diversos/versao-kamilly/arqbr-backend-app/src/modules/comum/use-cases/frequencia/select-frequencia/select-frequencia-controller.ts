import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectFrequenciaUseCase } from './select-frequencia-use-case'

class SelectFrequenciaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectFrequenciaUseCase = container.resolve(SelectFrequenciaUseCase)

    const frequencias = await selectFrequenciaUseCase.execute({
      filter: filter as string,
    })

    return response.json(frequencias)
  }
}

export { SelectFrequenciaController }
