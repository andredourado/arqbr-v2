import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectRastreamentoDocumentoUseCase } from './select-rastreamento-documento-use-case'

class SelectRastreamentoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectRastreamentoDocumentoUseCase = container.resolve(SelectRastreamentoDocumentoUseCase)

    const rastreamentoDocumentos = await selectRastreamentoDocumentoUseCase.execute({
      filter: filter as string,
    })

    return response.json(rastreamentoDocumentos)
  }
}

export { SelectRastreamentoDocumentoController }
