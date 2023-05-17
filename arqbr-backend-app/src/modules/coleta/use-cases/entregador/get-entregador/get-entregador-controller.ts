import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetEntregadorUseCase } from './get-entregador-use-case'

class GetEntregadorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getEntregadorUseCase = container.resolve(GetEntregadorUseCase)
    const entregador = await getEntregadorUseCase.execute(id)

    return response.status(entregador.statusCode).json(entregador.data)
  }
}

export { GetEntregadorController }
