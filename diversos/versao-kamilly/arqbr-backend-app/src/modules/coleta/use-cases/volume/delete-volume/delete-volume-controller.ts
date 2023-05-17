import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteVolumeUseCase } from './delete-volume-use-case'
import { ListVolumeUseCase } from '../list-volume/list-volume-use-case'

class DeleteVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteVolumeUseCase = container.resolve(DeleteVolumeUseCase)
    await deleteVolumeUseCase.execute(id)


    // restore list with updated records

    const listVolumeUseCase = container.resolve(ListVolumeUseCase)
    const volumes = await listVolumeUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(volumes)
  }
}

export { DeleteVolumeController }
