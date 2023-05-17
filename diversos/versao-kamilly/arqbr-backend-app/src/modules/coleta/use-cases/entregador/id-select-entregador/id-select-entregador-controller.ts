import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectEntregadorUseCase } from './id-select-entregador-use-case'

class IdSelectEntregadorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectEntregadorUseCase = container.resolve(IdSelectEntregadorUseCase)

    const entregador = await idSelectEntregadorUseCase.execute({
      id: id as string
    })

    return response.json(entregador.data)
  }
}

export { IdSelectEntregadorController }
