import { Brackets, getRepository, Repository } from 'typeorm'
import { IServicoContratadoDTO } from '@modules/clientes/dtos/i-servico-contratado-dto'
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository'
import { ServicoContratado } from '@modules/clientes/infra/typeorm/entities/servico-contratado'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class ServicoContratadoRepository implements IServicoContratadoRepository {
  private repository: Repository<ServicoContratado>

  constructor() {
    this.repository = getRepository(ServicoContratado)
  }


  // create
  async create ({
    clienteId,
    descricao,
    sla,
    desabilitado
  }: IServicoContratadoDTO): Promise<HttpResponse> {
    const servicoContratado = this.repository.create({
      clienteId,
      descricao,
      sla,
      desabilitado
    })

    const result = await this.repository.save(servicoContratado)
      .then(servicoContratadoResult => {
        return ok(servicoContratadoResult)
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
      "clienteNomeFantasia",
      "descricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('ser')
        .select([
          'ser.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'ser.descricao as "descricao"',
        ])
        .leftJoin('ser.clienteId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const servicosContratados = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(ser.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('ser.descricao', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(servicosContratados)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const servicosContratados = await this.repository.createQueryBuilder('ser')
        .select([
          'ser. as "value"',
          'ser. as "label"',
        ])
        .where('ser. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('ser.')
        .getRawMany()

      return ok(servicosContratados)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const servicoContratado = await this.repository.createQueryBuilder('ser')
        .select([
          'ser. as "value"',
          'ser. as "label"',
        ])
        .where('ser. = :id', { id: `${id}` })
        .getRawOne()

      return ok(servicoContratado)
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
      let query = this.repository.createQueryBuilder('ser')
        .select([
          'ser.id as "id"',
        ])
        .leftJoin('ser.clienteId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const servicosContratados = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(ser.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: servicosContratados.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const servicoContratado = await this.repository.createQueryBuilder('ser')
        .select([
          'ser.id as "id"',
          'ser.clienteId as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'ser.descricao as "descricao"',
          'ser.sla as "sla"',
          'ser.desabilitado as "desabilitado"',
        ])
        .leftJoin('ser.clienteId', 'a')
        .where('ser.id = :id', { id })
        .getRawOne()

      if (typeof servicoContratado === 'undefined') {
        return noContent()
      }

      return ok(servicoContratado)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    descricao,
    sla,
    desabilitado
  }: IServicoContratadoDTO): Promise<HttpResponse> {
    const servicoContratado = await this.repository.findOne(id)

    if (!servicoContratado) {
      return notFound()
    }

    const newservicoContratado = this.repository.create({
      id,
      clienteId,
      descricao,
      sla,
      desabilitado
    })

    try {
      await this.repository.save(newservicoContratado)

      return ok(newservicoContratado)
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

export { ServicoContratadoRepository }
