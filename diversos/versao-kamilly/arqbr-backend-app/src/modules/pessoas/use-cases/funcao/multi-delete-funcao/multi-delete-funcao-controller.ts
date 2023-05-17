import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteFuncaoUseCase } from './multi-delete-funcao-use-case'
import { ListFuncaoUseCase } from '../list-funcao/list-funcao-use-case'

class MultiDeleteFuncaoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteFuncaoUseCase = container.resolve(MultiDeleteFuncaoUseCase)
    await multiDeleteFuncaoUseCase.execute(ids)


    // restore list with updated records

    const listFuncaoUseCase = container.resolve(ListFuncaoUseCase)
    const funcoes = await listFuncaoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(funcoes)
  }
}

export { MultiDeleteFuncaoController }
