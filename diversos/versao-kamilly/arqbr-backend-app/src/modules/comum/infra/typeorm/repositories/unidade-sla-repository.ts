import { getRepository, Repository } from 'typeorm'
import { IUnidadeSlaDTO } from '@modules/comum/dtos/i-unidade-sla-dto'
import { IUnidadeSlaRepository } from '@modules/comum/repositories/i-unidade-sla-repository'
import { UnidadeSla } from '@modules/comum/infra/typeorm/entities/unidade-sla'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class UnidadeSlaRepository implements IUnidadeSlaRepository {
  private repository: Repository<UnidadeSla>

  constructor() {
    this.repository = getRepository(UnidadeSla)
  }


  // create
  async create ({
    descricao,
    desabilitado
  }: IUnidadeSlaDTO): Promise<HttpResponse> {
    const unidadeSla = this.repository.create({
      descricao,
      desabilitado
    })

    const result = await this.repository.save(unidadeSla)
      .then(unidadeSlaResult => {
        return ok(unidadeSlaResult)
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
      "descricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let unidadesSla = await this.repository.createQueryBuilder('uni')
        .select([
          'uni.id as "id"',
          'uni.descricao as "descricao"',
        ])
        .where('uni.descricao ilike :search', { search: `%${search}%` })
        .addOrderBy('uni.descricao', columnOrder[0])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (unidadesSla.length > rowsPerPage) {
        unidadesSla = unidadesSla.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(unidadesSla)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const unidadesSla = await this.repository.createQueryBuilder('uni')
        .select([
          'uni.id as "value"',
          'uni.descricao as "label"',
        ])
        .where('uni.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('uni.descricao')
        .getRawMany()

      return ok(unidadesSla)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const unidadeSla = await this.repository.createQueryBuilder('uni')
        .select([
          'uni.id as "value"',
          'uni.descricao as "label"',
        ])
        .where('uni.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(unidadeSla)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const unidadesSla = await this.repository.createQueryBuilder('uni')
        .select([
          'uni.id as "id"',
        ])
        .where('uni.descricao ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: unidadesSla.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const unidadeSla = await this.repository.createQueryBuilder('uni')
        .select([
          'uni.id as "id"',
          'uni.descricao as "descricao"',
          'uni.desabilitado as "desabilitado"',
        ])
        .where('uni.id = :id', { id })
        .getRawOne()

      if (typeof unidadeSla === 'undefined') {
        return noContent()
      }

      return ok(unidadeSla)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    descricao,
    desabilitado
  }: IUnidadeSlaDTO): Promise<HttpResponse> {
    const unidadeSla = await this.repository.findOne(id)

    if (!unidadeSla) {
      return notFound()
    }

    const newunidadeSla = this.repository.create({
      id,
      descricao,
      desabilitado
    })

    try {
      await this.repository.save(newunidadeSla)

      return ok(newunidadeSla)
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

export { UnidadeSlaRepository }
