import { Brackets, getRepository, Repository } from 'typeorm'
import { ISugestaoDTO } from '@modules/clientes/dtos/i-sugestao-dto'
import { ISugestaoRepository } from '@modules/clientes/repositories/i-sugestao-repository'
import { Sugestao } from '@modules/clientes/infra/typeorm/entities/sugestao'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class SugestaoRepository implements ISugestaoRepository {
  private repository: Repository<Sugestao>

  constructor() {
    this.repository = getRepository(Sugestao)
  }


  // create
  async create ({
    clienteId,
    departamentoId,
    solicitanteId,
    titulo,
    descricao,
    atendido
  }: ISugestaoDTO): Promise<HttpResponse> {
    const sugestao = this.repository.create({
      clienteId,
      departamentoId,
      solicitanteId,
      titulo,
      descricao,
      atendido
    })

    const result = await this.repository.save(sugestao)
      .then(sugestaoResult => {
        return ok(sugestaoResult)
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
      "solicitanteNome",
      "titulo",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('sug')
        .select([
          'sug.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'b.id as "departamentoId"',
          'b.nome as "departamentoNome"',
          'c.id as "solicitanteId"',
          'c.nome as "solicitanteNome"',
          'sug.titulo as "titulo"',
        ])
        .leftJoin('sug.clienteId', 'a')
        .leftJoin('sug.departamentoId', 'b')
        .leftJoin('sug.solicitanteId', 'c')

      if (filter) {
        query = query
          .where(filter)
      }

      const sugestoes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(sug.titulo AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('b.nome', columnOrder[1])
        .addOrderBy('c.nome', columnOrder[2])
        .addOrderBy('sug.titulo', columnOrder[3])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(sugestoes)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const sugestoes = await this.repository.createQueryBuilder('sug')
        .select([
          'sug. as "value"',
          'sug. as "label"',
        ])
        .where('sug. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('sug.')
        .getRawMany()

      return ok(sugestoes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const sugestao = await this.repository.createQueryBuilder('sug')
        .select([
          'sug. as "value"',
          'sug. as "label"',
        ])
        .where('sug. = :id', { id: `${id}` })
        .getRawOne()

      return ok(sugestao)
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
      let query = this.repository.createQueryBuilder('sug')
        .select([
          'sug.id as "id"',
        ])
        .leftJoin('sug.clienteId', 'a')
        .leftJoin('sug.departamentoId', 'b')
        .leftJoin('sug.solicitanteId', 'c')

      if (filter) {
        query = query
          .where(filter)
      }

      const sugestoes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(sug.titulo AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: sugestoes.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const sugestao = await this.repository.createQueryBuilder('sug')
        .select([
          'sug.id as "id"',
          'sug.clienteId as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'sug.departamentoId as "departamentoId"',
          'b.nome as "departamentoNome"',
          'sug.solicitanteId as "solicitanteId"',
          'c.nome as "solicitanteNome"',
          'sug.titulo as "titulo"',
          'sug.descricao as "descricao"',
          'sug.atendido as "atendido"',
        ])
        .leftJoin('sug.clienteId', 'a')
        .leftJoin('sug.departamentoId', 'b')
        .leftJoin('sug.solicitanteId', 'c')
        .where('sug.id = :id', { id })
        .getRawOne()

      if (typeof sugestao === 'undefined') {
        return noContent()
      }

      return ok(sugestao)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    departamentoId,
    solicitanteId,
    titulo,
    descricao,
    atendido
  }: ISugestaoDTO): Promise<HttpResponse> {
    const sugestao = await this.repository.findOne(id)

    if (!sugestao) {
      return notFound()
    }

    const newsugestao = this.repository.create({
      id,
      clienteId,
      departamentoId,
      solicitanteId,
      titulo,
      descricao,
      atendido
    })

    try {
      await this.repository.save(newsugestao)

      return ok(newsugestao)
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

export { SugestaoRepository }
