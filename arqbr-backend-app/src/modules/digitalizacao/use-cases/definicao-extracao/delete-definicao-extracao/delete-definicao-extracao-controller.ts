import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteDefinicaoExtracaoUseCase } from './delete-definicao-extracao-use-case'
import { ListDefinicaoExtracaoUseCase } from '../list-definicao-extracao/list-definicao-extracao-use-case'

class DeleteDefinicaoExtracaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteDefinicaoExtracaoUseCase = container.resolve(DeleteDefinicaoExtracaoUseCase)
    await deleteDefinicaoExtracaoUseCase.execute(id)


    // restore list with updated records

    const listDefinicaoExtracaoUseCase = container.resolve(ListDefinicaoExtracaoUseCase)
    const definicoesExtracao = await listDefinicaoExtracaoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(definicoesExtracao)
  }
}

export { DeleteDefinicaoExtracaoController }
