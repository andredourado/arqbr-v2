import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteUnidadeUseCase } from './multi-delete-unidade-use-case'
import { ListUnidadeUseCase } from '../list-unidade/list-unidade-use-case'

class MultiDeleteUnidadeController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteUnidadeUseCase = container.resolve(MultiDeleteUnidadeUseCase)
    await multiDeleteUnidadeUseCase.execute(ids)


    // restore list with updated records

    const listUnidadeUseCase = container.resolve(ListUnidadeUseCase)
    const unidades = await listUnidadeUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(unidades)
  }
}

export { MultiDeleteUnidadeController }
