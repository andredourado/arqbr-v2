import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectUnidadeUseCase } from './id-select-unidade-use-case'

class IdSelectUnidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectUnidadeUseCase = container.resolve(IdSelectUnidadeUseCase)

    const unidade = await idSelectUnidadeUseCase.execute({
      id: id as string
    })

    return response.json(unidade.data)
  }
}

export { IdSelectUnidadeController }
