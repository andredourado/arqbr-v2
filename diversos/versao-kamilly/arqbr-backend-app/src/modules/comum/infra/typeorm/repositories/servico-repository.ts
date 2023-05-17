import { getRepository, Repository } from 'typeorm'
import { IServicoDTO } from '@modules/comum/dtos/i-servico-dto'
import { IServicoRepository } from '@modules/comum/repositories/i-servico-repository'
import { Servico } from '@modules/comum/infra/typeorm/entities/servico'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class ServicoRepository implements IServicoRepository {
  private repository: Repository<Servico>

  constructor() {
    this.repository = getRepository(Servico)
  }


  // create
  async create ({
    descricao,
    desabilitado
  }: IServicoDTO): Promise<HttpResponse> {
    const servico = this.repository.create({
      descricao,
      desabilitado
    })

    const result = await this.repository.save(servico)
      .then(servicoResult => {
        return ok(servicoResult)
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
      let servicos = await this.repository.createQueryBuilder('ser')
        .select([
          'ser.id as "id"',
          'ser.descricao as "descricao"',
        ])
        .where('ser.descricao ilike :search', { search: `%${search}%` })
        .addOrderBy('ser.descricao', columnOrder[0])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (servicos.length > rowsPerPage) {
        servicos = servicos.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(servicos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const servicos = await this.repository.createQueryBuilder('ser')
        .select([
          'ser.id as "value"',
          'ser.descricao as "label"',
        ])
        .where('ser.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('ser.descricao')
        .getRawMany()

      return ok(servicos)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const servico = await this.repository.createQueryBuilder('ser')
        .select([
          'ser.id as "value"',
          'ser.descricao as "label"',
        ])
        .where('ser.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(servico)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const servicos = await this.repository.createQueryBuilder('ser')
        .select([
          'ser.id as "id"',
        ])
        .where('ser.descricao ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: servicos.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const servico = await this.repository.createQueryBuilder('ser')
        .select([
          'ser.id as "id"',
          'ser.descricao as "descricao"',
          'ser.desabilitado as "desabilitado"',
        ])
        .where('ser.id = :id', { id })
        .getRawOne()

      if (typeof servico === 'undefined') {
        return noContent()
      }

      return ok(servico)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    descricao,
    desabilitado
  }: IServicoDTO): Promise<HttpResponse> {
    const servico = await this.repository.findOne(id)

    if (!servico) {
      return notFound()
    }

    const newservico = this.repository.create({
      id,
      descricao,
      desabilitado
    })

    try {
      await this.repository.save(newservico)

      return ok(newservico)
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

export { ServicoRepository }
