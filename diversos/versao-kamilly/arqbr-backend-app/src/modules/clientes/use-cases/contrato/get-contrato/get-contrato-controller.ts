import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetContratoUseCase } from './get-contrato-use-case'

class GetContratoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getContratoUseCase = container.resolve(GetContratoUseCase)
    const contrato = await getContratoUseCase.execute(id)

    return response.status(contrato.statusCode).json(contrato.data)
  }
}

export { GetContratoController }
