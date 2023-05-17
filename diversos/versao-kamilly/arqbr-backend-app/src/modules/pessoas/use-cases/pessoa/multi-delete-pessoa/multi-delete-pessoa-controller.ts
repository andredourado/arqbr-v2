import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePessoaUseCase } from './multi-delete-pessoa-use-case'
import { ListPessoaUseCase } from '../list-pessoa/list-pessoa-use-case'

class MultiDeletePessoaController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePessoaUseCase = container.resolve(MultiDeletePessoaUseCase)
    await multiDeletePessoaUseCase.execute(ids)


    // restore list with updated records

    const listPessoaUseCase = container.resolve(ListPessoaUseCase)
    const pessoas = await listPessoaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(pessoas)
  }
}

export { MultiDeletePessoaController }
