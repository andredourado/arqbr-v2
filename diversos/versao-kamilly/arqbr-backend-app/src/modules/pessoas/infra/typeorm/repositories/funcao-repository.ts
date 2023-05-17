import { getRepository, Repository } from 'typeorm'
import { IFuncaoDTO } from '@modules/pessoas/dtos/i-funcao-dto'
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository'
import { Funcao } from '@modules/pessoas/infra/typeorm/entities/funcao'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class FuncaoRepository implements IFuncaoRepository {
  private repository: Repository<Funcao>

  constructor() {
    this.repository = getRepository(Funcao)
  }


  // create
  async create ({
    descricao,
    metaProducao,
    desabilitado
  }: IFuncaoDTO): Promise<HttpResponse> {
    const funcao = this.repository.create({
      descricao,
      metaProducao,
      desabilitado
    })

    const result = await this.repository.save(funcao)
      .then(funcaoResult => {
        return ok(funcaoResult)
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
      let funcoes = await this.repository.createQueryBuilder('fun')
        .select([
          'fun.id as "id"',
          'fun.descricao as "descricao"',
        ])
        .where('fun.descricao ilike :search', { search: `%${search}%` })
        .addOrderBy('fun.descricao', columnOrder[0])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (funcoes.length > rowsPerPage) {
        funcoes = funcoes.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(funcoes)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const funcoes = await this.repository.createQueryBuilder('fun')
        .select([
          'fun.id as "value"',
          'fun.descricao as "label"',
        ])
        .where('fun.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('fun.descricao')
        .getRawMany()

      return ok(funcoes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const funcao = await this.repository.createQueryBuilder('fun')
        .select([
          'fun.id as "value"',
          'fun.descricao as "label"',
        ])
        .where('fun.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(funcao)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const funcoes = await this.repository.createQueryBuilder('fun')
        .select([
          'fun.id as "id"',
        ])
        .where('fun.descricao ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: funcoes.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const funcao = await this.repository.createQueryBuilder('fun')
        .select([
          'fun.id as "id"',
          'fun.descricao as "descricao"',
          'fun.metaProducao as "metaProducao"',
          'fun.desabilitado as "desabilitado"',
        ])
        .where('fun.id = :id', { id })
        .getRawOne()

      if (typeof funcao === 'undefined') {
        return noContent()
      }

      return ok(funcao)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    descricao,
    metaProducao,
    desabilitado
  }: IFuncaoDTO): Promise<HttpResponse> {
    const funcao = await this.repository.findOne(id)

    if (!funcao) {
      return notFound()
    }

    const newfuncao = this.repository.create({
      id,
      descricao,
      metaProducao,
      desabilitado
    })

    try {
      await this.repository.save(newfuncao)

      return ok(newfuncao)
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

export { FuncaoRepository }
