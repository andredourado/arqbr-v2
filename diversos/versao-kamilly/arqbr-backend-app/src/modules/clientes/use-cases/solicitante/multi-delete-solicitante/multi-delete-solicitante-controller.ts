import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteSolicitanteUseCase } from './multi-delete-solicitante-use-case'
import { ListSolicitanteUseCase } from '../list-solicitante/list-solicitante-use-case'

class MultiDeleteSolicitanteController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteSolicitanteUseCase = container.resolve(MultiDeleteSolicitanteUseCase)
    await multiDeleteSolicitanteUseCase.execute(ids)


    // restore list with updated records

    const listSolicitanteUseCase = container.resolve(ListSolicitanteUseCase)
    const solicitantes = await listSolicitanteUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(solicitantes)
  }
}

export { MultiDeleteSolicitanteController }
