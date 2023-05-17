import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectTipoDocumentoUseCase } from './id-select-tipo-documento-use-case'

class IdSelectTipoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectTipoDocumentoUseCase = container.resolve(IdSelectTipoDocumentoUseCase)

    const tipoDocumento = await idSelectTipoDocumentoUseCase.execute({
      id: id as string
    })

    return response.json(tipoDocumento.data)
  }
}

export { IdSelectTipoDocumentoController }
