import { Brackets, getRepository, Repository } from 'typeorm'
import { IVolumeDTO } from '@modules/coleta/dtos/i-volume-dto'
import { IVolumeRepository } from '@modules/coleta/repositories/i-volume-repository'
import { Volume } from '@modules/coleta/infra/typeorm/entities/volume'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class VolumeRepository implements IVolumeRepository {
  private repository: Repository<Volume>

  constructor() {
    this.repository = getRepository(Volume)
  }


  // create
  async create ({
    coletaId,
    identificador,
    arquivoFoto,
    comentario,
    localDeArmazenagem
  }: IVolumeDTO): Promise<HttpResponse> {
    const volume = this.repository.create({
      coletaId,
      identificador,
      arquivoFoto,
      comentario,
      localDeArmazenagem
    })

    const result = await this.repository.save(volume)
      .then(volumeResult => {
        return ok(volumeResult)
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
      "coletaIdentificador",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('vol')
        .select([
          'vol.id as "id"',
          'a.id as "coletaId"',
          'a.identificador as "coletaIdentificador"',
        ])
        .leftJoin('vol.coletaId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const volumes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.identificador AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.identificador', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(volumes)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const volumes = await this.repository.createQueryBuilder('vol')
        .select([
          'vol.id as "value"',
          'vol.identificador as "label"',
        ])
        .where('vol.identificador ilike :filter', { filter: `${filter}%` })
        .addOrderBy('vol.identificador')
        .getRawMany()

      return ok(volumes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const volume = await this.repository.createQueryBuilder('vol')
        .select([
          'vol.id as "value"',
          'vol.identificador as "label"',
        ])
        .where('vol.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(volume)
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
      let query = this.repository.createQueryBuilder('vol')
        .select([
          'vol.id as "id"',
        ])
        .leftJoin('vol.coletaId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const volumes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.identificador AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: volumes.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const volume = await this.repository.createQueryBuilder('vol')
        .select([
          'vol.id as "id"',
          'vol.coletaId as "coletaId"',
          'a.identificador as "coletaIdentificador"',
          'vol.identificador as "identificador"',
          'vol.arquivoFoto as "arquivoFoto"',
          'vol.comentario as "comentario"',
          'vol.localDeArmazenagem as "localDeArmazenagem"',
          'b.nome as "plantaNome"',
        ])
        .leftJoin('vol.coletaId', 'a')
        .leftJoin('vol.localDeArmazenagem', 'b')
        .where('vol.id = :id', { id })
        .getRawOne()

      if (typeof volume === 'undefined') {
        return noContent()
      }

      return ok(volume)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    coletaId,
    identificador,
    arquivoFoto,
    comentario,
    localDeArmazenagem
  }: IVolumeDTO): Promise<HttpResponse> {
    const volume = await this.repository.findOne(id)

    if (!volume) {
      return notFound()
    }

    const newvolume = this.repository.create({
      id,
      coletaId,
      identificador,
      arquivoFoto,
      comentario,
      localDeArmazenagem
    })

    try {
      await this.repository.save(newvolume)

      return ok(newvolume)
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

export { VolumeRepository }
