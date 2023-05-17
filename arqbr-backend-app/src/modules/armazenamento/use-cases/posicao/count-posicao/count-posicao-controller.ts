import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPosicaoUseCase } from './count-posicao-use-case'

class CountPosicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPosicaoUseCase = container.resolve(CountPosicaoUseCase)

    const posicoesCount = await countPosicaoUseCase.execute({
      search: search as string
    })

    return response.status(posicoesCount.statusCode).json(posicoesCount)
  }
}

export { CountPosicaoController }
