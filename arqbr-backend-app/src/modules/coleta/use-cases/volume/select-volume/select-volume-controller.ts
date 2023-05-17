import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectVolumeUseCase } from './select-volume-use-case'

class SelectVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectVolumeUseCase = container.resolve(SelectVolumeUseCase)

    const volumes = await selectVolumeUseCase.execute({
      filter: filter as string,
    })

    return response.json(volumes)
  }
}

export { SelectVolumeController }
