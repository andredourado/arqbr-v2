import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteEscalaUseCase } from './multi-delete-escala-use-case'
import { ListEscalaUseCase } from '../list-escala/list-escala-use-case'

class MultiDeleteEscalaController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteEscalaUseCase = container.resolve(MultiDeleteEscalaUseCase)
    await multiDeleteEscalaUseCase.execute(ids)


    // restore list with updated records

    const listEscalaUseCase = container.resolve(ListEscalaUseCase)
    const escalas = await listEscalaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(escalas)
  }
}

export { MultiDeleteEscalaController }
