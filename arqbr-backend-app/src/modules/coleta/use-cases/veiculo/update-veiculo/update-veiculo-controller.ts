import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateVeiculoUseCase } from './update-veiculo-use-case'

class UpdateVeiculoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateVeiculoUseCase = container.resolve(UpdateVeiculoUseCase)

    const result = await updateVeiculoUseCase.execute({
        id,
        descricao,
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

export { UpdateVeiculoController }
