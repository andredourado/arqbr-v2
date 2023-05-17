import { getRepository, Repository } from 'typeorm'
import { IAfastamentoDTO } from '@modules/pessoas/dtos/i-afastamento-dto'
import { IAfastamentoRepository } from '@modules/pessoas/repositories/i-afastamento-repository'
import { Afastamento } from '@modules/pessoas/infra/typeorm/entities/afastamento'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class AfastamentoRepository implements IAfastamentoRepository {
  private repository: Repository<Afastamento>

  constructor() {
    this.repository = getRepository(Afastamento)
  }


  // create
  async create ({
    pessoaId,
    tipoAfastamentoId,
    inicio,
    fim,
    desabilitado
  }: IAfastamentoDTO): Promise<HttpResponse> {
    const afastamento = this.repository.create({
      pessoaId,
      tipoAfastamentoId,
      inicio,
      fim,
      desabilitado
    })

    const result = await this.repository.save(afastamento)
      .then(afastamentoResult => {
        return ok(afastamentoResult)
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
      "pessoaNome",
      "tipoAfastamentoDescricao",
      "inicio",
      "fim",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let afastamentos = await this.repository.createQueryBuilder('afa')
        .select([
          'afa.id as "id"',
          'a.id as "pessoaId"',
          'a.nome as "pessoaNome"',
          'b.id as "tipoAfastamentoId"',
          'b.descricao as "tipoAfastamentoDescricao"',
          'afa.inicio as "inicio"',
          'afa.fim as "fim"',
        ])
        .leftJoin('afa.pessoaId', 'a')
        .leftJoin('afa.tipoAfastamentoId', 'b')
        .where('a.nome ilike :search', { search: `%${search}%` })
        .addOrderBy('a.nome', columnOrder[0])
        .addOrderBy('b.descricao', columnOrder[1])
        .addOrderBy('afa.inicio', columnOrder[2])
        .addOrderBy('afa.fim', columnOrder[3])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (afastamentos.length > rowsPerPage) {
        afastamentos = afastamentos.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(afastamentos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const afastamentos = await this.repository.createQueryBuilder('afa')
        .select([
          'afa. as "value"',
          'afa. as "label"',
        ])
        .where('afa. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('afa.')
        .getRawMany()

      return ok(afastamentos)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const afastamento = await this.repository.createQueryBuilder('afa')
        .select([
          'afa. as "value"',
          'afa. as "label"',
        ])
        .where('afa. = :id', { id: `${id}` })
        .getRawOne()

      return ok(afastamento)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const afastamentos = await this.repository.createQueryBuilder('afa')
        .select([
          'afa.id as "id"',
        ])
        .leftJoin('afa.pessoaId', 'a')
        .leftJoin('afa.tipoAfastamentoId', 'b')
        .where('a.nome ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: afastamentos.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const afastamento = await this.repository.createQueryBuilder('afa')
        .select([
          'afa.id as "id"',
          'afa.pessoaId as "pessoaId"',
          'afa.tipoAfastamentoId as "tipoAfastamentoId"',
          'afa.inicio as "inicio"',
          'afa.fim as "fim"',
          'afa.desabilitado as "desabilitado"',
        ])
        .where('afa.id = :id', { id })
        .getRawOne()

      if (typeof afastamento === 'undefined') {
        return noContent()
      }

      return ok(afastamento)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    pessoaId,
    tipoAfastamentoId,
    inicio,
    fim,
    desabilitado
  }: IAfastamentoDTO): Promise<HttpResponse> {
    const afastamento = await this.repository.findOne(id)

    if (!afastamento) {
      return notFound()
    }

    const newafastamento = this.repository.create({
      id,
      pessoaId,
      tipoAfastamentoId,
      inicio,
      fim,
      desabilitado
    })

    try {
      await this.repository.save(newafastamento)

      return ok(newafastamento)
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

export { AfastamentoRepository }
