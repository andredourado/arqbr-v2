import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetRastreamentoDocumentoUseCase } from './get-rastreamento-documento-use-case'

class GetRastreamentoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getRastreamentoDocumentoUseCase = container.resolve(GetRastreamentoDocumentoUseCase)
    const rastreamentoDocumento = await getRastreamentoDocumentoUseCase.execute(id)

    return response.status(rastreamentoDocumento.statusCode).json(rastreamentoDocumento.data)
  }
}

export { GetRastreamentoDocumentoController }
