import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteAfastamentoUseCase } from './multi-delete-afastamento-use-case'
import { ListAfastamentoUseCase } from '../list-afastamento/list-afastamento-use-case'

class MultiDeleteAfastamentoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteAfastamentoUseCase = container.resolve(MultiDeleteAfastamentoUseCase)
    await multiDeleteAfastamentoUseCase.execute(ids)


    // restore list with updated records

    const listAfastamentoUseCase = container.resolve(ListAfastamentoUseCase)
    const afastamentos = await listAfastamentoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(afastamentos)
  }
}

export { MultiDeleteAfastamentoController }
