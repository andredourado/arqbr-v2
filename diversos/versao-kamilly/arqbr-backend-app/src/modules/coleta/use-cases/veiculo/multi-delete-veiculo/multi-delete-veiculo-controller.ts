import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteVeiculoUseCase } from './multi-delete-veiculo-use-case'
import { ListVeiculoUseCase } from '../list-veiculo/list-veiculo-use-case'

class MultiDeleteVeiculoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteVeiculoUseCase = container.resolve(MultiDeleteVeiculoUseCase)
    await multiDeleteVeiculoUseCase.execute(ids)


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

export { MultiDeleteVeiculoController }
