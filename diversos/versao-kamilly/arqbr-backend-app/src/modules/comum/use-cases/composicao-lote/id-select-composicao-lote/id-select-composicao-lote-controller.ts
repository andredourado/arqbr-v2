import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectComposicaoLoteUseCase } from './id-select-composicao-lote-use-case'

class IdSelectComposicaoLoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectComposicaoLoteUseCase = container.resolve(IdSelectComposicaoLoteUseCase)

    const composicaoLote = await idSelectComposicaoLoteUseCase.execute({
      id: id as string
    })

    return response.json(composicaoLote.data)
  }
}

export { IdSelectComposicaoLoteController }
