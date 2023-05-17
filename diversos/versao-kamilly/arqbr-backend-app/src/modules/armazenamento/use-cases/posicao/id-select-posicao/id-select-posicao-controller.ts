import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPosicaoUseCase } from './id-select-posicao-use-case'

class IdSelectPosicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPosicaoUseCase = container.resolve(IdSelectPosicaoUseCase)

    const posicao = await idSelectPosicaoUseCase.execute({
      id: id as string
    })

    return response.json(posicao.data)
  }
}

export { IdSelectPosicaoController }
