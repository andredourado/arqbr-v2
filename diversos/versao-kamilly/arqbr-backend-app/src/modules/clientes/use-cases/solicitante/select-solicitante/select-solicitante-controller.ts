import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectSolicitanteUseCase } from './select-solicitante-use-case'

class SelectSolicitanteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter, departamentoId } = request.query

    const selectSolicitanteUseCase = container.resolve(SelectSolicitanteUseCase)

    const solicitantes = await selectSolicitanteUseCase.execute({
      filter: filter as string,
      departamentoId: departamentoId as string
    })

    return response.json(solicitantes)
  }
}

export { SelectSolicitanteController }
