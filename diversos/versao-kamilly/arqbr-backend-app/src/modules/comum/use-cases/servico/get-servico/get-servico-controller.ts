import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetServicoUseCase } from './get-servico-use-case'

class GetServicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getServicoUseCase = container.resolve(GetServicoUseCase)
    const servico = await getServicoUseCase.execute(id)

    return response.status(servico.statusCode).json(servico.data)
  }
}

export { GetServicoController }
