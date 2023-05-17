import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePlantaUseCase } from './update-planta-use-case'

class UpdatePlantaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      unidadeId,
      nome,
      quantidadePosicoes,
      desabilitado
    } = request.body

    const { id } = request.params

    const updatePlantaUseCase = container.resolve(UpdatePlantaUseCase)

    const result = await updatePlantaUseCase.execute({
        id,
        unidadeId,
        nome,
        quantidadePosicoes,
        desabilitado
      })
      .then(plantaResult => {
        return plantaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdatePlantaController }
