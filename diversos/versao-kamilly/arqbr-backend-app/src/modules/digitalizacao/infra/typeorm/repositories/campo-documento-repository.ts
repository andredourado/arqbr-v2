import { getRepository, Repository } from 'typeorm'
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
    versaoDocumentoId,
    nomeCampo,
    identificador,
    cantoSuperiorX,
    cantoSuperiorY,
    cantoInferiorX,
    cantoInferiorY,
    conteudoParaValidacao,
    pessoaId,
    desabilitado
  }: ICampoDocumentoDTO): Promise<HttpResponse> {
    const campoDocumento = this.repository.create({
      versaoDocumentoId,
      nomeCampo,
      identificador,
      cantoSuperiorX,
      cantoSuperiorY,
      cantoInferiorX,
      cantoInferiorY,
      conteudoParaValidacao,
      pessoaId,
      desabilitado
    })

    const result = await this.repository.save(campoDocumento)
      .then(campoDocumentoResult => {
        return ok(campoDocumentoResult)
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
    order: string,
    filter: any
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
      "versaoDocumentoDescricaoVersao",
      "nomeCampo",
      "identificador",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let camposDocumento = await this.repository.createQueryBuilder('cam')
        .select([
          'cam.id as "id"',
          'a.id as "versaoDocumentoId"',
          'a.descricaoVersao as "versaoDocumentoDescricaoVersao"',
          'cam.nomeCampo as "nomeCampo"',
          'cam.identificador as "identificador"',
        ])
        .leftJoin('cam.versaoDocumentoId', 'a')
        .where('a.descricaoVersao ilike :search', { search: `%${search}%` })
        .orWhere('cam.nomeCampo ilike :search', { search: `%${search}%` })
        .orWhere('cam.identificador ilike :search', { search: `%${search}%` })
        .addOrderBy('a.descricaoVersao', columnOrder[0])
        .addOrderBy('cam.nomeCampo', columnOrder[1])
        .addOrderBy('cam.identificador', columnOrder[2])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (camposDocumento.length > rowsPerPage) {
        camposDocumento = camposDocumento.slice(offset, offset + rowsPerPage)
      }

      //

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
  ): Promise<HttpResponse> {
    try {
      const camposDocumento = await this.repository.createQueryBuilder('cam')
        .select([
          'cam.id as "id"',
        ])
        .leftJoin('cam.versaoDocumentoId', 'a')
        .where('a.descricaoVersao ilike :search', { search: `%${search}%` })
        .orWhere('cam.nomeCampo ilike :search', { search: `%${search}%` })
        .orWhere('cam.identificador ilike :search', { search: `%${search}%` })
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
          'cam.versaoDocumentoId as "versaoDocumentoId"',
          'cam.nomeCampo as "nomeCampo"',
          'cam.identificador as "identificador"',
          'cam.cantoSuperiorX as "cantoSuperiorX"',
          'cam.cantoSuperiorY as "cantoSuperiorY"',
          'cam.cantoInferiorX as "cantoInferiorX"',
          'cam.cantoInferiorY as "cantoInferiorY"',
          'cam.conteudoParaValidacao as "conteudoParaValidacao"',
          'cam.pessoaId as "pessoaId"',
          'cam.desabilitado as "desabilitado"',
        ])
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


  // update
  async update ({
    id,
    versaoDocumentoId,
    nomeCampo,
    identificador,
    cantoSuperiorX,
    cantoSuperiorY,
    cantoInferiorX,
    cantoInferiorY,
    conteudoParaValidacao,
    pessoaId,
    desabilitado
  }: ICampoDocumentoDTO): Promise<HttpResponse> {
    const campoDocumento = await this.repository.findOne(id)

    if (!campoDocumento) {
      return notFound()
    }

    const newcampoDocumento = this.repository.create({
      id,
      versaoDocumentoId,
      nomeCampo,
      identificador,
      cantoSuperiorX,
      cantoSuperiorY,
      cantoInferiorX,
      cantoInferiorY,
      conteudoParaValidacao,
      pessoaId,
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
