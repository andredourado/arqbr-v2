import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountFuncaoUseCase } from './count-funcao-use-case'

class CountFuncaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countFuncaoUseCase = container.resolve(CountFuncaoUseCase)

    const funcoesCount = await countFuncaoUseCase.execute({
      search: search as string
    })

    return response.status(funcoesCount.statusCode).json(funcoesCount)
  }
}

export { CountFuncaoController }
