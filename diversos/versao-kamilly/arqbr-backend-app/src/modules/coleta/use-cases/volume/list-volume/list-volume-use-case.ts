import { inject, injectable } from 'tsyringe'
import { IVolumeRepository } from '@modules/coleta/repositories/i-volume-repository'
import { IVolumeDTO } from '@modules/coleta/dtos/i-volume-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IVolumeDTO[],
  hasNext: boolean
}

@injectable()
class ListVolumeUseCase {
  constructor(
    @inject('VolumeRepository')
    private volumeRepository: IVolumeRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const volumes = await this.volumeRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countVolumes = await this.volumeRepository.count(
      search
    )

    const numeroVolume = page * rowsPerPage

    const volumesResponse = {
      items: volumes.data,
      hasNext: numeroVolume < countVolumes.data.count
    }

    return volumesResponse
  }
}

export { ListVolumeUseCase }
