import { inject, injectable } from 'tsyringe'
import { IPlantaRepository } from '@modules/armazenamento/repositories/i-planta-repository'
import { IPlantaDTO } from '@modules/armazenamento/dtos/i-planta-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IPlantaDTO[],
  hasNext: boolean
}

@injectable()
class ListPlantaUseCase {
  constructor(
    @inject('PlantaRepository')
    private plantaRepository: IPlantaRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const plantas = await this.plantaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countPlantas = await this.plantaRepository.count(
      search
    )

    const numeroPlanta = page * rowsPerPage

    const plantasResponse = {
      items: plantas.data,
      hasNext: numeroPlanta < countPlantas.data.count
    }

    return plantasResponse
  }
}

export { ListPlantaUseCase }
