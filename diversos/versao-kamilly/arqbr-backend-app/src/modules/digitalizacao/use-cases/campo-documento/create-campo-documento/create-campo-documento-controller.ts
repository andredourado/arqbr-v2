import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCampoDocumentoUseCase } from './create-campo-documento-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateCampoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      versaoDocumentoId,
      nomeCampo,
      identificador,
      cantoSuperiorX,
      cantoSuperiorY,
      cantoInferiorX,
      cantoInferiorY,
      conteudoParaValidacao,
      pessoaId,
      desabilitado
    } = request.body

    const createCampoDocumentoUseCase = container.resolve(CreateCampoDocumentoUseCase)

    const result = await createCampoDocumentoUseCase.execute({
        versaoDocumentoId,
        nomeCampo,
        identificador,
        cantoSuperiorX,
        cantoSuperiorY,
        cantoInferiorX,
        cantoInferiorY,
        conteudoParaValidacao,
        pessoaId,
        desabilitado
      })
      .then(campoDocumentoResult => {
        return campoDocumentoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateCampoDocumentoController }
