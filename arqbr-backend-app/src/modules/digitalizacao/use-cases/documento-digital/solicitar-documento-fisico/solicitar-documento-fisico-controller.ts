import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SolicitarDocumentoDigitalUseCase } from './solicitar-documento-fisico-use-case'

class SolicitarDocumentoFisicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { ids } = request.body
    const dataSolicitacao = new Date() 
    const user = request.user
    
    const solicitarDocumentoDigitalUseCase = container.resolve(SolicitarDocumentoDigitalUseCase)
    const documentoDigital = await solicitarDocumentoDigitalUseCase.execute(ids, dataSolicitacao, user)
    const statusCodeError = documentoDigital.find((item) => item.statusCode != 200)
    
    return response.status(statusCodeError ? statusCodeError.statusCode : documentoDigital[0].statusCode).json(documentoDigital)
  }
}

export { SolicitarDocumentoFisicoController }
