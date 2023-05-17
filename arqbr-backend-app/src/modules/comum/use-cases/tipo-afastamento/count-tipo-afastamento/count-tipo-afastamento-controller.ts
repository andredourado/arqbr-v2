import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountTipoAfastamentoUseCase } from './count-tipo-afastamento-use-case'

class CountTipoAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countTipoAfastamentoUseCase = container.resolve(CountTipoAfastamentoUseCase)

    const tiposAfastamentoCount = await countTipoAfastamentoUseCase.execute({
      search: search as string
    })

    return response.status(tiposAfastamentoCount.statusCode).json(tiposAfastamentoCount)
  }
}

export { CountTipoAfastamentoController }
