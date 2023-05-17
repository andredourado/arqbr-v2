import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteVeiculoUseCase } from './delete-veiculo-use-case'
import { ListVeiculoUseCase } from '../list-veiculo/list-veiculo-use-case'

class DeleteVeiculoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteVeiculoUseCase = container.resolve(DeleteVeiculoUseCase)
    await deleteVeiculoUseCase.execute(id)


    // restore list with updated records

    const listVeiculoUseCase = container.resolve(ListVeiculoUseCase)
    const veiculos = await listVeiculoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(veiculos)
  }
}

export { DeleteVeiculoController }
