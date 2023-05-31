import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectFilteredTipoDocumentoUseCase } from './select-filtered-tipo-documento-use-case'

class SelectFilteredTipoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter, clienteId, departamentoId } = request.query

    const selectFilteredTipoDocumentoUseCase = container.resolve(SelectFilteredTipoDocumentoUseCase)

    const tiposDocumento = await selectFilteredTipoDocumentoUseCase.execute({
      filter: filter as string,
      clienteId: clienteId as string,
      departamentoId: departamentoId as string
    })

    return response.json(tiposDocumento)
  }
}

export { SelectFilteredTipoDocumentoController }
