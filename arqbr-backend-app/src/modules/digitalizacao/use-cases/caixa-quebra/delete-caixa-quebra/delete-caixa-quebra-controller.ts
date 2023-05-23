import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCaixaQuebraUseCase } from './delete-caixa-quebra-use-case'
import { ListCaixaQuebraUseCase } from '../list-caixa-quebra/list-caixa-quebra-use-case'

class DeleteCaixaQuebraController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteCaixaQuebraUseCase = container.resolve(DeleteCaixaQuebraUseCase)
    await deleteCaixaQuebraUseCase.execute(id)


    // restore list with updated records

    const listCaixaQuebraUseCase = container.resolve(ListCaixaQuebraUseCase)
    const caixasQuebras = await listCaixaQuebraUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(caixasQuebras)
  }
}

export { DeleteCaixaQuebraController }
