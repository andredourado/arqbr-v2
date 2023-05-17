import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUnidadeSlaUseCase } from './create-unidade-sla-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateUnidadeSlaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      desabilitado
    } = request.body

    const createUnidadeSlaUseCase = container.resolve(CreateUnidadeSlaUseCase)

    const result = await createUnidadeSlaUseCase.execute({
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

export { CreateUnidadeSlaController }
