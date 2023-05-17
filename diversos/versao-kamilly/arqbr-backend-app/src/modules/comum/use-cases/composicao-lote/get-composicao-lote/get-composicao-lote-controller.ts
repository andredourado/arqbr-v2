import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetComposicaoLoteUseCase } from './get-composicao-lote-use-case'

class GetComposicaoLoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getComposicaoLoteUseCase = container.resolve(GetComposicaoLoteUseCase)
    const composicaoLote = await getComposicaoLoteUseCase.execute(id)

    return response.status(composicaoLote.statusCode).json(composicaoLote.data)
  }
}

export { GetComposicaoLoteController }
