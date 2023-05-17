import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCampoDocumentoUseCase } from './select-campo-documento-use-case'

class SelectCampoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectCampoDocumentoUseCase = container.resolve(SelectCampoDocumentoUseCase)

    const camposDocumento = await selectCampoDocumentoUseCase.execute({
      filter: filter as string,
    })

    return response.json(camposDocumento)
  }
}

export { SelectCampoDocumentoController }
