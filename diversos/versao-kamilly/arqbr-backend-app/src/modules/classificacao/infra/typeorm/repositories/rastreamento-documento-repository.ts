import { getRepository, Repository } from 'typeorm'
import { IRastreamentoDocumentoDTO } from '@modules/classificacao/dtos/i-rastreamento-documento-dto'
import { IRastreamentoDocumentoRepository } from '@modules/classificacao/repositories/i-rastreamento-documento-repository'
import { RastreamentoDocumento } from '@modules/classificacao/infra/typeorm/entities/rastreamento-documento'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class RastreamentoDocumentoRepository implements IRastreamentoDocumentoRepository {
  private repository: Repository<RastreamentoDocumento>

  constructor() {
    this.repository = getRepository(RastreamentoDocumento)
  }


  // create
  async create ({
    volumeId,
    dataMovimentacao,
    horaMovimentacao,
    localDeArmazenagem,
    statusId
  }: IRastreamentoDocumentoDTO): Promise<HttpResponse> {
    const rastreamentoDocumento = this.repository.create({
      volumeId,
      dataMovimentacao,
      horaMovimentacao,
      localDeArmazenagem,
      statusId
    })

    const result = await this.repository.save(rastreamentoDocumento)
      .then(rastreamentoDocumentoResult => {
        return ok(rastreamentoDocumentoResult)
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
      "volumeIdentificador",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let rastreamentoDocumentos = await this.repository.createQueryBuilder('ras')
        .select([
          'ras.id as "id"',
          'a.id as "volumeId"',
          'a.identificador as "volumeIdentificador"',
        ])
        .leftJoin('ras.volumeId', 'a')
        .where('a.identificador ilike :search', { search: `%${search}%` })
        .addOrderBy('a.identificador', columnOrder[0])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (rastreamentoDocumentos.length > rowsPerPage) {
        rastreamentoDocumentos = rastreamentoDocumentos.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(rastreamentoDocumentos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const rastreamentoDocumentos = await this.repository.createQueryBuilder('ras')
        .select([
          'ras. as "value"',
          'ras. as "label"',
        ])
        .where('ras. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('ras.')
        .getRawMany()

      return ok(rastreamentoDocumentos)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const rastreamentoDocumento = await this.repository.createQueryBuilder('ras')
        .select([
          'ras. as "value"',
          'ras. as "label"',
        ])
        .where('ras. = :id', { id: `${id}` })
        .getRawOne()

      return ok(rastreamentoDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const rastreamentoDocumentos = await this.repository.createQueryBuilder('ras')
        .select([
          'ras.id as "id"',
        ])
        .leftJoin('ras.volumeId', 'a')
        .where('a.identificador ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: rastreamentoDocumentos.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const rastreamentoDocumento = await this.repository.createQueryBuilder('ras')
        .select([
          'ras.id as "id"',
          'ras.volumeId as "volumeId"',
          'ras.dataMovimentacao as "dataMovimentacao"',
          'ras.horaMovimentacao as "horaMovimentacao"',
          'ras.localDeArmazenagem as "localDeArmazenagem"',
          'ras.statusId as "statusId"',
        ])
        .where('ras.id = :id', { id })
        .getRawOne()

      if (typeof rastreamentoDocumento === 'undefined') {
        return noContent()
      }

      return ok(rastreamentoDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    volumeId,
    dataMovimentacao,
    horaMovimentacao,
    localDeArmazenagem,
    statusId
  }: IRastreamentoDocumentoDTO): Promise<HttpResponse> {
    const rastreamentoDocumento = await this.repository.findOne(id)

    if (!rastreamentoDocumento) {
      return notFound()
    }

    const newrastreamentoDocumento = this.repository.create({
      id,
      volumeId,
      dataMovimentacao,
      horaMovimentacao,
      localDeArmazenagem,
      statusId
    })

    try {
      await this.repository.save(newrastreamentoDocumento)

      return ok(newrastreamentoDocumento)
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

export { RastreamentoDocumentoRepository }
