import { Brackets, getRepository, Repository } from 'typeorm'
import { IPlantaDTO } from '@modules/armazenamento/dtos/i-planta-dto'
import { IPlantaRepository } from '@modules/armazenamento/repositories/i-planta-repository'
import { Planta } from '@modules/armazenamento/infra/typeorm/entities/planta'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class PlantaRepository implements IPlantaRepository {
  private repository: Repository<Planta>

  constructor() {
    this.repository = getRepository(Planta)
  }


  // create
  async create ({
    unidadeId,
    nome,
    quantidadePosicoes,
    desabilitado
  }: IPlantaDTO): Promise<HttpResponse> {
    const planta = this.repository.create({
      unidadeId,
      nome,
      quantidadePosicoes,
      desabilitado
    })

    const result = await this.repository.save(planta)
      .then(plantaResult => {
        return ok(plantaResult)
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
      "quantidadePosicoes",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('pla')
        .select([
          'pla.id as "id"',
          'a.id as "unidadeId"',
          'a.nome as "unidadeNome"',
          'pla.nome as "nome"',
          'pla.quantidadePosicoes as "quantidadePosicoes"',
        ])
        .leftJoin('pla.unidadeId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const plantas = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pla.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nome', columnOrder[0])
        .addOrderBy('pla.nome', columnOrder[1])
        .addOrderBy('pla.quantidadePosicoes', columnOrder[2])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(plantas)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string, unidadeId): Promise<HttpResponse> {
    try {
      const plantas = await this.repository.createQueryBuilder('pla')
        .select([
          'pla.id as "value"',
          'pla.nome as "label"',
        ])
        .where('pla.unidadeId = :unidadeId', { unidadeId: `${unidadeId}`})
        .andWhere('pla.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pla.nome')
        .getRawMany()

      return ok(plantas)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const planta = await this.repository.createQueryBuilder('pla')
        .select([
          'pla.id as "value"',
          'pla.nome as "label"',
        ])
        .where('pla.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(planta)
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
      let query = this.repository.createQueryBuilder('pla')
        .select([
          'pla.id as "id"',
        ])
        .leftJoin('pla.unidadeId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const plantas = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pla.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: plantas.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const planta = await this.repository.createQueryBuilder('pla')
        .select([
          'pla.id as "id"',
          'pla.unidadeId as "unidadeId"',
          'a.nome as "unidadeNome"',
          'pla.nome as "nome"',
          'pla.quantidadePosicoes as "quantidadePosicoes"',
          'pla.desabilitado as "desabilitado"',
        ])
        .leftJoin('pla.unidadeId', 'a')
        .where('pla.id = :id', { id })
        .getRawOne()

      if (typeof planta === 'undefined') {
        return noContent()
      }

      return ok(planta)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    unidadeId,
    nome,
    quantidadePosicoes,
    desabilitado
  }: IPlantaDTO): Promise<HttpResponse> {
    const planta = await this.repository.findOne(id)

    if (!planta) {
      return notFound()
    }

    const newplanta = this.repository.create({
      id,
      unidadeId,
      nome,
      quantidadePosicoes,
      desabilitado
    })

    try {
      await this.repository.save(newplanta)

      return ok(newplanta)
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

export { PlantaRepository }
