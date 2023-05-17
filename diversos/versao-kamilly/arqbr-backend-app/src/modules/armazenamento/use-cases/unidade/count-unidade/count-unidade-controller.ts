import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountUnidadeUseCase } from './count-unidade-use-case'

class CountUnidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countUnidadeUseCase = container.resolve(CountUnidadeUseCase)

    const unidadesCount = await countUnidadeUseCase.execute({
      search: search as string
    })

    return response.status(unidadesCount.statusCode).json(unidadesCount)
  }
}

export { CountUnidadeController }
