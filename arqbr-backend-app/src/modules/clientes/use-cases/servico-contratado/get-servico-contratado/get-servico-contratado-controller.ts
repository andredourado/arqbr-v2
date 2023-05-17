import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetServicoContratadoUseCase } from './get-servico-contratado-use-case'

class GetServicoContratadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getServicoContratadoUseCase = container.resolve(GetServicoContratadoUseCase)
    const servicoContratado = await getServicoContratadoUseCase.execute(id)

    return response.status(servicoContratado.statusCode).json(servicoContratado.data)
  }
}

export { GetServicoContratadoController }
