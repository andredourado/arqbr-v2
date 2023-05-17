import { getRepository, Repository } from 'typeorm'
import { IUnidadeDTO } from '@modules/armazenamento/dtos/i-unidade-dto'
import { IUnidadeRepository } from '@modules/armazenamento/repositories/i-unidade-repository'
import { Unidade } from '@modules/armazenamento/infra/typeorm/entities/unidade'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class UnidadeRepository implements IUnidadeRepository {
  private repository: Repository<Unidade>

  constructor() {
    this.repository = getRepository(Unidade)
  }


  // create
  async create ({
    estadoId,
    cidadeId,
    nome,
    endereco,
    numero,
    complemento,
    cep,
    desabilitado
  }: IUnidadeDTO): Promise<HttpResponse> {
    const unidade = this.repository.create({
      estadoId,
      cidadeId,
      nome,
      endereco,
      numero,
      complemento,
      cep,
      desabilitado
    })

    const result = await this.repository.save(unidade)
      .then(unidadeResult => {
        return ok(unidadeResult)
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
      "estadoUf",
      "cidadeNomeCidade",
      "nome",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let unidades = await this.repository.createQueryBuilder('uni')
        .select([
          'uni.id as "id"',
          'a.id as "estadoId"',
          'a.uf as "estadoUf"',
          'b.id as "cidadeId"',
          'b.nomeCidade as "cidadeNomeCidade"',
          'uni.nome as "nome"',
        ])
        .leftJoin('uni.estadoId', 'a')
        .leftJoin('uni.cidadeId', 'b')
        .where('a.uf ilike :search', { search: `%${search}%` })
        .orWhere('uni.nome ilike :search', { search: `%${search}%` })
        .addOrderBy('a.uf', columnOrder[0])
        .addOrderBy('b.nomeCidade', columnOrder[1])
        .addOrderBy('uni.nome', columnOrder[2])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (unidades.length > rowsPerPage) {
        unidades = unidades.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(unidades)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const unidades = await this.repository.createQueryBuilder('uni')
        .select([
          'uni.id as "value"',
          'uni.nome as "label"',
        ])
        .where('uni.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('uni.nome')
        .getRawMany()

      return ok(unidades)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const unidade = await this.repository.createQueryBuilder('uni')
        .select([
          'uni.id as "value"',
          'uni.nome as "label"',
        ])
        .where('uni.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(unidade)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const unidades = await this.repository.createQueryBuilder('uni')
        .select([
          'uni.id as "id"',
        ])
        .leftJoin('uni.estadoId', 'a')
        .leftJoin('uni.cidadeId', 'b')
        .where('a.uf ilike :search', { search: `%${search}%` })
        .orWhere('uni.nome ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: unidades.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const unidade = await this.repository.createQueryBuilder('uni')
        .select([
          'uni.id as "id"',
          'uni.estadoId as "estadoId"',
          'uni.cidadeId as "cidadeId"',
          'uni.nome as "nome"',
          'uni.endereco as "endereco"',
          'uni.numero as "numero"',
          'uni.complemento as "complemento"',
          'uni.cep as "cep"',
          'uni.desabilitado as "desabilitado"',
        ])
        .where('uni.id = :id', { id })
        .getRawOne()

      if (typeof unidade === 'undefined') {
        return noContent()
      }

      return ok(unidade)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    estadoId,
    cidadeId,
    nome,
    endereco,
    numero,
    complemento,
    cep,
    desabilitado
  }: IUnidadeDTO): Promise<HttpResponse> {
    const unidade = await this.repository.findOne(id)

    if (!unidade) {
      return notFound()
    }

    const newunidade = this.repository.create({
      id,
      estadoId,
      cidadeId,
      nome,
      endereco,
      numero,
      complemento,
      cep,
      desabilitado
    })

    try {
      await this.repository.save(newunidade)

      return ok(newunidade)
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

export { UnidadeRepository }
