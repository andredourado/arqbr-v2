import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteStatusUseCase } from './multi-delete-status-use-case'
import { ListStatusUseCase } from '../list-status/list-status-use-case'

class MultiDeleteStatusController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteStatusUseCase = container.resolve(MultiDeleteStatusUseCase)
    await multiDeleteStatusUseCase.execute(ids)


    // restore list with updated records

    const listStatusUseCase = container.resolve(ListStatusUseCase)
    const statuses = await listStatusUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(statuses)
  }
}

export { MultiDeleteStatusController }
