import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteRastreamentoDocumentoUseCase } from './multi-delete-rastreamento-documento-use-case'
import { ListRastreamentoDocumentoUseCase } from '../list-rastreamento-documento/list-rastreamento-documento-use-case'

class MultiDeleteRastreamentoDocumentoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteRastreamentoDocumentoUseCase = container.resolve(MultiDeleteRastreamentoDocumentoUseCase)
    await multiDeleteRastreamentoDocumentoUseCase.execute(ids)


    // restore list with updated records

    const listRastreamentoDocumentoUseCase = container.resolve(ListRastreamentoDocumentoUseCase)
    const rastreamentoDocumentos = await listRastreamentoDocumentoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(rastreamentoDocumentos)
  }
}

export { MultiDeleteRastreamentoDocumentoController }
