import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountDefinicaoExtracaoUseCase } from './count-definicao-extracao-use-case'

class CountDefinicaoExtracaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countDefinicaoExtracaoUseCase = container.resolve(CountDefinicaoExtracaoUseCase)

    const definicaoExtracaoCount = await countDefinicaoExtracaoUseCase.execute({
      search: search as string
    })

    return response.status(definicaoExtracaoCount.statusCode).json(definicaoExtracaoCount)
  }
}

export { CountDefinicaoExtracaoController }
