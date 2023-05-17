import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateComposicaoLoteUseCase } from './create-composicao-lote-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateComposicaoLoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      desabilitado
    } = request.body

    const createComposicaoLoteUseCase = container.resolve(CreateComposicaoLoteUseCase)

    const result = await createComposicaoLoteUseCase.execute({
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

export { CreateComposicaoLoteController }
