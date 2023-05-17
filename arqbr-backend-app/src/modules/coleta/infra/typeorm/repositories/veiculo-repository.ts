import { Brackets, getRepository, Repository } from 'typeorm'
import { IVeiculoDTO } from '@modules/coleta/dtos/i-veiculo-dto'
import { IVeiculoRepository } from '@modules/coleta/repositories/i-veiculo-repository'
import { Veiculo } from '@modules/coleta/infra/typeorm/entities/veiculo'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class VeiculoRepository implements IVeiculoRepository {
  private repository: Repository<Veiculo>

  constructor() {
    this.repository = getRepository(Veiculo)
  }


  // create
  async create ({
    descricao,
    desabilitado
  }: IVeiculoDTO): Promise<HttpResponse> {
    const veiculo = this.repository.create({
      descricao,
      desabilitado
    })

    const result = await this.repository.save(veiculo)
      .then(veiculoResult => {
        return ok(veiculoResult)
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
      "descricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('vei')
        .select([
          'vei.id as "id"',
          'vei.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const veiculos = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(vei.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('vei.descricao', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(veiculos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const veiculos = await this.repository.createQueryBuilder('vei')
        .select([
          'vei.id as "value"',
          'vei.descricao as "label"',
        ])
        .where('vei.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('vei.descricao')
        .getRawMany()

      return ok(veiculos)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const veiculo = await this.repository.createQueryBuilder('vei')
        .select([
          'vei.id as "value"',
          'vei.descricao as "label"',
        ])
        .where('vei.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(veiculo)
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
      let query = this.repository.createQueryBuilder('vei')
        .select([
          'vei.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const veiculos = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(vei.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: veiculos.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const veiculo = await this.repository.createQueryBuilder('vei')
        .select([
          'vei.id as "id"',
          'vei.descricao as "descricao"',
          'vei.desabilitado as "desabilitado"',
        ])
        .where('vei.id = :id', { id })
        .getRawOne()

      if (typeof veiculo === 'undefined') {
        return noContent()
      }

      return ok(veiculo)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    descricao,
    desabilitado
  }: IVeiculoDTO): Promise<HttpResponse> {
    const veiculo = await this.repository.findOne(id)

    if (!veiculo) {
      return notFound()
    }

    const newveiculo = this.repository.create({
      id,
      descricao,
      desabilitado
    })

    try {
      await this.repository.save(newveiculo)

      return ok(newveiculo)
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

export { VeiculoRepository }
