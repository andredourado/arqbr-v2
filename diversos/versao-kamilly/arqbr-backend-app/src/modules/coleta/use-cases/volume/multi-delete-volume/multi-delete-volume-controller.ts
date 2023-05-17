import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteVolumeUseCase } from './multi-delete-volume-use-case'
import { ListVolumeUseCase } from '../list-volume/list-volume-use-case'

class MultiDeleteVolumeController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteVolumeUseCase = container.resolve(MultiDeleteVolumeUseCase)
    await multiDeleteVolumeUseCase.execute(ids)


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

export { MultiDeleteVolumeController }
