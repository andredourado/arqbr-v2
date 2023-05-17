import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteColetaUseCase } from './multi-delete-coleta-use-case'
import { ListColetaUseCase } from '../list-coleta/list-coleta-use-case'

class MultiDeleteColetaController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteColetaUseCase = container.resolve(MultiDeleteColetaUseCase)
    await multiDeleteColetaUseCase.execute(ids)


    // restore list with updated records

    const listColetaUseCase = container.resolve(ListColetaUseCase)
    const coletas = await listColetaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(coletas)
  }
}

export { MultiDeleteColetaController }
