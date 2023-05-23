import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCaixaQuebraUseCase } from './get-caixa-quebra-use-case'

class GetCaixaQuebraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getCaixaQuebraUseCase = container.resolve(GetCaixaQuebraUseCase)
    const caixaQuebra = await getCaixaQuebraUseCase.execute(id)

    return response.status(caixaQuebra.statusCode).json(caixaQuebra.data)
  }
}

export { GetCaixaQuebraController }
