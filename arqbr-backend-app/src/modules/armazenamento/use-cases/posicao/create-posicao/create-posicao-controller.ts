import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePosicaoUseCase } from './create-posicao-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePosicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      unidadeId,
      plantaId,
      rua,
      linha,
      coluna,
      posicoes,
      posicoesDisponíveis,
      desabilitado
    } = request.body

    const createPosicaoUseCase = container.resolve(CreatePosicaoUseCase)

    const result = await createPosicaoUseCase.execute({
        unidadeId,
        plantaId,
        rua,
        linha,
        coluna,
        posicoes,
        posicoesDisponíveis,
        desabilitado
      })
      .then(posicaoResult => {
        return posicaoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreatePosicaoController }
