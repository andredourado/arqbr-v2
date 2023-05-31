import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteDefinicaoExtracaoUseCase } from './multi-delete-definicao-extracao-use-case'
import { ListDefinicaoExtracaoUseCase } from '../list-definicao-extracao/list-definicao-extracao-use-case'

class MultiDeleteDefinicaoExtracaoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteDefinicaoExtracaoUseCase = container.resolve(MultiDeleteDefinicaoExtracaoUseCase)
    await multiDeleteDefinicaoExtracaoUseCase.execute(ids)


    // restore list with updated records

    const listDefinicaoExtracaoUseCase = container.resolve(ListDefinicaoExtracaoUseCase)
    const caixasQuebras = await listDefinicaoExtracaoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(caixasQuebras)
  }
}

export { MultiDeleteDefinicaoExtracaoController }
