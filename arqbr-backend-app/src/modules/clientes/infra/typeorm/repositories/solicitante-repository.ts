import { Brackets, getRepository, Repository } from 'typeorm'
import { ISolicitanteDTO } from '@modules/clientes/dtos/i-solicitante-dto'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'
import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class SolicitanteRepository implements ISolicitanteRepository {
  private repository: Repository<Solicitante>

  constructor() {
    this.repository = getRepository(Solicitante)
  }


  // create
  async create ({
    clienteId,
    departamentoId,
    nome,
    email,
    telefonesFixos,
    celular,
    gerenteDepartamento,
    gestorContrato,
    desabilitado
  }: ISolicitanteDTO): Promise<HttpResponse> {
    const solicitante = this.repository.create({
      clienteId,
      departamentoId,
      nome,
      email,
      telefonesFixos,
      celular,
      gerenteDepartamento,
      gestorContrato,
      desabilitado
    })

    const result = await this.repository.save(solicitante)
      .then(solicitanteResult => {
        return ok(solicitanteResult)
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
      "departamentoNome",
      "nome",
      "email",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('sol')
        .select([
          'sol.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'b.id as "departamentoId"',
          'b.nome as "departamentoNome"',
          'sol.nome as "nome"',
          'sol.email as "email"',
        ])
        .leftJoin('sol.clienteId', 'a')
        .leftJoin('sol.departamentoId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const solicitantes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(sol.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(sol.email AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('b.nome', columnOrder[1])
        .addOrderBy('sol.nome', columnOrder[2])
        .addOrderBy('sol.email', columnOrder[3])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(solicitantes)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string, departamentoId): Promise<HttpResponse> {
    try {
      const solicitantes = await this.repository.createQueryBuilder('sol')
        .select([
          'sol.id as "value"',
          'sol.nome as "label"',
        ])
        .where('sol.departamentoId = :departamentoId', { departamentoId: `${departamentoId}`})
        .andWhere('sol.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('sol.nome')
        .getRawMany()

      return ok(solicitantes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const solicitante = await this.repository.createQueryBuilder('sol')
        .select([
          'sol.id as "value"',
          'sol.nome as "label"',
        ])
        .where('sol.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(solicitante)
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
      let query = this.repository.createQueryBuilder('sol')
        .select([
          'sol.id as "id"',
        ])
        .leftJoin('sol.clienteId', 'a')
        .leftJoin('sol.departamentoId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const solicitantes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(sol.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(sol.email AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: solicitantes.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const solicitante = await this.repository.createQueryBuilder('sol')
        .select([
          'sol.id as "id"',
          'sol.clienteId as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'sol.departamentoId as "departamentoId"',
          'b.nome as "departamentoNome"',
          'sol.nome as "nome"',
          'sol.email as "email"',
          'sol.telefonesFixos as "telefonesFixos"',
          'sol.celular as "celular"',
          'sol.gerenteDepartamento as "gerenteDepartamento"',
          'sol.gestorContrato as "gestorContrato"',
          'sol.desabilitado as "desabilitado"',
        ])
        .leftJoin('sol.clienteId', 'a')
        .leftJoin('sol.departamentoId', 'b')
        .where('sol.id = :id', { id })
        .getRawOne()

      if (typeof solicitante === 'undefined') {
        return noContent()
      }

      return ok(solicitante)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    departamentoId,
    nome,
    email,
    telefonesFixos,
    celular,
    gerenteDepartamento,
    gestorContrato,
    desabilitado
  }: ISolicitanteDTO): Promise<HttpResponse> {
    const solicitante = await this.repository.findOne(id)

    if (!solicitante) {
      return notFound()
    }

    const newsolicitante = this.repository.create({
      id,
      clienteId,
      departamentoId,
      nome,
      email,
      telefonesFixos,
      celular,
      gerenteDepartamento,
      gestorContrato,
      desabilitado
    })

    try {
      await this.repository.save(newsolicitante)

      return ok(newsolicitante)
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

export { SolicitanteRepository }
