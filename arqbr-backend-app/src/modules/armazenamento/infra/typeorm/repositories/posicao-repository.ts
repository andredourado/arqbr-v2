import { Brackets, getRepository, Repository } from 'typeorm'
import { IPosicaoDTO } from '@modules/armazenamento/dtos/i-posicao-dto'
import { IPosicaoRepository } from '@modules/armazenamento/repositories/i-posicao-repository'
import { Posicao } from '@modules/armazenamento/infra/typeorm/entities/posicao'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class PosicaoRepository implements IPosicaoRepository {
  private repository: Repository<Posicao>

  constructor() {
    this.repository = getRepository(Posicao)
  }


  // create
  async create ({
    unidadeId,
    plantaId,
    rua,
    linha,
    coluna,
    posicoes,
    posicoesDisponíveis,
    desabilitado
  }: IPosicaoDTO): Promise<HttpResponse> {
    const posicao = this.repository.create({
      unidadeId,
      plantaId,
      rua,
      linha,
      coluna,
      posicoes,
      posicoesDisponíveis,
      desabilitado
    })

    const result = await this.repository.save(posicao)
      .then(posicaoResult => {
        return ok(posicaoResult)
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
      "plantaNome",
      "rua",
      "linha",
      "coluna",
      "posicoes",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('pos')
        .select([
          'pos.id as "id"',
          'a.id as "unidadeId"',
          'a.nome as "unidadeNome"',
          'b.id as "plantaId"',
          'b.nome as "plantaNome"',
          'pos.rua as "rua"',
          'pos.linha as "linha"',
          'pos.coluna as "coluna"',
          'pos.posicoes as "posicoes"',
        ])
        .leftJoin('pos.unidadeId', 'a')
        .leftJoin('pos.plantaId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const posicoes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pos.rua AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pos.linha AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pos.coluna AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nome', columnOrder[0])
        .addOrderBy('b.nome', columnOrder[1])
        .addOrderBy('pos.rua', columnOrder[2])
        .addOrderBy('pos.linha', columnOrder[3])
        .addOrderBy('pos.coluna', columnOrder[4])
        .addOrderBy('pos.posicoes', columnOrder[5])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(posicoes)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const posicoes = await this.repository.createQueryBuilder('pos')
        .select([
          'pos. as "value"',
          'pos. as "label"',
        ])
        .where('pos. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pos.')
        .getRawMany()

      return ok(posicoes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const posicao = await this.repository.createQueryBuilder('pos')
        .select([
          'pos. as "value"',
          'pos. as "label"',
        ])
        .where('pos. = :id', { id: `${id}` })
        .getRawOne()

      return ok(posicao)
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
      let query = this.repository.createQueryBuilder('pos')
        .select([
          'pos.id as "id"',
        ])
        .leftJoin('pos.unidadeId', 'a')
        .leftJoin('pos.plantaId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const posicoes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pos.rua AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pos.linha AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pos.coluna AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: posicoes.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const posicao = await this.repository.createQueryBuilder('pos')
        .select([
          'pos.id as "id"',
          'pos.unidadeId as "unidadeId"',
          'a.nome as "unidadeNome"',
          'pos.plantaId as "plantaId"',
          'b.nome as "plantaNome"',
          'pos.rua as "rua"',
          'pos.linha as "linha"',
          'pos.coluna as "coluna"',
          'pos.posicoes as "posicoes"',
          'pos.posicoesDisponíveis as "posicoesDisponíveis"',
          'pos.desabilitado as "desabilitado"',
        ])
        .leftJoin('pos.unidadeId', 'a')
        .leftJoin('pos.plantaId', 'b')
        .where('pos.id = :id', { id })
        .getRawOne()

      if (typeof posicao === 'undefined') {
        return noContent()
      }

      return ok(posicao)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    unidadeId,
    plantaId,
    rua,
    linha,
    coluna,
    posicoes,
    posicoesDisponíveis,
    desabilitado
  }: IPosicaoDTO): Promise<HttpResponse> {
    const posicao = await this.repository.findOne(id)

    if (!posicao) {
      return notFound()
    }

    const newposicao = this.repository.create({
      id,
      unidadeId,
      plantaId,
      rua,
      linha,
      coluna,
      posicoes,
      posicoesDisponíveis,
      desabilitado
    })

    try {
      await this.repository.save(newposicao)

      return ok(newposicao)
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

export { PosicaoRepository }
