import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountEntregadorUseCase } from './count-entregador-use-case'

class CountEntregadorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countEntregadorUseCase = container.resolve(CountEntregadorUseCase)

    const entregadoresCount = await countEntregadorUseCase.execute({
      search: search as string
    })

    return response.status(entregadoresCount.statusCode).json(entregadoresCount)
  }
}

export { CountEntregadorController }
