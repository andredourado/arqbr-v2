import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateVeiculoUseCase } from './create-veiculo-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateVeiculoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      capacidade,
      desabilitado
    } = request.body

    const createVeiculoUseCase = container.resolve(CreateVeiculoUseCase)

    const result = await createVeiculoUseCase.execute({
        descricao,
        capacidade,
        desabilitado
      })
      .then(veiculoResult => {
        return veiculoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateVeiculoController }
