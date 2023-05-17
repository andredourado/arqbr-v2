import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetVeiculoUseCase } from './get-veiculo-use-case'

class GetVeiculoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getVeiculoUseCase = container.resolve(GetVeiculoUseCase)
    const veiculo = await getVeiculoUseCase.execute(id)

    return response.status(veiculo.statusCode).json(veiculo.data)
  }
}

export { GetVeiculoController }
