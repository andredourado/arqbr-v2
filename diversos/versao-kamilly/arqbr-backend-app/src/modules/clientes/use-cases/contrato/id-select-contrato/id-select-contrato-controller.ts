import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectContratoUseCase } from './id-select-contrato-use-case'

class IdSelectContratoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectContratoUseCase = container.resolve(IdSelectContratoUseCase)

    const contrato = await idSelectContratoUseCase.execute({
      id: id as string
    })

    return response.json(contrato.data)
  }
}

export { IdSelectContratoController }
