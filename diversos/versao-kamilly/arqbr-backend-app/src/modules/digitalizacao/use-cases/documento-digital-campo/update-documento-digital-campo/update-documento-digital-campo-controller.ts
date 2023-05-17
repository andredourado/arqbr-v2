import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateDocumentoDigitalCampoUseCase } from './update-documento-digital-campo-use-case'

class UpdateDocumentoDigitalCampoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      documentoDigitalId,
      campoId,
      conteudo,
      indiceQualidadeExtracao,
      pessoaId
    } = request.body

    const { id } = request.params

    const updateDocumentoDigitalCampoUseCase = container.resolve(UpdateDocumentoDigitalCampoUseCase)

    const result = await updateDocumentoDigitalCampoUseCase.execute({
        id,
        documentoDigitalId,
        campoId,
        conteudo,
        indiceQualidadeExtracao,
        pessoaId
      })
      .then(documentoDigitalCampoResult => {
        return documentoDigitalCampoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateDocumentoDigitalCampoController }
