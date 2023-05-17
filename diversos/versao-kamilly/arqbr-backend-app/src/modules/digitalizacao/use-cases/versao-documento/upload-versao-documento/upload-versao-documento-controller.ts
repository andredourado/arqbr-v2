import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadVersaoDocumentoUseCase } from './upload-versao-documento-use-case'

class UploadVersaoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {

    const file = request.file.filename

    const createVersaoDocumentoUseCase = container.resolve(UploadVersaoDocumentoUseCase)

    const result = await createVersaoDocumentoUseCase.execute(file)
      .then(versaoDocumentoResult => {
        return versaoDocumentoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UploadVersaoDocumentoController }
