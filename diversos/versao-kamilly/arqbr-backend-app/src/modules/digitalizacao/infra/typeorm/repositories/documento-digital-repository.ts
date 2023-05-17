import { getRepository, Repository } from 'typeorm'
import { IDocumentoDigitalDTO } from '@modules/digitalizacao/dtos/i-documento-digital-dto'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { DocumentoDigital } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class DocumentoDigitalRepository implements IDocumentoDigitalRepository {
  private repository: Repository<DocumentoDigital>

  constructor() {
    this.repository = getRepository(DocumentoDigital)
  }


  // create
  async create ({
    dataDigitalizacao,
    versaoDocumentoId,
    nip,
    conteudoQrCode,
    nomeArquivo,
    conteudoEmTexto,
    pessoaId
  }: IDocumentoDigitalDTO): Promise<HttpResponse> {
    const documentoDigital = this.repository.create({
      dataDigitalizacao,
      versaoDocumentoId,
      nip,
      conteudoQrCode,
      nomeArquivo,
      conteudoEmTexto,
      pessoaId
    })

    const result = await this.repository.save(documentoDigital)
      .then(documentoDigitalResult => {
        return ok(documentoDigitalResult)
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
      "dataDigitalizacao",
      "versaoDocumentoDescricaoVersao",
      "nip",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
          'doc.dataDigitalizacao as "dataDigitalizacao"',
          'a.id as "versaoDocumentoId"',
          'a.descricaoVersao as "versaoDocumentoDescricaoVersao"',
          'doc.nip as "nip"',
          'doc.nomeArquivo as "nomeArquivo"'
        ])
        .distinct(true)
        .leftJoin('doc.versaoDocumentoId', 'a')
        .leftJoin('documentos_digitais_campos', 'ddc', 'ddc.documentoDigitalId = doc.id')
        .leftJoin('campos', 'cam', 'ddc.campoId = cam.id')

      if (filter != null) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value != null && value != '') {
            query = query
              .orWhere('ddc.campoId = :campoId', { campoId: key })
              .andWhere('ddc.conteudo ilike :conteudo', { conteudo: `%${value}%` })
          }
        })
      }

      let documentosDigitais = await query
        .addOrderBy('doc.dataDigitalizacao', columnOrder[0])
        .addOrderBy('a.descricaoVersao', columnOrder[1])
        .addOrderBy('doc.nip', columnOrder[2])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (documentosDigitais.length > rowsPerPage) {
        documentosDigitais = documentosDigitais.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(documentosDigitais)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const documentosDigitais = await this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "value"',
          'doc.nip as "label"',
        ])
        .where('doc.nip ilike :filter', { filter: `${filter}%` })
        .addOrderBy('doc.nip')
        .getRawMany()

      return ok(documentosDigitais)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const documentoDigital = await this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "value"',
          'doc.nip as "label"',
        ])
        .where('doc.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(documentoDigital)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const documentosDigitais = await this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
        ])
        .leftJoin('doc.versaoDocumentoId', 'a')
        .where('doc.dataDigitalizacao ilike :search', { search: `%${search}%` })
        .orWhere('doc.nip ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: documentosDigitais.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const documentoDigital = await this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
          'doc.dataDigitalizacao as "dataDigitalizacao"',
          'doc.versaoDocumentoId as "versaoDocumentoId"',
          'doc.nip as "nip"',
          'doc.conteudoQrCode as "conteudoQrCode"',
          'doc.nomeArquivo as "nomeArquivo"',
          'doc.pessoaId as "pessoaId"',
        ])
        .where('doc.id = :id', { id })
        .getRawOne()

      if (typeof documentoDigital === 'undefined') {
        return noContent()
      }

      return ok(documentoDigital)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    dataDigitalizacao,
    versaoDocumentoId,
    nip,
    conteudoQrCode,
    nomeArquivo,
    conteudoEmTexto,
    pessoaId
  }: IDocumentoDigitalDTO): Promise<HttpResponse> {
    const documentoDigital = await this.repository.findOne(id)

    if (!documentoDigital) {
      return notFound()
    }

    const newdocumentoDigital = this.repository.create({
      id,
      dataDigitalizacao,
      versaoDocumentoId,
      nip,
      conteudoQrCode,
      nomeArquivo,
      conteudoEmTexto,
      pessoaId
    })

    try {
      await this.repository.save(newdocumentoDigital)

      return ok(newdocumentoDigital)
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

export { DocumentoDigitalRepository }
