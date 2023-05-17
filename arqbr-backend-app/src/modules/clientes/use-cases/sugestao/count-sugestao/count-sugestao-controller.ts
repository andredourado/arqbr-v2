import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountSugestaoUseCase } from './count-sugestao-use-case'

class CountSugestaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countSugestaoUseCase = container.resolve(CountSugestaoUseCase)

    const sugestoesCount = await countSugestaoUseCase.execute({
      search: search as string
    })

    return response.status(sugestoesCount.statusCode).json(sugestoesCount)
  }
}

export { CountSugestaoController }
