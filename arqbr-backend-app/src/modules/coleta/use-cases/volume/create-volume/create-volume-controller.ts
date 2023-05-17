import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateVolumeUseCase } from './create-volume-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      coletaId,
      identificador,
      arquivoFoto,
      comentario,
      localDeArmazenagem
    } = request.body

    const createVolumeUseCase = container.resolve(CreateVolumeUseCase)

    const result = await createVolumeUseCase.execute({
        coletaId,
        identificador,
        arquivoFoto,
        comentario,
        localDeArmazenagem
      })
      .then(volumeResult => {
        return volumeResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateVolumeController }
