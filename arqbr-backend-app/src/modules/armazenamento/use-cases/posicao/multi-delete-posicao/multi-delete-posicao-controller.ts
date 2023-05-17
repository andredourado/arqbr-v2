import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePosicaoUseCase } from './multi-delete-posicao-use-case'
import { ListPosicaoUseCase } from '../list-posicao/list-posicao-use-case'

class MultiDeletePosicaoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePosicaoUseCase = container.resolve(MultiDeletePosicaoUseCase)
    await multiDeletePosicaoUseCase.execute(ids)


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

export { MultiDeletePosicaoController }
