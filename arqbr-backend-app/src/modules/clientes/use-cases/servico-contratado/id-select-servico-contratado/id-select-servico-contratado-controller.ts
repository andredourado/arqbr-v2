import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectServicoContratadoUseCase } from './id-select-servico-contratado-use-case'

class IdSelectServicoContratadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectServicoContratadoUseCase = container.resolve(IdSelectServicoContratadoUseCase)

    const servicoContratado = await idSelectServicoContratadoUseCase.execute({
      id: id as string
    })

    return response.json(servicoContratado.data)
  }
}

export { IdSelectServicoContratadoController }
