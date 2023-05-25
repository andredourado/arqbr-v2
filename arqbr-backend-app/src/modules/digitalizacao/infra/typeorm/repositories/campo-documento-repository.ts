import { Brackets, getRepository, Repository } from 'typeorm'
import { ICampoDocumentoDTO } from '@modules/digitalizacao/dtos/i-campo-documento-dto'
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository'
import { CampoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/campo-documento'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class CampoDocumentoRepository implements ICampoDocumentoRepository {
  private repository: Repository<CampoDocumento>

  constructor() {
    this.repository = getRepository(CampoDocumento)
  }


  // create
  async create ({
    tipoDocumentoId,
    nomeCampo,
    titulo,
    metodoExtracao,
    desabilitado
  }: ICampoDocumentoDTO): Promise<HttpResponse> {
    const campoDocumento = this.repository.create({
      tipoDocumentoId,
      nomeCampo,
      titulo,
      metodoExtracao,
      desabilitado
    })

    const result = await this.repository.save(campoDocumento)
      .then(campoDocumentoResult => {
        return ok(campoDocumentoResult)
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
      "tipoDocumentoDescricao",
      "nomeCampo",
      "titulo",
      "metodoExtracao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('cam')
        .select([
          'cam.id as "id"',
          'a.id as "tipoDocumentoId"',
          'a.descricao as "tipoDocumentoDescricao"',
          'cam.nomeCampo as "nomeCampo"',
          'cam.titulo as "titulo"',
          'cam.metodoExtracao as "metodoExtracao"',
        ])
        .leftJoin('cam.tipoDocumentoId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const camposDocumento = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cam.nomeCampo AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cam.titulo AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cam.metodoExtracao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.descricao', columnOrder[0])
        .addOrderBy('cam.nomeCampo', columnOrder[1])
        .addOrderBy('cam.titulo', columnOrder[2])
        .addOrderBy('cam.metodoExtracao', columnOrder[3])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(camposDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const camposDocumento = await this.repository.createQueryBuilder('cam')
        .select([
          'cam.id as "value"',
          'cam.nomeCampo as "label"',
        ])
        .where('cam.nomeCampo ilike :filter', { filter: `${filter}%` })
        .addOrderBy('cam.nomeCampo')
        .getRawMany()

      return ok(camposDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const campoDocumento = await this.repository.createQueryBuilder('cam')
        .select([
          'cam.id as "value"',
          'cam.nomeCampo as "label"',
        ])
        .where('cam.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(campoDocumento)
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
      let query = this.repository.createQueryBuilder('cam')
        .select([
          'cam.id as "id"',
        ])
        .leftJoin('cam.tipoDocumentoId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const camposDocumento = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cam.nomeCampo AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cam.titulo AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cam.metodoExtracao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: camposDocumento.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const campoDocumento = await this.repository.createQueryBuilder('cam')
        .select([
          'cam.id as "id"',
          'cam.tipoDocumentoId as "tipoDocumentoId"',
          'a.descricao as "tipoDocumentoDescricao"',
          'cam.nomeCampo as "nomeCampo"',
          'cam.titulo as "titulo"',
          'cam.metodoExtracao as "metodoExtracao"',
          'cam.desabilitado as "desabilitado"',
        ])
        .leftJoin('cam.tipoDocumentoId', 'a')
        .where('cam.id = :id', { id })
        .getRawOne()

      if (typeof campoDocumento === 'undefined') {
        return noContent()
      }

      return ok(campoDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // get by tipo documento
  async getByTipoDocumento (tipoDocumentoId: string, nomeCampo: string): Promise<HttpResponse> {
    try {
      const campoDocumento = await this.repository
        .createQueryBuilder('cam')
        .select([
          'cam.id as "id"',
          'cam.tipoDocumentoId as "tipoDocumentoId"',
          'cam.nomeCampo as "nomeCampo"',
          'cam.titulo as "titulo"',
          'cam.metodoExtracao as "metodoExtracao"',
          'cam.desabilitado as "desabilitado"',
        ])
        .where('cam.tipoDocumentoId = :tipoDocumentoId', { tipoDocumentoId })
        .andWhere('cam.nomeCampo = :nomeCampo', { nomeCampo })
        .getRawOne()

      if (typeof campoDocumento === 'undefined') {
        return noContent()
      }

      return ok(campoDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    tipoDocumentoId,
    nomeCampo,
    titulo,
    metodoExtracao,
    desabilitado
  }: ICampoDocumentoDTO): Promise<HttpResponse> {
    const campoDocumento = await this.repository.findOne(id)

    if (!campoDocumento) {
      return notFound()
    }

    const newcampoDocumento = this.repository.create({
      id,
      tipoDocumentoId,
      nomeCampo,
      titulo,
      metodoExtracao,
      desabilitado
    })

    try {
      await this.repository.save(newcampoDocumento)

      return ok(newcampoDocumento)
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

export { CampoDocumentoRepository }
