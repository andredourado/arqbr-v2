import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteDocumentoDigitalUseCase } from './multi-delete-documento-digital-use-case'
import { ListDocumentoDigitalUseCase } from '../list-documento-digital/list-documento-digital-use-case'

class MultiDeleteDocumentoDigitalController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteDocumentoDigitalUseCase = container.resolve(MultiDeleteDocumentoDigitalUseCase)
    await multiDeleteDocumentoDigitalUseCase.execute(ids)


    // restore list with updated records

    const listDocumentoDigitalUseCase = container.resolve(ListDocumentoDigitalUseCase)
    const documentosDigitais = await listDocumentoDigitalUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(documentosDigitais)
  }
}

export { MultiDeleteDocumentoDigitalController }
