import { inject, injectable } from 'tsyringe'
import { Volume } from '@modules/coleta/infra/typeorm/entities/volume'
import { IVolumeRepository } from '@modules/coleta/repositories/i-volume-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  coletaId: string
  identificador: string
  arquivoFoto: string
  comentario: string
  localDeArmazenagem: string
}

@injectable()
class UpdateVolumeUseCase {
  constructor(
    @inject('VolumeRepository')
    private volumeRepository: IVolumeRepository
  ) {}

  async execute({
    id,
    coletaId,
    identificador,
    arquivoFoto,
    comentario,
    localDeArmazenagem
  }: IRequest): Promise<HttpResponse> {
    const volume = await this.volumeRepository.update({
      id,
      coletaId,
      identificador,
      arquivoFoto,
      comentario,
      localDeArmazenagem
    })

    return volume
  }
}

export { UpdateVolumeUseCase }
