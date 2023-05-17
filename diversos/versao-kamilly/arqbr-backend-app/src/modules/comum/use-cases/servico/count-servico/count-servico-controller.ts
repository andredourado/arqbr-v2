import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountServicoUseCase } from './count-servico-use-case'

class CountServicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countServicoUseCase = container.resolve(CountServicoUseCase)

    const servicosCount = await countServicoUseCase.execute({
      search: search as string
    })

    return response.status(servicosCount.statusCode).json(servicosCount)
  }
}

export { CountServicoController }
