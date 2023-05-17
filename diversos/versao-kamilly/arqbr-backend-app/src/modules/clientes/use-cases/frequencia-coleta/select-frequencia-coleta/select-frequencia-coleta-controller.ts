import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectFrequenciaColetaUseCase } from './select-frequencia-coleta-use-case'

class SelectFrequenciaColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectFrequenciaColetaUseCase = container.resolve(SelectFrequenciaColetaUseCase)

    const frequenciaColetas = await selectFrequenciaColetaUseCase.execute({
      filter: filter as string,
    })

    return response.json(frequenciaColetas)
  }
}

export { SelectFrequenciaColetaController }
