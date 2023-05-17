import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectContratoUseCase } from './select-contrato-use-case'

class SelectContratoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter, clienteId } = request.query

    const selectContratoUseCase = container.resolve(SelectContratoUseCase)

    const contratos = await selectContratoUseCase.execute({
      filter: filter as string,
      clienteId: clienteId as string
    })

    return response.json(contratos)
  }
}

export { SelectContratoController }
