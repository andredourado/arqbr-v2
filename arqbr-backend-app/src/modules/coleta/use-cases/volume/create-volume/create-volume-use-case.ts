import { inject, injectable } from 'tsyringe'
import { Volume } from '@modules/coleta/infra/typeorm/entities/volume'
import { IVolumeRepository } from '@modules/coleta/repositories/i-volume-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  coletaId: string
  identificador: string
  arquivoFoto: string
  comentario: string
  localDeArmazenagem: string
}

@injectable()
class CreateVolumeUseCase {
  constructor(
    @inject('VolumeRepository')
    private volumeRepository: IVolumeRepository
  ) {}

  async execute({
    coletaId,
    identificador,
    arquivoFoto,
    comentario,
    localDeArmazenagem
  }: IRequest): Promise<Volume> {
    const result = await this.volumeRepository.create({
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

    return result
  }
}

export { CreateVolumeUseCase }
