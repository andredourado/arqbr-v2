import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectVolumeUseCase } from './id-select-volume-use-case'

class IdSelectVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectVolumeUseCase = container.resolve(IdSelectVolumeUseCase)

    const volume = await idSelectVolumeUseCase.execute({
      id: id as string
    })

    return response.json(volume.data)
  }
}

export { IdSelectVolumeController }
