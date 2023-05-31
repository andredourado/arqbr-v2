import { Brackets, getRepository, Repository } from 'typeorm'
import { IDepartamentoDTO } from '@modules/clientes/dtos/i-departamento-dto'
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class DepartamentoRepository implements IDepartamentoRepository {
  private repository: Repository<Departamento>

  constructor() {
    this.repository = getRepository(Departamento)
  }


  // create
  async create ({
    clienteId,
    nome,
    desabilitado
  }: IDepartamentoDTO): Promise<HttpResponse> {
    const departamento = this.repository.create({
      clienteId,
      nome,
      desabilitado
    })

    const result = await this.repository.save(departamento)
      .then(departamentoResult => {
        return ok(departamentoResult)
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
      "nome",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('dep')
        .select([
          'dep.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'dep.nome as "nome"',
        ])
        .leftJoin('dep.clienteId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const departamentos = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(dep.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('dep.nome', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(departamentos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string, clienteId): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('dep')
        .select([
          'dep.id as "value"',
          'dep.nome as "label"',
        ])

        if (clienteId) {
          query = query
            .where('dep.clienteId = :clienteId', { clienteId: `${clienteId}`})
        }

      const departamentos = await query
        .andWhere('dep.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('dep.nome')
        .getRawMany()

      return ok(departamentos)
    } catch (err) {
      return serverError(err)
    }
  }


  // selectFiltered
  async selectFiltered (filter: string, clienteId): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('dep')
        .select([
          'dep.id as "value"',
          'dep.nome as "label"',
        ])
        .innerJoin('documentos_digitais', 'a', 'a.departamentoId = dep.id')

        if (clienteId) {
          query = query
            .where('dep.clienteId = :clienteId', { clienteId: `${clienteId}`})
        }

      const departamentos = await query
        .andWhere('dep.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('dep.nome')
        .getRawMany()

      return ok(departamentos)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const departamento = await this.repository.createQueryBuilder('dep')
        .select([
          'dep.id as "value"',
          'dep.nome as "label"',
        ])
        .where('dep.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(departamento)
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
      let query = this.repository.createQueryBuilder('dep')
        .select([
          'dep.id as "id"',
        ])
        .leftJoin('dep.clienteId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const departamentos = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(dep.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: departamentos.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const departamento = await this.repository.createQueryBuilder('dep')
        .select([
          'dep.id as "id"',
          'dep.clienteId as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'dep.nome as "nome"',
          'dep.desabilitado as "desabilitado"',
        ])
        .leftJoin('dep.clienteId', 'a')
        .where('dep.id = :id', { id })
        .getRawOne()

      if (typeof departamento === 'undefined') {
        return noContent()
      }

      return ok(departamento)
    } catch (err) {
      return serverError(err)
    }
  }


  // get by identificador
  async getByIdentificador (identificador: string): Promise<HttpResponse> {
    try {
      const departamento = await this.repository.findOne({ identificador })

      if (typeof departamento === 'undefined') {
        return noContent()
      }

      return ok(departamento)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    nome,
    desabilitado
  }: IDepartamentoDTO): Promise<HttpResponse> {
    const departamento = await this.repository.findOne(id)

    if (!departamento) {
      return notFound()
    }

    const newdepartamento = this.repository.create({
      id,
      clienteId,
      nome,
      desabilitado
    })

    try {
      await this.repository.save(newdepartamento)

      return ok(newdepartamento)
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

export { DepartamentoRepository }
