import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePontoColetaUseCase } from './delete-ponto-coleta-use-case'
import { ListPontoColetaUseCase } from '../list-ponto-coleta/list-ponto-coleta-use-case'

class DeletePontoColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePontoColetaUseCase = container.resolve(DeletePontoColetaUseCase)
    await deletePontoColetaUseCase.execute(id)


    // restore list with updated records

    const listPontoColetaUseCase = container.resolve(ListPontoColetaUseCase)
    const pontosColeta = await listPontoColetaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(pontosColeta)
  }
}

export { DeletePontoColetaController }
