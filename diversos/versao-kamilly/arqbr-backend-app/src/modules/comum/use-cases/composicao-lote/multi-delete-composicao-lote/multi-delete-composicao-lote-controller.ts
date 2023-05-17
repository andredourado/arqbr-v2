import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteComposicaoLoteUseCase } from './multi-delete-composicao-lote-use-case'
import { ListComposicaoLoteUseCase } from '../list-composicao-lote/list-composicao-lote-use-case'

class MultiDeleteComposicaoLoteController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteComposicaoLoteUseCase = container.resolve(MultiDeleteComposicaoLoteUseCase)
    await multiDeleteComposicaoLoteUseCase.execute(ids)


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

export { MultiDeleteComposicaoLoteController }
