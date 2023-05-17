import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectEscalaUseCase } from './select-escala-use-case'

class SelectEscalaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectEscalaUseCase = container.resolve(SelectEscalaUseCase)

    const escalas = await selectEscalaUseCase.execute({
      filter: filter as string,
    })

    return response.json(escalas)
  }
}

export { SelectEscalaController }
