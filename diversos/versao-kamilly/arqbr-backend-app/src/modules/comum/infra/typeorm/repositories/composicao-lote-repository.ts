import { getRepository, Repository } from 'typeorm'
import { IComposicaoLoteDTO } from '@modules/comum/dtos/i-composicao-lote-dto'
import { IComposicaoLoteRepository } from '@modules/comum/repositories/i-composicao-lote-repository'
import { ComposicaoLote } from '@modules/comum/infra/typeorm/entities/composicao-lote'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class ComposicaoLoteRepository implements IComposicaoLoteRepository {
  private repository: Repository<ComposicaoLote>

  constructor() {
    this.repository = getRepository(ComposicaoLote)
  }


  // create
  async create ({
    descricao,
    desabilitado
  }: IComposicaoLoteDTO): Promise<HttpResponse> {
    const composicaoLote = this.repository.create({
      descricao,
      desabilitado
    })

    const result = await this.repository.save(composicaoLote)
      .then(composicaoLoteResult => {
        return ok(composicaoLoteResult)
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
      let composicaoLotes = await this.repository.createQueryBuilder('com')
        .select([
          'com.id as "id"',
          'com.descricao as "descricao"',
        ])
        .where('com.descricao ilike :search', { search: `%${search}%` })
        .addOrderBy('com.descricao', columnOrder[0])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (composicaoLotes.length > rowsPerPage) {
        composicaoLotes = composicaoLotes.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(composicaoLotes)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const composicaoLotes = await this.repository.createQueryBuilder('com')
        .select([
          'com.id as "value"',
          'com.descricao as "label"',
        ])
        .where('com.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('com.descricao')
        .getRawMany()

      return ok(composicaoLotes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const composicaoLote = await this.repository.createQueryBuilder('com')
        .select([
          'com.id as "value"',
          'com.descricao as "label"',
        ])
        .where('com.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(composicaoLote)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const composicaoLotes = await this.repository.createQueryBuilder('com')
        .select([
          'com.id as "id"',
        ])
        .where('com.descricao ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: composicaoLotes.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const composicaoLote = await this.repository.createQueryBuilder('com')
        .select([
          'com.id as "id"',
          'com.descricao as "descricao"',
          'com.desabilitado as "desabilitado"',
        ])
        .where('com.id = :id', { id })
        .getRawOne()

      if (typeof composicaoLote === 'undefined') {
        return noContent()
      }

      return ok(composicaoLote)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    descricao,
    desabilitado
  }: IComposicaoLoteDTO): Promise<HttpResponse> {
    const composicaoLote = await this.repository.findOne(id)

    if (!composicaoLote) {
      return notFound()
    }

    const newcomposicaoLote = this.repository.create({
      id,
      descricao,
      desabilitado
    })

    try {
      await this.repository.save(newcomposicaoLote)

      return ok(newcomposicaoLote)
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

export { ComposicaoLoteRepository }
