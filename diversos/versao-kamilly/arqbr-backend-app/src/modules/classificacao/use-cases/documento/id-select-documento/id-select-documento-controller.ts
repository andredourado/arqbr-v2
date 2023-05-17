import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectDocumentoUseCase } from './id-select-documento-use-case'

class IdSelectDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectDocumentoUseCase = container.resolve(IdSelectDocumentoUseCase)

    const documento = await idSelectDocumentoUseCase.execute({
      id: id as string
    })

    return response.json(documento.data)
  }
}

export { IdSelectDocumentoController }
