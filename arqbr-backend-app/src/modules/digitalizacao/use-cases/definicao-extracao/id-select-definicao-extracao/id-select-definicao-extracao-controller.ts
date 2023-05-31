import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectDefinicaoExtracaoUseCase } from './id-select-definicao-extracao-use-case'

class IdSelectDefinicaoExtracaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectDefinicaoExtracaoUseCase = container.resolve(IdSelectDefinicaoExtracaoUseCase)

    const definicaoExtracao = await idSelectDefinicaoExtracaoUseCase.execute({
      id: id as string
    })

    return response.json(definicaoExtracao.data)
  }
}

export { IdSelectDefinicaoExtracaoController }
