import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectVeiculoUseCase } from './select-veiculo-use-case'

class SelectVeiculoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectVeiculoUseCase = container.resolve(SelectVeiculoUseCase)

    const veiculos = await selectVeiculoUseCase.execute({
      filter: filter as string,
    })

    return response.json(veiculos)
  }
}

export { SelectVeiculoController }
