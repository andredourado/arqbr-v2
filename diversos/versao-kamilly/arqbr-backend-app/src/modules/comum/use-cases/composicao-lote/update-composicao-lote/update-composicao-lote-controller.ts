import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateComposicaoLoteUseCase } from './update-composicao-lote-use-case'

class UpdateComposicaoLoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateComposicaoLoteUseCase = container.resolve(UpdateComposicaoLoteUseCase)

    const result = await updateComposicaoLoteUseCase.execute({
        id,
        descricao,
        desabilitado
      })
      .then(composicaoLoteResult => {
        return composicaoLoteResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateComposicaoLoteController }
