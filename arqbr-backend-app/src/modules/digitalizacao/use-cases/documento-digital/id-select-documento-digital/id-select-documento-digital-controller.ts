import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectDocumentoDigitalUseCase } from './id-select-documento-digital-use-case'

class IdSelectDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectDocumentoDigitalUseCase = container.resolve(IdSelectDocumentoDigitalUseCase)

    const documentoDigital = await idSelectDocumentoDigitalUseCase.execute({
      id: id as string
    })

    return response.json(documentoDigital.data)
  }
}

export { IdSelectDocumentoDigitalController }
