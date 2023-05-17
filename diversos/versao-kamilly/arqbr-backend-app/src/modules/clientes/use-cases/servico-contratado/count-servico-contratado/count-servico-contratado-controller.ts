import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountServicoContratadoUseCase } from './count-servico-contratado-use-case'

class CountServicoContratadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countServicoContratadoUseCase = container.resolve(CountServicoContratadoUseCase)

    const servicosContratadosCount = await countServicoContratadoUseCase.execute({
      search: search as string
    })

    return response.status(servicosContratadosCount.statusCode).json(servicosContratadosCount)
  }
}

export { CountServicoContratadoController }
