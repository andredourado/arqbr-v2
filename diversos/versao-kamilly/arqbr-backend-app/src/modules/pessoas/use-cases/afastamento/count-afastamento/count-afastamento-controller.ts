import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountAfastamentoUseCase } from './count-afastamento-use-case'

class CountAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countAfastamentoUseCase = container.resolve(CountAfastamentoUseCase)

    const afastamentosCount = await countAfastamentoUseCase.execute({
      search: search as string
    })

    return response.status(afastamentosCount.statusCode).json(afastamentosCount)
  }
}

export { CountAfastamentoController }
