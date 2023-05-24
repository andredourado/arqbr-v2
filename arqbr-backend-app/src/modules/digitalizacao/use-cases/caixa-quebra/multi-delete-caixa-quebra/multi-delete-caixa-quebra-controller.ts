import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteCaixaQuebraUseCase } from './multi-delete-caixa-quebra-use-case'
import { ListCaixaQuebraUseCase } from '../list-caixa-quebra/list-caixa-quebra-use-case'

class MultiDeleteCaixaQuebraController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteCaixaQuebraUseCase = container.resolve(MultiDeleteCaixaQuebraUseCase)
    await multiDeleteCaixaQuebraUseCase.execute(ids)


    // restore list with updated records

    const listCaixaQuebraUseCase = container.resolve(ListCaixaQuebraUseCase)
    const caixasQuebras = await listCaixaQuebraUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(caixasQuebras)
  }
}

export { MultiDeleteCaixaQuebraController }
