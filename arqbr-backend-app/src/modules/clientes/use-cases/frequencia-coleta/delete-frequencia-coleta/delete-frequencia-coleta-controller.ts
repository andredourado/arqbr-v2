import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteFrequenciaColetaUseCase } from './delete-frequencia-coleta-use-case'
import { ListFrequenciaColetaUseCase } from '../list-frequencia-coleta/list-frequencia-coleta-use-case'

class DeleteFrequenciaColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteFrequenciaColetaUseCase = container.resolve(DeleteFrequenciaColetaUseCase)
    await deleteFrequenciaColetaUseCase.execute(id)


    // restore list with updated records

    const listFrequenciaColetaUseCase = container.resolve(ListFrequenciaColetaUseCase)
    const frequenciaColetas = await listFrequenciaColetaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(frequenciaColetas)
  }
}

export { DeleteFrequenciaColetaController }
