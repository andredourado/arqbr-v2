import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteRastreamentoVolumeUseCase } from './delete-rastreamento-volume-use-case'
import { ListRastreamentoVolumeUseCase } from '../list-rastreamento-volume/list-rastreamento-volume-use-case'

class DeleteRastreamentoVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteRastreamentoVolumeUseCase = container.resolve(DeleteRastreamentoVolumeUseCase)
    await deleteRastreamentoVolumeUseCase.execute(id)


    // restore list with updated records

    const listRastreamentoVolumeUseCase = container.resolve(ListRastreamentoVolumeUseCase)
    const rastreamentoVolumes = await listRastreamentoVolumeUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(rastreamentoVolumes)
  }
}

export { DeleteRastreamentoVolumeController }
