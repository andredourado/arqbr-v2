import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetDefinicaoExtracaoUseCase } from './get-definicao-extracao-use-case'

class GetDefinicaoExtracaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getDefinicaoExtracaoUseCase = container.resolve(GetDefinicaoExtracaoUseCase)
    const definicaoExtracao = await getDefinicaoExtracaoUseCase.execute(id)

    return response.status(definicaoExtracao.statusCode).json(definicaoExtracao.data)
  }
}

export { GetDefinicaoExtracaoController }
