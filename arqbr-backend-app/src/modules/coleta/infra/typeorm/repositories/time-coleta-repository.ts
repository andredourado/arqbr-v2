import { Brackets, getRepository, Repository } from 'typeorm'
import { ITimeColetaDTO } from '@modules/coleta/dtos/i-time-coleta-dto'
import { ITimeColetaRepository } from '@modules/coleta/repositories/i-time-coleta-repository'
import { TimeColeta } from '@modules/coleta/infra/typeorm/entities/time-coleta'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class TimeColetaRepository implements ITimeColetaRepository {
  private repository: Repository<TimeColeta>

  constructor() {
    this.repository = getRepository(TimeColeta)
  }


  // create
  async create ({
    coletaId,
    pessoaId
  }: ITimeColetaDTO): Promise<HttpResponse> {
    const timeColeta = this.repository.create({
      coletaId,
      pessoaId
    })

    const result = await this.repository.save(timeColeta)
      .then(timeColetaResult => {
        return ok(timeColetaResult)
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
      "pessoaNome",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('tim')
        .select([
          'tim.id as "id"',
          'a.id as "coletaId"',
          'a.identificador as "coletaIdentificador"',
          'b.id as "pessoaId"',
          'b.nome as "pessoaNome"',
        ])
        .leftJoin('tim.coletaId', 'a')
        .leftJoin('tim.pessoaId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const timesColeta = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.identificador AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.identificador', columnOrder[0])
        .addOrderBy('b.nome', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(timesColeta)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const timesColeta = await this.repository.createQueryBuilder('tim')
        .select([
          'tim. as "value"',
          'tim. as "label"',
        ])
        .where('tim. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('tim.')
        .getRawMany()

      return ok(timesColeta)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const timeColeta = await this.repository.createQueryBuilder('tim')
        .select([
          'tim. as "value"',
          'tim. as "label"',
        ])
        .where('tim. = :id', { id: `${id}` })
        .getRawOne()

      return ok(timeColeta)
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
      let query = this.repository.createQueryBuilder('tim')
        .select([
          'tim.id as "id"',
        ])
        .leftJoin('tim.coletaId', 'a')
        .leftJoin('tim.pessoaId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const timesColeta = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.identificador AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: timesColeta.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const timeColeta = await this.repository.createQueryBuilder('tim')
        .select([
          'tim.id as "id"',
          'tim.coletaId as "coletaId"',
          'a.identificador as "coletaIdentificador"',
          'tim.pessoaId as "pessoaId"',
          'b.nome as "pessoaNome"',
        ])
        .leftJoin('tim.coletaId', 'a')
        .leftJoin('tim.pessoaId', 'b')
        .where('tim.id = :id', { id })
        .getRawOne()

      if (typeof timeColeta === 'undefined') {
        return noContent()
      }

      return ok(timeColeta)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    coletaId,
    pessoaId
  }: ITimeColetaDTO): Promise<HttpResponse> {
    const timeColeta = await this.repository.findOne(id)

    if (!timeColeta) {
      return notFound()
    }

    const newtimeColeta = this.repository.create({
      id,
      coletaId,
      pessoaId
    })

    try {
      await this.repository.save(newtimeColeta)

      return ok(newtimeColeta)
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

export { TimeColetaRepository }
