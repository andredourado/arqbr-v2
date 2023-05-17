import { Brackets, getRepository, Repository } from 'typeorm'
import { IEntregadorDTO } from '@modules/coleta/dtos/i-entregador-dto'
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository'
import { Entregador } from '@modules/coleta/infra/typeorm/entities/entregador'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class EntregadorRepository implements IEntregadorRepository {
  private repository: Repository<Entregador>

  constructor() {
    this.repository = getRepository(Entregador)
  }


  // create
  async create ({
    cpfCnpj,
    nome,
    email,
    endereco,
    numero,
    complemento,
    cep,
    telefonesFixos,
    celular,
    desabilitado
  }: IEntregadorDTO): Promise<HttpResponse> {
    const entregador = this.repository.create({
      cpfCnpj,
      nome,
      email,
      endereco,
      numero,
      complemento,
      cep,
      telefonesFixos,
      celular,
      desabilitado
    })

    const result = await this.repository.save(entregador)
      .then(entregadorResult => {
        return ok(entregadorResult)
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
      "cpfCnpj",
      "nome",
      "email",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('ent')
        .select([
          'ent.id as "id"',
          'ent.cpfCnpj as "cpfCnpj"',
          'ent.nome as "nome"',
          'ent.email as "email"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const entregadores = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(ent.cpfCnpj AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(ent.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(ent.email AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('ent.cpfCnpj', columnOrder[0])
        .addOrderBy('ent.nome', columnOrder[1])
        .addOrderBy('ent.email', columnOrder[2])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(entregadores)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const entregadores = await this.repository.createQueryBuilder('ent')
        .select([
          'ent.id as "value"',
          'ent.nome as "label"',
        ])
        .where('ent.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('ent.nome')
        .getRawMany()

      return ok(entregadores)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const entregador = await this.repository.createQueryBuilder('ent')
        .select([
          'ent.id as "value"',
          'ent.nome as "label"',
        ])
        .where('ent.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(entregador)
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
      let query = this.repository.createQueryBuilder('ent')
        .select([
          'ent.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const entregadores = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(ent.cpfCnpj AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(ent.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(ent.email AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: entregadores.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const entregador = await this.repository.createQueryBuilder('ent')
        .select([
          'ent.id as "id"',
          'ent.cpfCnpj as "cpfCnpj"',
          'ent.nome as "nome"',
          'ent.email as "email"',
          'ent.endereco as "endereco"',
          'ent.numero as "numero"',
          'ent.complemento as "complemento"',
          'ent.cep as "cep"',
          'ent.telefonesFixos as "telefonesFixos"',
          'ent.celular as "celular"',
          'ent.desabilitado as "desabilitado"',
        ])
        .where('ent.id = :id', { id })
        .getRawOne()

      if (typeof entregador === 'undefined') {
        return noContent()
      }

      return ok(entregador)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    cpfCnpj,
    nome,
    email,
    endereco,
    numero,
    complemento,
    cep,
    telefonesFixos,
    celular,
    desabilitado
  }: IEntregadorDTO): Promise<HttpResponse> {
    const entregador = await this.repository.findOne(id)

    if (!entregador) {
      return notFound()
    }

    const newentregador = this.repository.create({
      id,
      cpfCnpj,
      nome,
      email,
      endereco,
      numero,
      complemento,
      cep,
      telefonesFixos,
      celular,
      desabilitado
    })

    try {
      await this.repository.save(newentregador)

      return ok(newentregador)
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

export { EntregadorRepository }
