import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUnidadeSlaUseCase } from './get-unidade-sla-use-case'

class GetUnidadeSlaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getUnidadeSlaUseCase = container.resolve(GetUnidadeSlaUseCase)
    const unidadeSla = await getUnidadeSlaUseCase.execute(id)

    return response.status(unidadeSla.statusCode).json(unidadeSla.data)
  }
}

export { GetUnidadeSlaController }
