import { Brackets, getRepository, Repository } from 'typeorm'
import { IClienteDTO } from '@modules/clientes/dtos/i-cliente-dto'
import { IClienteRepository } from '@modules/clientes/repositories/i-cliente-repository'
import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class ClienteRepository implements IClienteRepository {
  private repository: Repository<Cliente>

  constructor() {
    this.repository = getRepository(Cliente)
  }


  // create
  async create ({
    cnpj,
    nomeFantasia,
    razaoSocial,
    inscricaoEstadual,
    endereco,
    numero,
    complemento,
    estadoId,
    cidadeId,
    cep,
    desabilitado
  }: IClienteDTO): Promise<HttpResponse> {
    const cliente = this.repository.create({
      cnpj,
      nomeFantasia,
      razaoSocial,
      inscricaoEstadual,
      endereco,
      numero,
      complemento,
      estadoId,
      cidadeId,
      cep,
      desabilitado
    })

    const result = await this.repository.save(cliente)
      .then(clienteResult => {
        return ok(clienteResult)
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
      "cnpj",
      "nomeFantasia",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('cli')
        .select([
          'cli.id as "id"',
          'cli.cnpj as "cnpj"',
          'cli.nomeFantasia as "nomeFantasia"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const clientes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cli.cnpj AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cli.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('cli.cnpj', columnOrder[0])
        .addOrderBy('cli.nomeFantasia', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(clientes)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const clientes = await this.repository.createQueryBuilder('cli')
        .select([
          'cli.id as "value"',
          'cli.nomeFantasia as "label"',
        ])
        .where('cli.nomeFantasia ilike :filter', { filter: `${filter}%` })
        .addOrderBy('cli.nomeFantasia')
        .getRawMany()

      return ok(clientes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const cliente = await this.repository.createQueryBuilder('cli')
        .select([
          'cli.id as "value"',
          'cli.nomeFantasia as "label"',
        ])
        .where('cli.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(cliente)
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
      let query = this.repository.createQueryBuilder('cli')
        .select([
          'cli.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const clientes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cli.cnpj AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cli.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: clientes.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const cliente = await this.repository.createQueryBuilder('cli')
        .select([
          'cli.id as "id"',
          'cli.cnpj as "cnpj"',
          'cli.nomeFantasia as "nomeFantasia"',
          'cli.razaoSocial as "razaoSocial"',
          'cli.inscricaoEstadual as "inscricaoEstadual"',
          'cli.endereco as "endereco"',
          'cli.numero as "numero"',
          'cli.complemento as "complemento"',
          'cli.estadoId as "estadoId"',
          'a.uf as "estadoUf"',
          'cli.cidadeId as "cidadeId"',
          'b.nomeCidade as "cidadeNomeCidade"',
          'cli.cep as "cep"',
          'cli.desabilitado as "desabilitado"',
        ])
        .leftJoin('cli.estadoId', 'a')
        .leftJoin('cli.cidadeId', 'b')
        .where('cli.id = :id', { id })
        .getRawOne()

      if (typeof cliente === 'undefined') {
        return noContent()
      }

      return ok(cliente)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    cnpj,
    nomeFantasia,
    razaoSocial,
    inscricaoEstadual,
    endereco,
    numero,
    complemento,
    estadoId,
    cidadeId,
    cep,
    desabilitado
  }: IClienteDTO): Promise<HttpResponse> {
    const cliente = await this.repository.findOne(id)

    if (!cliente) {
      return notFound()
    }

    const newcliente = this.repository.create({
      id,
      cnpj,
      nomeFantasia,
      razaoSocial,
      inscricaoEstadual,
      endereco,
      numero,
      complemento,
      estadoId,
      cidadeId,
      cep,
      desabilitado
    })

    try {
      await this.repository.save(newcliente)

      return ok(newcliente)
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

export { ClienteRepository }
