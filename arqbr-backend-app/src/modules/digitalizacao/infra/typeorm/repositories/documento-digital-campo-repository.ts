import { Brackets, getRepository, Repository } from 'typeorm'
import { IDocumentoDigitalCampoDTO } from '@modules/digitalizacao/dtos/i-documento-digital-campo-dto'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { DocumentoDigitalCampo } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital-campo'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class DocumentoDigitalCampoRepository implements IDocumentoDigitalCampoRepository {
  private repository: Repository<DocumentoDigitalCampo>

  constructor() {
    this.repository = getRepository(DocumentoDigitalCampo)
  }


  // create
  async create ({
    documentoDigitalId,
    campoDocumentoId,
    conteudo
  }: IDocumentoDigitalCampoDTO): Promise<HttpResponse> {
    const documentoDigitalCampo = this.repository.create({
      documentoDigitalId,
      campoDocumentoId,
      conteudo
    })

    const result = await this.repository.save(documentoDigitalCampo)
      .then(documentoDigitalCampoResult => {
        return ok(documentoDigitalCampoResult)
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
      "campoDocumentoNomeCampo",
      "conteudo",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
          'a.id as "documentoDigitalId"',
          'a.nomeArquivo as "nomeArquivo"',
          'b.id as "campoDocumentoId"',
          'b.nomeCampo as "campoDocumentoNomeCampo"',
          'doc.conteudo as "conteudo"',
        ])
        .leftJoin('doc.documentoDigitalId', 'a')
        .leftJoin('doc.campoDocumentoId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const documentosDigitaisCampos = await query
        .andWhere(new Brackets(query => {
          query.orWhere('CAST(doc.conteudo AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('b.nomeCampo', columnOrder[1])
        .addOrderBy('doc.conteudo', columnOrder[2])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(documentosDigitaisCampos)
    } catch (err) {
      return serverError(err)
    }
  }


  // list by documento
  async listByDocumento (documentoDigitalId: string): Promise<HttpResponse> {
    try {
      const documentosDigitaisCampos = await this.repository
        .createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
          'cam.titulo as "campo"',
          'doc.conteudo as "conteudo"',
        ])
        .innerJoin('campos_documento', 'cam', 'doc.campoDocumentoId = cam.id')
        .where('doc.documentoDigitalId = :documentoDigitalId', { documentoDigitalId })
        .getRawMany()

      return ok(documentosDigitaisCampos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const documentosDigitaisCampos = await this.repository.createQueryBuilder('doc')
        .select([
          'doc. as "value"',
          'doc. as "label"',
        ])
        .where('doc. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('doc.')
        .getRawMany()

      return ok(documentosDigitaisCampos)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const documentoDigitalCampo = await this.repository.createQueryBuilder('doc')
        .select([
          'doc. as "value"',
          'doc. as "label"',
        ])
        .where('doc. = :id', { id: `${id}` })
        .getRawOne()

      return ok(documentoDigitalCampo)
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
      let query = this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
        ])
        .leftJoin('doc.documentoDigitalId', 'a')
        .leftJoin('doc.campoDocumentoId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const documentosDigitaisCampos = await query
        .andWhere(new Brackets(query => {
          // query.andWhere('CAST(a.nip AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(doc.conteudo AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: documentosDigitaisCampos.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const documentoDigitalCampo = await this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
          'doc.documentoDigitalId as "documentoDigitalId"',
          // 'a.nip as "documentoDigitalNip"',
          'doc.campoDocumentoId as "campoDocumentoId"',
          'b.nomeCampo as "campoDocumentoNomeCampo"',
          'doc.conteudo as "conteudo"',
        ])
        .leftJoin('doc.documentoDigitalId', 'a')
        .leftJoin('doc.campoDocumentoId', 'b')
        .where('doc.id = :id', { id })
        .getRawOne()

      if (typeof documentoDigitalCampo === 'undefined') {
        return noContent()
      }

      return ok(documentoDigitalCampo)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    conteudo
  }: IDocumentoDigitalCampoDTO): Promise<HttpResponse> {
    try {
      const documentoDigitalCampo = await this.repository
        .createQueryBuilder('ddc')
        .select('*')
        .where('ddc.id = :id', { id })
        .getRawOne()

      if (!documentoDigitalCampo) {
        return notFound()
      }

      const newDocumentoDigitalCampo = await this.repository.update({ id }, { conteudo })

      return ok(newDocumentoDigitalCampo)
    } catch (err) {
      console.log(err)
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

export { DocumentoDigitalCampoRepository }
