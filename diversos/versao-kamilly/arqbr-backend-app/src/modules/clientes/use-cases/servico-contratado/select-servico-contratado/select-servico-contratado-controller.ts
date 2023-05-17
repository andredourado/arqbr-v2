import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectServicoContratadoUseCase } from './select-servico-contratado-use-case'

class SelectServicoContratadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectServicoContratadoUseCase = container.resolve(SelectServicoContratadoUseCase)

    const servicosContratados = await selectServicoContratadoUseCase.execute({
      filter: filter as string,
    })

    return response.json(servicosContratados)
  }
}

export { SelectServicoContratadoController }
