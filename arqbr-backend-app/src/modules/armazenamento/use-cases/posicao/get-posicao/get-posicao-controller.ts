import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPosicaoUseCase } from './get-posicao-use-case'

class GetPosicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPosicaoUseCase = container.resolve(GetPosicaoUseCase)
    const posicao = await getPosicaoUseCase.execute(id)

    return response.status(posicao.statusCode).json(posicao.data)
  }
}

export { GetPosicaoController }
