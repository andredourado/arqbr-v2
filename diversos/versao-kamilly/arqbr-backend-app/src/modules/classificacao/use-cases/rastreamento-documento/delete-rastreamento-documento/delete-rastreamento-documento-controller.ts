import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteRastreamentoDocumentoUseCase } from './delete-rastreamento-documento-use-case'
import { ListRastreamentoDocumentoUseCase } from '../list-rastreamento-documento/list-rastreamento-documento-use-case'

class DeleteRastreamentoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteRastreamentoDocumentoUseCase = container.resolve(DeleteRastreamentoDocumentoUseCase)
    await deleteRastreamentoDocumentoUseCase.execute(id)


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

export { DeleteRastreamentoDocumentoController }
