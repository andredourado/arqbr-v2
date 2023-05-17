import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateAfastamentoUseCase } from './create-afastamento-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      pessoaId,
      tipoAfastamentoId,
      inicio,
      fim,
      desabilitado
    } = request.body

    const createAfastamentoUseCase = container.resolve(CreateAfastamentoUseCase)

    const result = await createAfastamentoUseCase.execute({
        pessoaId,
        tipoAfastamentoId,
        inicio,
        fim,
        desabilitado
      })
      .then(afastamentoResult => {
        return afastamentoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateAfastamentoController }
