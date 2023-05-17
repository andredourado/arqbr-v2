import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountUnidadeSlaUseCase } from './count-unidade-sla-use-case'

class CountUnidadeSlaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countUnidadeSlaUseCase = container.resolve(CountUnidadeSlaUseCase)

    const unidadesSlaCount = await countUnidadeSlaUseCase.execute({
      search: search as string
    })

    return response.status(unidadesSlaCount.statusCode).json(unidadesSlaCount)
  }
}

export { CountUnidadeSlaController }
