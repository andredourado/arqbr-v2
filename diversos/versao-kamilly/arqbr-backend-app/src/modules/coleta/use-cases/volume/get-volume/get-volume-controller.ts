import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetVolumeUseCase } from './get-volume-use-case'

class GetVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getVolumeUseCase = container.resolve(GetVolumeUseCase)
    const volume = await getVolumeUseCase.execute(id)

    return response.status(volume.statusCode).json(volume.data)
  }
}

export { GetVolumeController }
