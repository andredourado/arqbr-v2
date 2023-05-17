import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountComposicaoLoteUseCase } from './count-composicao-lote-use-case'

class CountComposicaoLoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countComposicaoLoteUseCase = container.resolve(CountComposicaoLoteUseCase)

    const composicaoLotesCount = await countComposicaoLoteUseCase.execute({
      search: search as string
    })

    return response.status(composicaoLotesCount.statusCode).json(composicaoLotesCount)
  }
}

export { CountComposicaoLoteController }
