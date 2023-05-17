import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateVersaoDocumentoFileUseCase } from './update-versao-documento-file-use-case'

class UpdateVersaoDocumentoFileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const file = request.file.filename

    const updateVersaoDocumentoFileUseCase = container.resolve(UpdateVersaoDocumentoFileUseCase)

    await updateVersaoDocumentoFileUseCase.execute({ versaoDocumentoId: id, file })

    return response.status(204).send()
  }
}

export { UpdateVersaoDocumentoFileController }
