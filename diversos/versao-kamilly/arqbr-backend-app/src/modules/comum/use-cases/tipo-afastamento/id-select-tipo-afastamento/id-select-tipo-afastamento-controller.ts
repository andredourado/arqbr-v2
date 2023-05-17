import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectTipoAfastamentoUseCase } from './id-select-tipo-afastamento-use-case'

class IdSelectTipoAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectTipoAfastamentoUseCase = container.resolve(IdSelectTipoAfastamentoUseCase)

    const tipoAfastamento = await idSelectTipoAfastamentoUseCase.execute({
      id: id as string
    })

    return response.json(tipoAfastamento.data)
  }
}

export { IdSelectTipoAfastamentoController }
