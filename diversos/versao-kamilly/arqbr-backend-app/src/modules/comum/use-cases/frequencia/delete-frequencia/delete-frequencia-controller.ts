import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteFrequenciaUseCase } from './delete-frequencia-use-case'
import { ListFrequenciaUseCase } from '../list-frequencia/list-frequencia-use-case'

class DeleteFrequenciaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteFrequenciaUseCase = container.resolve(DeleteFrequenciaUseCase)
    await deleteFrequenciaUseCase.execute(id)


    // restore list with updated records

    const listFrequenciaUseCase = container.resolve(ListFrequenciaUseCase)
    const frequencias = await listFrequenciaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(frequencias)
  }
}

export { DeleteFrequenciaController }
