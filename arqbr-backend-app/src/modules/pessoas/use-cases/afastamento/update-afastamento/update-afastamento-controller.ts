import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateAfastamentoUseCase } from './update-afastamento-use-case'

class UpdateAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      pessoaId,
      tipoAfastamentoId,
      inicio,
      fim,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateAfastamentoUseCase = container.resolve(UpdateAfastamentoUseCase)

    const result = await updateAfastamentoUseCase.execute({
        id,
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

export { UpdateAfastamentoController }
