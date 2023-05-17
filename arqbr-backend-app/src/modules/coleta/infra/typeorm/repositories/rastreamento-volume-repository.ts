import { Brackets, getRepository, Repository } from 'typeorm'
import { IRastreamentoVolumeDTO } from '@modules/coleta/dtos/i-rastreamento-volume-dto'
import { IRastreamentoVolumeRepository } from '@modules/coleta/repositories/i-rastreamento-volume-repository'
import { RastreamentoVolume } from '@modules/coleta/infra/typeorm/entities/rastreamento-volume'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class RastreamentoVolumeRepository implements IRastreamentoVolumeRepository {
  private repository: Repository<RastreamentoVolume>

  constructor() {
    this.repository = getRepository(RastreamentoVolume)
  }


  // create
  async create ({
    volumeId,
    dataMovimentacao,
    horaMovimentacao,
    localDeArmazenagem
  }: IRastreamentoVolumeDTO): Promise<HttpResponse> {
    const rastreamentoVolume = this.repository.create({
      volumeId,
      dataMovimentacao,
      horaMovimentacao,
      localDeArmazenagem
    })

    const result = await this.repository.save(rastreamentoVolume)
      .then(rastreamentoVolumeResult => {
        return ok(rastreamentoVolumeResult)
      })
      .catch(error => {
        return serverError(error)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: string
  ): Promise<HttpResponse> {
    let columnName: string
    let columnDirection: 'ASC' | 'DESC'

    if ((typeof(order) === 'undefined') || (order === "")) {
      columnName = 'nome'
      columnDirection = 'ASC'
    } else {
      columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
      columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
    }

    const referenceArray = [
      "volumeIdentificador",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('ras')
        .select([
          'ras.id as "id"',
          'a.id as "volumeId"',
          'a.identificador as "volumeIdentificador"',
        ])
        .leftJoin('ras.volumeId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const rastreamentoVolumes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.identificador AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.identificador', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(rastreamentoVolumes)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const rastreamentoVolumes = await this.repository.createQueryBuilder('ras')
        .select([
          'ras. as "value"',
          'ras. as "label"',
        ])
        .where('ras. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('ras.')
        .getRawMany()

      return ok(rastreamentoVolumes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const rastreamentoVolume = await this.repository.createQueryBuilder('ras')
        .select([
          'ras. as "value"',
          'ras. as "label"',
        ])
        .where('ras. = :id', { id: `${id}` })
        .getRawOne()

      return ok(rastreamentoVolume)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
    filter: string
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('ras')
        .select([
          'ras.id as "id"',
        ])
        .leftJoin('ras.volumeId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const rastreamentoVolumes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.identificador AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: rastreamentoVolumes.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const rastreamentoVolume = await this.repository.createQueryBuilder('ras')
        .select([
          'ras.id as "id"',
          'ras.volumeId as "volumeId"',
          'a.identificador as "volumeIdentificador"',
          'ras.dataMovimentacao as "dataMovimentacao"',
          'ras.horaMovimentacao as "horaMovimentacao"',
          'ras.localDeArmazenagem as "localDeArmazenagem"',
          'b.nome as "plantaNome"',
        ])
        .leftJoin('ras.volumeId', 'a')
        .leftJoin('ras.localDeArmazenagem', 'b')
        .where('ras.id = :id', { id })
        .getRawOne()

      if (typeof rastreamentoVolume === 'undefined') {
        return noContent()
      }

      return ok(rastreamentoVolume)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    volumeId,
    dataMovimentacao,
    horaMovimentacao,
    localDeArmazenagem
  }: IRastreamentoVolumeDTO): Promise<HttpResponse> {
    const rastreamentoVolume = await this.repository.findOne(id)

    if (!rastreamentoVolume) {
      return notFound()
    }

    const newrastreamentoVolume = this.repository.create({
      id,
      volumeId,
      dataMovimentacao,
      horaMovimentacao,
      localDeArmazenagem
    })

    try {
      await this.repository.save(newrastreamentoVolume)

      return ok(newrastreamentoVolume)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    try {
      await this.repository.delete(id)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }


  // multi delete
  async multiDelete (ids: string[]): Promise<HttpResponse> {
    try {
      await this.repository.delete(ids)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }
}

export { RastreamentoVolumeRepository }
