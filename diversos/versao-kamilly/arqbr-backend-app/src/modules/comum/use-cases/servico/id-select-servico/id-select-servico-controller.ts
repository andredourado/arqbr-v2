import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectServicoUseCase } from './id-select-servico-use-case'

class IdSelectServicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectServicoUseCase = container.resolve(IdSelectServicoUseCase)

    const servico = await idSelectServicoUseCase.execute({
      id: id as string
    })

    return response.json(servico.data)
  }
}

export { IdSelectServicoController }
