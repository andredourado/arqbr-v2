import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectRastreamentoDocumentoUseCase } from './id-select-rastreamento-documento-use-case'

class IdSelectRastreamentoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectRastreamentoDocumentoUseCase = container.resolve(IdSelectRastreamentoDocumentoUseCase)

    const rastreamentoDocumento = await idSelectRastreamentoDocumentoUseCase.execute({
      id: id as string
    })

    return response.json(rastreamentoDocumento.data)
  }
}

export { IdSelectRastreamentoDocumentoController }
