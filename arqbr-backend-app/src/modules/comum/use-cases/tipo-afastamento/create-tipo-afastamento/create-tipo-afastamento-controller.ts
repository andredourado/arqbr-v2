import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTipoAfastamentoUseCase } from './create-tipo-afastamento-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateTipoAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      desabilitado
    } = request.body

    const createTipoAfastamentoUseCase = container.resolve(CreateTipoAfastamentoUseCase)

    const result = await createTipoAfastamentoUseCase.execute({
        descricao,
        desabilitado
      })
      .then(tipoAfastamentoResult => {
        return tipoAfastamentoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateTipoAfastamentoController }
