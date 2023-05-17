import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetSolicitanteUseCase } from './get-solicitante-use-case'

class GetSolicitanteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getSolicitanteUseCase = container.resolve(GetSolicitanteUseCase)
    const solicitante = await getSolicitanteUseCase.execute(id)

    return response.status(solicitante.statusCode).json(solicitante.data)
  }
}

export { GetSolicitanteController }
