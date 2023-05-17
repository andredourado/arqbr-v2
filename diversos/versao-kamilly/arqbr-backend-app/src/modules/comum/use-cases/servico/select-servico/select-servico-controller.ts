import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectServicoUseCase } from './select-servico-use-case'

class SelectServicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectServicoUseCase = container.resolve(SelectServicoUseCase)

    const servicos = await selectServicoUseCase.execute({
      filter: filter as string,
    })

    return response.json(servicos)
  }
}

export { SelectServicoController }
