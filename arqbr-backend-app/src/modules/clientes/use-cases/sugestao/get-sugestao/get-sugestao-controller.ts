import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetSugestaoUseCase } from './get-sugestao-use-case'

class GetSugestaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getSugestaoUseCase = container.resolve(GetSugestaoUseCase)
    const sugestao = await getSugestaoUseCase.execute(id)

    return response.status(sugestao.statusCode).json(sugestao.data)
  }
}

export { GetSugestaoController }
