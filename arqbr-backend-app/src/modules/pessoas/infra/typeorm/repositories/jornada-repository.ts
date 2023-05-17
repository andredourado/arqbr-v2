import { Brackets, getRepository, Repository } from 'typeorm'
import { IJornadaDTO } from '@modules/pessoas/dtos/i-jornada-dto'
import { IJornadaRepository } from '@modules/pessoas/repositories/i-jornada-repository'
import { Jornada } from '@modules/pessoas/infra/typeorm/entities/jornada'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class JornadaRepository implements IJornadaRepository {
  private repository: Repository<Jornada>

  constructor() {
    this.repository = getRepository(Jornada)
  }


  // create
  async create ({
    descricao,
    segPrimeiraInicio,
    segPrimeiraFim,
    segSegundaInicio,
    segSegundaFim,
    terPrimeiraInicio,
    terPrimeiraFim,
    terSegundaInicio,
    terSegundaFim,
    quaPrimeiraInicio,
    quaPrimeiraFim,
    quaSegundaInicio,
    quaSegundaFim,
    quiPrimeiraInicio,
    quiPrimeiraFim,
    quiSegundaInicio,
    quiSegundaFim,
    sexPrimeiraInicio,
    sexPrimeiraFim,
    sexSegundaInicio,
    sexSegundaFim,
    sabPrimeiraInicio,
    sabPrimeiraFim,
    sabSegundaInicio,
    sabSegundaFim,
    domPrimeiraInicio,
    domPrimeiraFim,
    domSegundaInicio,
    domSegundaFim,
    desabilitado
  }: IJornadaDTO): Promise<HttpResponse> {
    const jornada = this.repository.create({
      descricao,
      segPrimeiraInicio,
      segPrimeiraFim,
      segSegundaInicio,
      segSegundaFim,
      terPrimeiraInicio,
      terPrimeiraFim,
      terSegundaInicio,
      terSegundaFim,
      quaPrimeiraInicio,
      quaPrimeiraFim,
      quaSegundaInicio,
      quaSegundaFim,
      quiPrimeiraInicio,
      quiPrimeiraFim,
      quiSegundaInicio,
      quiSegundaFim,
      sexPrimeiraInicio,
      sexPrimeiraFim,
      sexSegundaInicio,
      sexSegundaFim,
      sabPrimeiraInicio,
      sabPrimeiraFim,
      sabSegundaInicio,
      sabSegundaFim,
      domPrimeiraInicio,
      domPrimeiraFim,
      domSegundaInicio,
      domSegundaFim,
      desabilitado
    })

    const result = await this.repository.save(jornada)
      .then(jornadaResult => {
        return ok(jornadaResult)
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
      let query = this.repository.createQueryBuilder('jor')
        .select([
          'jor.id as "id"',
          'jor.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const jornadas = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(jor.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('jor.descricao', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(jornadas)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const jornadas = await this.repository.createQueryBuilder('jor')
        .select([
          'jor.id as "value"',
          'jor.descricao as "label"',
        ])
        .where('jor.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('jor.descricao')
        .getRawMany()

      return ok(jornadas)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const jornada = await this.repository.createQueryBuilder('jor')
        .select([
          'jor.id as "value"',
          'jor.descricao as "label"',
        ])
        .where('jor.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(jornada)
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
      let query = this.repository.createQueryBuilder('jor')
        .select([
          'jor.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const jornadas = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(jor.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: jornadas.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const jornada = await this.repository.createQueryBuilder('jor')
        .select([
          'jor.id as "id"',
          'jor.descricao as "descricao"',
          'jor.segPrimeiraInicio as "segPrimeiraInicio"',
          'jor.segPrimeiraFim as "segPrimeiraFim"',
          'jor.segSegundaInicio as "segSegundaInicio"',
          'jor.segSegundaFim as "segSegundaFim"',
          'jor.terPrimeiraInicio as "terPrimeiraInicio"',
          'jor.terPrimeiraFim as "terPrimeiraFim"',
          'jor.terSegundaInicio as "terSegundaInicio"',
          'jor.terSegundaFim as "terSegundaFim"',
          'jor.quaPrimeiraInicio as "quaPrimeiraInicio"',
          'jor.quaPrimeiraFim as "quaPrimeiraFim"',
          'jor.quaSegundaInicio as "quaSegundaInicio"',
          'jor.quaSegundaFim as "quaSegundaFim"',
          'jor.quiPrimeiraInicio as "quiPrimeiraInicio"',
          'jor.quiPrimeiraFim as "quiPrimeiraFim"',
          'jor.quiSegundaInicio as "quiSegundaInicio"',
          'jor.quiSegundaFim as "quiSegundaFim"',
          'jor.sexPrimeiraInicio as "sexPrimeiraInicio"',
          'jor.sexPrimeiraFim as "sexPrimeiraFim"',
          'jor.sexSegundaInicio as "sexSegundaInicio"',
          'jor.sexSegundaFim as "sexSegundaFim"',
          'jor.sabPrimeiraInicio as "sabPrimeiraInicio"',
          'jor.sabPrimeiraFim as "sabPrimeiraFim"',
          'jor.sabSegundaInicio as "sabSegundaInicio"',
          'jor.sabSegundaFim as "sabSegundaFim"',
          'jor.domPrimeiraInicio as "domPrimeiraInicio"',
          'jor.domPrimeiraFim as "domPrimeiraFim"',
          'jor.domSegundaInicio as "domSegundaInicio"',
          'jor.domSegundaFim as "domSegundaFim"',
          'jor.desabilitado as "desabilitado"',
        ])
        .where('jor.id = :id', { id })
        .getRawOne()

      if (typeof jornada === 'undefined') {
        return noContent()
      }

      return ok(jornada)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    descricao,
    segPrimeiraInicio,
    segPrimeiraFim,
    segSegundaInicio,
    segSegundaFim,
    terPrimeiraInicio,
    terPrimeiraFim,
    terSegundaInicio,
    terSegundaFim,
    quaPrimeiraInicio,
    quaPrimeiraFim,
    quaSegundaInicio,
    quaSegundaFim,
    quiPrimeiraInicio,
    quiPrimeiraFim,
    quiSegundaInicio,
    quiSegundaFim,
    sexPrimeiraInicio,
    sexPrimeiraFim,
    sexSegundaInicio,
    sexSegundaFim,
    sabPrimeiraInicio,
    sabPrimeiraFim,
    sabSegundaInicio,
    sabSegundaFim,
    domPrimeiraInicio,
    domPrimeiraFim,
    domSegundaInicio,
    domSegundaFim,
    desabilitado
  }: IJornadaDTO): Promise<HttpResponse> {
    const jornada = await this.repository.findOne(id)

    if (!jornada) {
      return notFound()
    }

    const newjornada = this.repository.create({
      id,
      descricao,
      segPrimeiraInicio,
      segPrimeiraFim,
      segSegundaInicio,
      segSegundaFim,
      terPrimeiraInicio,
      terPrimeiraFim,
      terSegundaInicio,
      terSegundaFim,
      quaPrimeiraInicio,
      quaPrimeiraFim,
      quaSegundaInicio,
      quaSegundaFim,
      quiPrimeiraInicio,
      quiPrimeiraFim,
      quiSegundaInicio,
      quiSegundaFim,
      sexPrimeiraInicio,
      sexPrimeiraFim,
      sexSegundaInicio,
      sexSegundaFim,
      sabPrimeiraInicio,
      sabPrimeiraFim,
      sabSegundaInicio,
      sabSegundaFim,
      domPrimeiraInicio,
      domPrimeiraFim,
      domSegundaInicio,
      domSegundaFim,
      desabilitado
    })

    try {
      await this.repository.save(newjornada)

      return ok(newjornada)
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

export { JornadaRepository }
