import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountVeiculoUseCase } from './count-veiculo-use-case'

class CountVeiculoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countVeiculoUseCase = container.resolve(CountVeiculoUseCase)

    const veiculosCount = await countVeiculoUseCase.execute({
      search: search as string
    })

    return response.status(veiculosCount.statusCode).json(veiculosCount)
  }
}

export { CountVeiculoController }
