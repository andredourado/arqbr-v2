import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateServicoContratadoUseCase } from './create-servico-contratado-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateServicoContratadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      descricao,
      sla,
      desabilitado
    } = request.body

    const createServicoContratadoUseCase = container.resolve(CreateServicoContratadoUseCase)

    const result = await createServicoContratadoUseCase.execute({
        clienteId,
        descricao,
        sla,
        desabilitado
      })
      .then(servicoContratadoResult => {
        return servicoContratadoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateServicoContratadoController }
