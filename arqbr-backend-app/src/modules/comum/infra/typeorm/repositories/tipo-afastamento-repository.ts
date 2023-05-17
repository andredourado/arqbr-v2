import { Brackets, getRepository, Repository } from 'typeorm'
import { ITipoAfastamentoDTO } from '@modules/comum/dtos/i-tipo-afastamento-dto'
import { ITipoAfastamentoRepository } from '@modules/comum/repositories/i-tipo-afastamento-repository'
import { TipoAfastamento } from '@modules/comum/infra/typeorm/entities/tipo-afastamento'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class TipoAfastamentoRepository implements ITipoAfastamentoRepository {
  private repository: Repository<TipoAfastamento>

  constructor() {
    this.repository = getRepository(TipoAfastamento)
  }


  // create
  async create ({
    descricao,
    desabilitado
  }: ITipoAfastamentoDTO): Promise<HttpResponse> {
    const tipoAfastamento = this.repository.create({
      descricao,
      desabilitado
    })

    const result = await this.repository.save(tipoAfastamento)
      .then(tipoAfastamentoResult => {
        return ok(tipoAfastamentoResult)
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
      "descricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
          'tip.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const tiposAfastamento = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(tip.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('tip.descricao', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(tiposAfastamento)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const tiposAfastamento = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "value"',
          'tip.descricao as "label"',
        ])
        .where('tip.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('tip.descricao')
        .getRawMany()

      return ok(tiposAfastamento)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const tipoAfastamento = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "value"',
          'tip.descricao as "label"',
        ])
        .where('tip.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(tipoAfastamento)
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
      let query = this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const tiposAfastamento = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(tip.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: tiposAfastamento.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const tipoAfastamento = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
          'tip.descricao as "descricao"',
          'tip.desabilitado as "desabilitado"',
        ])
        .where('tip.id = :id', { id })
        .getRawOne()

      if (typeof tipoAfastamento === 'undefined') {
        return noContent()
      }

      return ok(tipoAfastamento)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    descricao,
    desabilitado
  }: ITipoAfastamentoDTO): Promise<HttpResponse> {
    const tipoAfastamento = await this.repository.findOne(id)

    if (!tipoAfastamento) {
      return notFound()
    }

    const newtipoAfastamento = this.repository.create({
      id,
      descricao,
      desabilitado
    })

    try {
      await this.repository.save(newtipoAfastamento)

      return ok(newtipoAfastamento)
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

export { TipoAfastamentoRepository }
