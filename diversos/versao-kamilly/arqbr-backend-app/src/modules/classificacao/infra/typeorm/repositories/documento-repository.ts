import { getRepository, Repository } from 'typeorm'
import { IDocumentoDTO } from '@modules/classificacao/dtos/i-documento-dto'
import { IDocumentoRepository } from '@modules/classificacao/repositories/i-documento-repository'
import { Documento } from '@modules/classificacao/infra/typeorm/entities/documento'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class DocumentoRepository implements IDocumentoRepository {
  private repository: Repository<Documento>

  constructor() {
    this.repository = getRepository(Documento)
  }


  // create
  async create ({
    clienteId,
    contratoId,
    departamentoId,
    tipoDocumentoId,
    nip,
    caixaArqbr,
    conteudoQrCode,
    statusId,
    pessoaId
  }: IDocumentoDTO): Promise<HttpResponse> {
    const documento = this.repository.create({
      clienteId,
      contratoId,
      departamentoId,
      tipoDocumentoId,
      nip,
      caixaArqbr,
      conteudoQrCode,
      statusId,
      pessoaId
    })

    const result = await this.repository.save(documento)
      .then(documentoResult => {
        return ok(documentoResult)
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
      "clienteNomeFantasia",
      "contratoIdentificador",
      "departamentoNome",
      "tipoDocumentoDescricao",
      "nip",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let documentos = await this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'b.id as "contratoId"',
          'b.identificador as "contratoIdentificador"',
          'c.id as "departamentoId"',
          'c.nome as "departamentoNome"',
          'd.id as "tipoDocumentoId"',
          'd.descricao as "tipoDocumentoDescricao"',
          'doc.nip as "nip"',
        ])
        .leftJoin('doc.clienteId', 'a')
        .leftJoin('doc.contratoId', 'b')
        .leftJoin('doc.departamentoId', 'c')
        .leftJoin('doc.tipoDocumentoId', 'd')
        .where('a.nomeFantasia ilike :search', { search: `%${search}%` })
        .orWhere('doc.nip ilike :search', { search: `%${search}%` })
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('b.identificador', columnOrder[1])
        .addOrderBy('c.nome', columnOrder[2])
        .addOrderBy('d.descricao', columnOrder[3])
        .addOrderBy('doc.nip', columnOrder[4])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (documentos.length > rowsPerPage) {
        documentos = documentos.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(documentos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const documentos = await this.repository.createQueryBuilder('doc')
        .select([
          'doc. as "value"',
          'doc. as "label"',
        ])
        .where('doc. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('doc.')
        .getRawMany()

      return ok(documentos)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const documento = await this.repository.createQueryBuilder('doc')
        .select([
          'doc. as "value"',
          'doc. as "label"',
        ])
        .where('doc. = :id', { id: `${id}` })
        .getRawOne()

      return ok(documento)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const documentos = await this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
        ])
        .leftJoin('doc.clienteId', 'a')
        .leftJoin('doc.contratoId', 'b')
        .leftJoin('doc.departamentoId', 'c')
        .leftJoin('doc.tipoDocumentoId', 'd')
        .where('a.nomeFantasia ilike :search', { search: `%${search}%` })
        .orWhere('doc.nip ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: documentos.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const documento = await this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
          'doc.clienteId as "clienteId"',
          'doc.contratoId as "contratoId"',
          'doc.departamentoId as "departamentoId"',
          'doc.tipoDocumentoId as "tipoDocumentoId"',
          'doc.nip as "nip"',
          'doc.caixaArqbr as "caixaArqbr"',
          'doc.conteudoQrCode as "conteudoQrCode"',
          'doc.statusId as "statusId"',
          'doc.pessoaId as "pessoaId"',
        ])
        .where('doc.id = :id', { id })
        .getRawOne()

      if (typeof documento === 'undefined') {
        return noContent()
      }

      return ok(documento)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    contratoId,
    departamentoId,
    tipoDocumentoId,
    nip,
    caixaArqbr,
    conteudoQrCode,
    statusId,
    pessoaId
  }: IDocumentoDTO): Promise<HttpResponse> {
    const documento = await this.repository.findOne(id)

    if (!documento) {
      return notFound()
    }

    const newdocumento = this.repository.create({
      id,
      clienteId,
      contratoId,
      departamentoId,
      tipoDocumentoId,
      nip,
      caixaArqbr,
      conteudoQrCode,
      statusId,
      pessoaId
    })

    try {
      await this.repository.save(newdocumento)

      return ok(newdocumento)
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

export { DocumentoRepository }
