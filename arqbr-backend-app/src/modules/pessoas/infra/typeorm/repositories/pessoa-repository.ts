import { Brackets, getRepository, Repository } from 'typeorm'
import { IPessoaDTO } from '@modules/pessoas/dtos/i-pessoa-dto'
import { IPessoaRepository } from '@modules/pessoas/repositories/i-pessoa-repository'
import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class PessoaRepository implements IPessoaRepository {
  private repository: Repository<Pessoa>

  constructor() {
    this.repository = getRepository(Pessoa)
  }


  // create
  async create ({
    unidadeId,
    nome,
    email,
    funcaoId,
    gerente,
    desabilitado
  }: IPessoaDTO): Promise<HttpResponse> {
    const pessoa = this.repository.create({
      unidadeId,
      nome,
      email,
      funcaoId,
      gerente,
      desabilitado
    })

    const result = await this.repository.save(pessoa)
      .then(pessoaResult => {
        return ok(pessoaResult)
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
      "unidadeNome",
      "nome",
      "email",
      "funcaoDescricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('pes')
        .select([
          'pes.id as "id"',
          'a.id as "unidadeId"',
          'a.nome as "unidadeNome"',
          'pes.nome as "nome"',
          'pes.email as "email"',
          'b.id as "funcaoId"',
          'b.descricao as "funcaoDescricao"',
        ])
        .leftJoin('pes.unidadeId', 'a')
        .leftJoin('pes.funcaoId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const pessoas = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pes.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pes.email AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nome', columnOrder[0])
        .addOrderBy('pes.nome', columnOrder[1])
        .addOrderBy('pes.email', columnOrder[2])
        .addOrderBy('b.descricao', columnOrder[3])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(pessoas)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const pessoas = await this.repository.createQueryBuilder('pes')
        .select([
          'pes.id as "value"',
          'pes.nome as "label"',
        ])
        .where('pes.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pes.nome')
        .getRawMany()

      return ok(pessoas)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const pessoa = await this.repository.createQueryBuilder('pes')
        .select([
          'pes.id as "value"',
          'pes.nome as "label"',
        ])
        .where('pes.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(pessoa)
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
      let query = this.repository.createQueryBuilder('pes')
        .select([
          'pes.id as "id"',
        ])
        .leftJoin('pes.unidadeId', 'a')
        .leftJoin('pes.funcaoId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const pessoas = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pes.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pes.email AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: pessoas.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const pessoa = await this.repository.createQueryBuilder('pes')
        .select([
          'pes.id as "id"',
          'pes.unidadeId as "unidadeId"',
          'a.nome as "unidadeNome"',
          'pes.nome as "nome"',
          'pes.email as "email"',
          'pes.funcaoId as "funcaoId"',
          'b.descricao as "funcaoDescricao"',
          'pes.gerente as "gerente"',
          'pes.desabilitado as "desabilitado"',
        ])
        .leftJoin('pes.unidadeId', 'a')
        .leftJoin('pes.funcaoId', 'b')
        .where('pes.id = :id', { id })
        .getRawOne()

      if (typeof pessoa === 'undefined') {
        return noContent()
      }

      return ok(pessoa)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    unidadeId,
    nome,
    email,
    funcaoId,
    gerente,
    desabilitado
  }: IPessoaDTO): Promise<HttpResponse> {
    const pessoa = await this.repository.findOne(id)

    if (!pessoa) {
      return notFound()
    }

    const newpessoa = this.repository.create({
      id,
      unidadeId,
      nome,
      email,
      funcaoId,
      gerente,
      desabilitado
    })

    try {
      await this.repository.save(newpessoa)

      return ok(newpessoa)
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

export { PessoaRepository }
