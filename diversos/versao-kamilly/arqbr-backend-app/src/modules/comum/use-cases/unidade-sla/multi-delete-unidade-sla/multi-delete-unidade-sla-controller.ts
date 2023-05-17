import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteUnidadeSlaUseCase } from './multi-delete-unidade-sla-use-case'
import { ListUnidadeSlaUseCase } from '../list-unidade-sla/list-unidade-sla-use-case'

class MultiDeleteUnidadeSlaController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteUnidadeSlaUseCase = container.resolve(MultiDeleteUnidadeSlaUseCase)
    await multiDeleteUnidadeSlaUseCase.execute(ids)


    // restore list with updated records

    const listUnidadeSlaUseCase = container.resolve(ListUnidadeSlaUseCase)
    const unidadesSla = await listUnidadeSlaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(unidadesSla)
  }
}

export { MultiDeleteUnidadeSlaController }
