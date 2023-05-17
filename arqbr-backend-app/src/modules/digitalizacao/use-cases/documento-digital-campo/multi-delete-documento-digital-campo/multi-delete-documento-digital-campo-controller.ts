import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteDocumentoDigitalCampoUseCase } from './multi-delete-documento-digital-campo-use-case'
import { ListDocumentoDigitalCampoUseCase } from '../list-documento-digital-campo/list-documento-digital-campo-use-case'

class MultiDeleteDocumentoDigitalCampoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteDocumentoDigitalCampoUseCase = container.resolve(MultiDeleteDocumentoDigitalCampoUseCase)
    await multiDeleteDocumentoDigitalCampoUseCase.execute(ids)


    // restore list with updated records

    const listDocumentoDigitalCampoUseCase = container.resolve(ListDocumentoDigitalCampoUseCase)
    const documentosDigitaisCampos = await listDocumentoDigitalCampoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(documentosDigitaisCampos)
  }
}

export { MultiDeleteDocumentoDigitalCampoController }
