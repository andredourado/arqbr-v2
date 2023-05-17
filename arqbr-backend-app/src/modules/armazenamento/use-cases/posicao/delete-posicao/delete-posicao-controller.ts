import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePosicaoUseCase } from './delete-posicao-use-case'
import { ListPosicaoUseCase } from '../list-posicao/list-posicao-use-case'

class DeletePosicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePosicaoUseCase = container.resolve(DeletePosicaoUseCase)
    await deletePosicaoUseCase.execute(id)


    // restore list with updated records

    const listPosicaoUseCase = container.resolve(ListPosicaoUseCase)
    const posicoes = await listPosicaoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(posicoes)
  }
}

export { DeletePosicaoController }
