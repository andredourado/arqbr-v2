import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountRastreamentoDocumentoUseCase } from './count-rastreamento-documento-use-case'

class CountRastreamentoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countRastreamentoDocumentoUseCase = container.resolve(CountRastreamentoDocumentoUseCase)

    const rastreamentoDocumentosCount = await countRastreamentoDocumentoUseCase.execute({
      search: search as string
    })

    return response.status(rastreamentoDocumentosCount.statusCode).json(rastreamentoDocumentosCount)
  }
}

export { CountRastreamentoDocumentoController }
