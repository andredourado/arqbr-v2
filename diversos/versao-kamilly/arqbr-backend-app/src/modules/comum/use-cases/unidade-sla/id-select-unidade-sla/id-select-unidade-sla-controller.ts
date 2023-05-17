import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectUnidadeSlaUseCase } from './id-select-unidade-sla-use-case'

class IdSelectUnidadeSlaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectUnidadeSlaUseCase = container.resolve(IdSelectUnidadeSlaUseCase)

    const unidadeSla = await idSelectUnidadeSlaUseCase.execute({
      id: id as string
    })

    return response.json(unidadeSla.data)
  }
}

export { IdSelectUnidadeSlaController }
