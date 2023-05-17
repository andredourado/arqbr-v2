import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateVolumeUseCase } from './update-volume-use-case'

class UpdateVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      coletaId,
      identificador,
      arquivoFoto,
      comentario,
      localDeArmazenagem,
      statusId
    } = request.body

    const { id } = request.params

    const updateVolumeUseCase = container.resolve(UpdateVolumeUseCase)

    const result = await updateVolumeUseCase.execute({
        id,
        coletaId,
        identificador,
        arquivoFoto,
        comentario,
        localDeArmazenagem,
        statusId
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

export { UpdateVolumeController }
