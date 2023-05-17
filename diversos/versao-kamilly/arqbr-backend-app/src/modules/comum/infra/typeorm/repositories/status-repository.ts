import { getRepository, Repository } from 'typeorm'
import { IStatusDTO } from '@modules/comum/dtos/i-status-dto'
import { IStatusRepository } from '@modules/comum/repositories/i-status-repository'
import { Status } from '@modules/comum/infra/typeorm/entities/status'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class StatusRepository implements IStatusRepository {
  private repository: Repository<Status>

  constructor() {
    this.repository = getRepository(Status)
  }


  // create
  async create ({
    servicoId,
    sequencia,
    descricao,
    desabilitado
  }: IStatusDTO): Promise<HttpResponse> {
    const status = this.repository.create({
      servicoId,
      sequencia,
      descricao,
      desabilitado
    })

    const result = await this.repository.save(status)
      .then(statusResult => {
        return ok(statusResult)
      })
      .catch(error => {
        return serverError(error.message)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
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
      "servicoDescricao",
      "sequencia",
      "descricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let statuses = await this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "id"',
          'a.id as "servicoId"',
          'a.descricao as "servicoDescricao"',
          'sta.sequencia as "sequencia"',
          'sta.descricao as "descricao"',
        ])
        .leftJoin('sta.servicoId', 'a')
        .where('a.descricao ilike :search', { search: `%${search}%` })
        .orWhere('sta.sequencia ilike :search', { search: `%${search}%` })
        .orWhere('sta.descricao ilike :search', { search: `%${search}%` })
        .addOrderBy('a.descricao', columnOrder[0])
        .addOrderBy('sta.sequencia', columnOrder[1])
        .addOrderBy('sta.descricao', columnOrder[2])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (statuses.length > rowsPerPage) {
        statuses = statuses.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(statuses)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const statuses = await this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "value"',
          'sta.descricao as "label"',
        ])
        .where('sta.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('sta.descricao')
        .getRawMany()

      return ok(statuses)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const status = await this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "value"',
          'sta.descricao as "label"',
        ])
        .where('sta.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(status)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const statuses = await this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "id"',
        ])
        .leftJoin('sta.servicoId', 'a')
        .where('a.descricao ilike :search', { search: `%${search}%` })
        .orWhere('sta.sequencia ilike :search', { search: `%${search}%` })
        .orWhere('sta.descricao ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: statuses.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const status = await this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "id"',
          'sta.servicoId as "servicoId"',
          'sta.sequencia as "sequencia"',
          'sta.descricao as "descricao"',
          'sta.desabilitado as "desabilitado"',
        ])
        .where('sta.id = :id', { id })
        .getRawOne()

      if (typeof status === 'undefined') {
        return noContent()
      }

      return ok(status)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    servicoId,
    sequencia,
    descricao,
    desabilitado
  }: IStatusDTO): Promise<HttpResponse> {
    const status = await this.repository.findOne(id)

    if (!status) {
      return notFound()
    }

    const newstatus = this.repository.create({
      id,
      servicoId,
      sequencia,
      descricao,
      desabilitado
    })

    try {
      await this.repository.save(newstatus)

      return ok(newstatus)
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

export { StatusRepository }
