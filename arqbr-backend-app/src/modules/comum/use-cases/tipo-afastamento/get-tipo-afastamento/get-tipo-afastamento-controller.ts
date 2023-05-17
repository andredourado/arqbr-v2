import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetTipoAfastamentoUseCase } from './get-tipo-afastamento-use-case'

class GetTipoAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getTipoAfastamentoUseCase = container.resolve(GetTipoAfastamentoUseCase)
    const tipoAfastamento = await getTipoAfastamentoUseCase.execute(id)

    return response.status(tipoAfastamento.statusCode).json(tipoAfastamento.data)
  }
}

export { GetTipoAfastamentoController }
