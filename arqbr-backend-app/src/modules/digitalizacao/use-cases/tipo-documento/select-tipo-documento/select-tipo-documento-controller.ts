import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectTipoDocumentoUseCase } from './select-tipo-documento-use-case'

class SelectTipoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter, clienteId, departamentoId } = request.query

    const selectTipoDocumentoUseCase = container.resolve(SelectTipoDocumentoUseCase)

    const tiposDocumento = await selectTipoDocumentoUseCase.execute({
      filter: filter as string,
      clienteId: clienteId as string,
      departamentoId: departamentoId as string
    })

    return response.json(tiposDocumento)
  }
}

export { SelectTipoDocumentoController }
