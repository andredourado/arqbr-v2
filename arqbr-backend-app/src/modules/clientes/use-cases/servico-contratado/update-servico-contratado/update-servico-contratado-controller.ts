import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateServicoContratadoUseCase } from './update-servico-contratado-use-case'

class UpdateServicoContratadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      descricao,
      sla,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateServicoContratadoUseCase = container.resolve(UpdateServicoContratadoUseCase)

    const result = await updateServicoContratadoUseCase.execute({
        id,
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

export { UpdateServicoContratadoController }
