import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteTipoAfastamentoUseCase } from './multi-delete-tipo-afastamento-use-case'
import { ListTipoAfastamentoUseCase } from '../list-tipo-afastamento/list-tipo-afastamento-use-case'

class MultiDeleteTipoAfastamentoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteTipoAfastamentoUseCase = container.resolve(MultiDeleteTipoAfastamentoUseCase)
    await multiDeleteTipoAfastamentoUseCase.execute(ids)


    // restore list with updated records

    const listTipoAfastamentoUseCase = container.resolve(ListTipoAfastamentoUseCase)
    const tiposAfastamento = await listTipoAfastamentoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(tiposAfastamento)
  }
}

export { MultiDeleteTipoAfastamentoController }
