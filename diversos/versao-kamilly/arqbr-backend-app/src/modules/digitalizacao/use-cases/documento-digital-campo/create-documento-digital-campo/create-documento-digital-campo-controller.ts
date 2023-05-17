import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateDocumentoDigitalCampoUseCase } from './create-documento-digital-campo-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateDocumentoDigitalCampoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      documentoDigitalId,
      campoId,
      conteudo,
      indiceQualidadeExtracao,
      pessoaId
    } = request.body

    const createDocumentoDigitalCampoUseCase = container.resolve(CreateDocumentoDigitalCampoUseCase)

    const result = await createDocumentoDigitalCampoUseCase.execute({
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

export { CreateDocumentoDigitalCampoController }
