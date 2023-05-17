import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectVeiculoUseCase } from './id-select-veiculo-use-case'

class IdSelectVeiculoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectVeiculoUseCase = container.resolve(IdSelectVeiculoUseCase)

    const veiculo = await idSelectVeiculoUseCase.execute({
      id: id as string
    })

    return response.json(veiculo.data)
  }
}

export { IdSelectVeiculoController }
