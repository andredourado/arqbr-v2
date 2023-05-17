import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetAfastamentoUseCase } from './get-afastamento-use-case'

class GetAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getAfastamentoUseCase = container.resolve(GetAfastamentoUseCase)
    const afastamento = await getAfastamentoUseCase.execute(id)

    return response.status(afastamento.statusCode).json(afastamento.data)
  }
}

export { GetAfastamentoController }
