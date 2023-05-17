import { getRepository, Repository } from 'typeorm'
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
    campoId,
    conteudo,
    indiceQualidadeExtracao,
    pessoaId
  }: IDocumentoDigitalCampoDTO): Promise<HttpResponse> {
    const documentoDigitalCampo = this.repository.create({
      documentoDigitalId,
      campoId,
      conteudo,
      indiceQualidadeExtracao,
      pessoaId
    })

    const result = await this.repository.save(documentoDigitalCampo)
      .then(documentoDigitalCampoResult => {
        return ok(documentoDigitalCampoResult)
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
      "documentoDigitalNip",
      "campoDocumentoNomeCampo",
      "conteudo",
      "indiceQualidadeExtracao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let documentosDigitaisCampos = await this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
          'a.id as "documentoDigitalId"',
          'a.nip as "documentoDigitalNip"',
          'b.id as "campoId"',
          'b.nomeCampo as "campoDocumentoNomeCampo"',
          'doc.conteudo as "conteudo"',
          'doc.indiceQualidadeExtracao as "indiceQualidadeExtracao"',
        ])
        .leftJoin('doc.documentoDigitalId', 'a')
        .leftJoin('doc.campoId', 'b')
        .where('a.nip ilike :search', { search: `%${search}%` })
        .orWhere('doc.conteudo ilike :search', { search: `%${search}%` })
        .addOrderBy('a.nip', columnOrder[0])
        .addOrderBy('b.nomeCampo', columnOrder[1])
        .addOrderBy('doc.conteudo', columnOrder[2])
        .addOrderBy('doc.indiceQualidadeExtracao', columnOrder[3])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (documentosDigitaisCampos.length > rowsPerPage) {
        documentosDigitaisCampos = documentosDigitaisCampos.slice(offset, offset + rowsPerPage)
      }

      //

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
  ): Promise<HttpResponse> {
    try {
      const documentosDigitaisCampos = await this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
        ])
        .leftJoin('doc.documentoDigitalId', 'a')
        .leftJoin('doc.campoId', 'b')
        .where('a.nip ilike :search', { search: `%${search}%` })
        .orWhere('doc.conteudo ilike :search', { search: `%${search}%` })
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
          'doc.campoId as "campoId"',
          'doc.conteudo as "conteudo"',
          'doc.indiceQualidadeExtracao as "indiceQualidadeExtracao"',
          'doc.pessoaId as "pessoaId"',
        ])
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
    documentoDigitalId,
    campoId,
    conteudo,
    indiceQualidadeExtracao,
    pessoaId
  }: IDocumentoDigitalCampoDTO): Promise<HttpResponse> {
    const documentoDigitalCampo = await this.repository.findOne(id)

    if (!documentoDigitalCampo) {
      return notFound()
    }

    const newdocumentoDigitalCampo = this.repository.create({
      id,
      documentoDigitalId,
      campoId,
      conteudo,
      indiceQualidadeExtracao,
      pessoaId
    })

    try {
      await this.repository.save(newdocumentoDigitalCampo)

      return ok(newdocumentoDigitalCampo)
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

export { DocumentoDigitalCampoRepository }
