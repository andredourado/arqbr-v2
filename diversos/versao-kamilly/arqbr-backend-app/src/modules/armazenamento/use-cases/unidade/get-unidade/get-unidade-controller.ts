import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUnidadeUseCase } from './get-unidade-use-case'

class GetUnidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getUnidadeUseCase = container.resolve(GetUnidadeUseCase)
    const unidade = await getUnidadeUseCase.execute(id)

    return response.status(unidade.statusCode).json(unidade.data)
  }
}

export { GetUnidadeController }
