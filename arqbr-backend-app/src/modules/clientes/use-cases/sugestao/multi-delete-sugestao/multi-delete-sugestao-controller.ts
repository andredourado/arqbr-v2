import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteSugestaoUseCase } from './multi-delete-sugestao-use-case'
import { ListSugestaoUseCase } from '../list-sugestao/list-sugestao-use-case'

class MultiDeleteSugestaoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteSugestaoUseCase = container.resolve(MultiDeleteSugestaoUseCase)
    await multiDeleteSugestaoUseCase.execute(ids)


    // restore list with updated records

    const listSugestaoUseCase = container.resolve(ListSugestaoUseCase)
    const sugestoes = await listSugestaoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(sugestoes)
  }
}

export { MultiDeleteSugestaoController }
