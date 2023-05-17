import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateFuncaoUseCase } from './create-funcao-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateFuncaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      metaProducao,
      desabilitado
    } = request.body

    const createFuncaoUseCase = container.resolve(CreateFuncaoUseCase)

    const result = await createFuncaoUseCase.execute({
        descricao,
        metaProducao,
        desabilitado
      })
      .then(funcaoResult => {
        return funcaoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateFuncaoController }
