import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePosicaoUseCase } from './update-posicao-use-case'

class UpdatePosicaoController {
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

    const { id } = request.params

    const updatePosicaoUseCase = container.resolve(UpdatePosicaoUseCase)

    const result = await updatePosicaoUseCase.execute({
        id,
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

export { UpdatePosicaoController }
