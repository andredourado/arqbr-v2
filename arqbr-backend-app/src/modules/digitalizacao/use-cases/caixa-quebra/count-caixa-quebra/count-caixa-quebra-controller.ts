import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCaixaQuebraUseCase } from './count-caixa-quebra-use-case'

class CountCaixaQuebraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countCaixaQuebraUseCase = container.resolve(CountCaixaQuebraUseCase)

    const caixasQuebrasCount = await countCaixaQuebraUseCase.execute({
      search: search as string
    })

    return response.status(caixasQuebrasCount.statusCode).json(caixasQuebrasCount)
  }
}

export { CountCaixaQuebraController }
