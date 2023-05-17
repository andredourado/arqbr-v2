import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateTipoAfastamentoUseCase } from './update-tipo-afastamento-use-case'

class UpdateTipoAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateTipoAfastamentoUseCase = container.resolve(UpdateTipoAfastamentoUseCase)

    const result = await updateTipoAfastamentoUseCase.execute({
        id,
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

export { UpdateTipoAfastamentoController }
