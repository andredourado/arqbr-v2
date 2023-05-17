import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePlantaUseCase } from './create-planta-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePlantaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      unidadeId,
      nome,
      quantidadePosicoes,
      desabilitado
    } = request.body

    const createPlantaUseCase = container.resolve(CreatePlantaUseCase)

    const result = await createPlantaUseCase.execute({
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

export { CreatePlantaController }
