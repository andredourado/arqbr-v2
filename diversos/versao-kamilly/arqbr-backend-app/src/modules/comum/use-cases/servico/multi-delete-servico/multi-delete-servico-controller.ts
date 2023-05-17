import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteServicoUseCase } from './multi-delete-servico-use-case'
import { ListServicoUseCase } from '../list-servico/list-servico-use-case'

class MultiDeleteServicoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteServicoUseCase = container.resolve(MultiDeleteServicoUseCase)
    await multiDeleteServicoUseCase.execute(ids)


    // restore list with updated records

    const listServicoUseCase = container.resolve(ListServicoUseCase)
    const servicos = await listServicoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(servicos)
  }
}

export { MultiDeleteServicoController }
