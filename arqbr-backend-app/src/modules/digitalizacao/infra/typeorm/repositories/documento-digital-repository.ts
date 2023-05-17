import { Brackets, getRepository, Repository } from 'typeorm'
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
    clienteId,
    departamentoId,
    tipoDocumentoId,
    nomeArquivo,
    nomeArquivoOrigem,
    conteudoEmTexto,
    numeroPaginas,
    solicitacaoFisico,
    dataSolicitacao,
    solicitanteId
  }: IDocumentoDigitalDTO): Promise<HttpResponse> {
    const documentoDigital = this.repository.create({
      clienteId,
      departamentoId,
      tipoDocumentoId,
      nomeArquivo,
      nomeArquivoOrigem,
      conteudoEmTexto,
      numeroPaginas,
      solicitacaoFisico,
      dataSolicitacao,
      solicitanteId
    })

    const result = await this.repository.save(documentoDigital)
      .then(documentoDigitalResult => {
        return ok(documentoDigitalResult)
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
      "clienteNomeFantasia",
      "departamentoNome",
      "tipoDocumentoDescricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'b.id as "departamentoId"',
          'b.nome as "departamentoNome"',
          'c.id as "tipoDocumentoId"',
          'c.descricao as "tipoDocumentoDescricao"',
        ])
        .leftJoin('doc.clienteId', 'a')
        .leftJoin('doc.departamentoId', 'b')
        .leftJoin('doc.tipoDocumentoId', 'c')

      if (filter) {
        query = query
          .where(filter)
      }

      const documentosDigitais = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('b.nome', columnOrder[1])
        .addOrderBy('c.descricao', columnOrder[2])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

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
    filter: string
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
        ])
        .leftJoin('doc.clienteId', 'a')
        .leftJoin('doc.departamentoId', 'b')
        .leftJoin('doc.tipoDocumentoId', 'c')

      if (filter) {
        query = query
          .where(filter)
      }

      const documentosDigitais = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
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
          'doc.clienteId as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'doc.departamentoId as "departamentoId"',
          'b.nome as "departamentoNome"',
          'doc.tipoDocumentoId as "tipoDocumentoId"',
          'c.descricao as "tipoDocumentoDescricao"',
          'doc.nomeArquivo as "nomeArquivo"',
          'doc.nomeArquivoOrigem as "nomeArquivoOrigem"',
          'doc.conteudoEmTexto as "conteudoEmTexto"',
          'doc.numeroPaginas as "numeroPaginas"',
          'doc.solicitacaoFisico as "solicitacaoFisico"',
          'doc.dataSolicitacao as "dataSolicitacao"',
          'doc.solicitanteId as "solicitanteId"',
          'd.nome as "solicitanteNome"',
        ])
        .leftJoin('doc.clienteId', 'a')
        .leftJoin('doc.departamentoId', 'b')
        .leftJoin('doc.tipoDocumentoId', 'c')
        .leftJoin('doc.solicitanteId', 'd')
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
    clienteId,
    departamentoId,
    tipoDocumentoId,
    nomeArquivo,
    nomeArquivoOrigem,
    conteudoEmTexto,
    numeroPaginas,
    solicitacaoFisico,
    dataSolicitacao,
    solicitanteId
  }: IDocumentoDigitalDTO): Promise<HttpResponse> {
    const documentoDigital = await this.repository.findOne(id)

    if (!documentoDigital) {
      return notFound()
    }

    const newdocumentoDigital = this.repository.create({
      id,
      clienteId,
      departamentoId,
      tipoDocumentoId,
      nomeArquivo,
      nomeArquivoOrigem,
      conteudoEmTexto,
      numeroPaginas,
      solicitacaoFisico,
      dataSolicitacao,
      solicitanteId
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
