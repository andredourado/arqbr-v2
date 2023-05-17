import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUnidadeSlaUseCase } from './update-unidade-sla-use-case'

class UpdateUnidadeSlaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateUnidadeSlaUseCase = container.resolve(UpdateUnidadeSlaUseCase)

    const result = await updateUnidadeSlaUseCase.execute({
        id,
        descricao,
        desabilitado
      })
      .then(unidadeSlaResult => {
        return unidadeSlaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateUnidadeSlaController }
