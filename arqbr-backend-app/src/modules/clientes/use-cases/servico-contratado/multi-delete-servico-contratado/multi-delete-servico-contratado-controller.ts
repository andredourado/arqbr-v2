import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteServicoContratadoUseCase } from './multi-delete-servico-contratado-use-case'
import { ListServicoContratadoUseCase } from '../list-servico-contratado/list-servico-contratado-use-case'

class MultiDeleteServicoContratadoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteServicoContratadoUseCase = container.resolve(MultiDeleteServicoContratadoUseCase)
    await multiDeleteServicoContratadoUseCase.execute(ids)


    // restore list with updated records

    const listServicoContratadoUseCase = container.resolve(ListServicoContratadoUseCase)
    const servicosContratados = await listServicoContratadoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(servicosContratados)
  }
}

export { MultiDeleteServicoContratadoController }
