import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteComposicaoLoteUseCase } from './delete-composicao-lote-use-case'
import { ListComposicaoLoteUseCase } from '../list-composicao-lote/list-composicao-lote-use-case'

class DeleteComposicaoLoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteComposicaoLoteUseCase = container.resolve(DeleteComposicaoLoteUseCase)
    await deleteComposicaoLoteUseCase.execute(id)


    // restore list with updated records

    const listComposicaoLoteUseCase = container.resolve(ListComposicaoLoteUseCase)
    const composicaoLotes = await listComposicaoLoteUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(composicaoLotes)
  }
}

export { DeleteComposicaoLoteController }
