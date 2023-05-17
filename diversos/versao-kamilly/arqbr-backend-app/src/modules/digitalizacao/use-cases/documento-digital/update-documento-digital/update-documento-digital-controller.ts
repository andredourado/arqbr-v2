import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateDocumentoDigitalUseCase } from './update-documento-digital-use-case'

class UpdateDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      dataDigitalizacao,
      versaoDocumentoId,
      nip,
      conteudoQrCode,
      nomeArquivo,
      conteudoEmTexto,
      pessoaId
    } = request.body

    const { id } = request.params

    const updateDocumentoDigitalUseCase = container.resolve(UpdateDocumentoDigitalUseCase)

    const result = await updateDocumentoDigitalUseCase.execute({
        id,
        dataDigitalizacao,
        versaoDocumentoId,
        nip,
        conteudoQrCode,
        nomeArquivo,
        conteudoEmTexto,
        pessoaId
      })
      .then(documentoDigitalResult => {
        return documentoDigitalResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateDocumentoDigitalController }
