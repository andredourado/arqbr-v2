import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectSolicitanteUseCase } from './id-select-solicitante-use-case'

class IdSelectSolicitanteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectSolicitanteUseCase = container.resolve(IdSelectSolicitanteUseCase)

    const solicitante = await idSelectSolicitanteUseCase.execute({
      id: id as string
    })

    return response.json(solicitante.data)
  }
}

export { IdSelectSolicitanteController }
