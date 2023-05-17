import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUnidadeUseCase } from './create-unidade-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateUnidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      estadoId,
      cidadeId,
      nome,
      endereco,
      numero,
      complemento,
      cep,
      desabilitado
    } = request.body

    const createUnidadeUseCase = container.resolve(CreateUnidadeUseCase)

    const result = await createUnidadeUseCase.execute({
        estadoId,
        cidadeId,
        nome,
        endereco,
        numero,
        complemento,
        cep,
        desabilitado
      })
      .then(unidadeResult => {
        return unidadeResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateUnidadeController }
