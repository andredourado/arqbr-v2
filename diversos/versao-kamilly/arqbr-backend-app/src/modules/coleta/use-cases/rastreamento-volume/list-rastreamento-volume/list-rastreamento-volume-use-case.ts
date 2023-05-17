import { inject, injectable } from 'tsyringe'
import { IRastreamentoVolumeRepository } from '@modules/coleta/repositories/i-rastreamento-volume-repository'
import { IRastreamentoVolumeDTO } from '@modules/coleta/dtos/i-rastreamento-volume-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IRastreamentoVolumeDTO[],
  hasNext: boolean
}

@injectable()
class ListRastreamentoVolumeUseCase {
  constructor(
    @inject('RastreamentoVolumeRepository')
    private rastreamentoVolumeRepository: IRastreamentoVolumeRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const rastreamentoVolumes = await this.rastreamentoVolumeRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countRastreamentoVolumes = await this.rastreamentoVolumeRepository.count(
      search
    )

    const numeroRastreamentoVolume = page * rowsPerPage

    const rastreamentoVolumesResponse = {
      items: rastreamentoVolumes.data,
      hasNext: numeroRastreamentoVolume < countRastreamentoVolumes.data.count
    }

    return rastreamentoVolumesResponse
  }
}

export { ListRastreamentoVolumeUseCase }
