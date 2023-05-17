import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountVolumeUseCase } from './count-volume-use-case'

class CountVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countVolumeUseCase = container.resolve(CountVolumeUseCase)

    const volumesCount = await countVolumeUseCase.execute({
      search: search as string
    })

    return response.status(volumesCount.statusCode).json(volumesCount)
  }
}

export { CountVolumeController }
