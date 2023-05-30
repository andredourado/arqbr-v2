import { Brackets, getRepository, Repository } from 'typeorm'
import { IDocumentoDigitalDTO, ISolicitacao } from '@modules/digitalizacao/dtos/i-documento-digital-dto'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { DocumentoDigital } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante'

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
    filter: any,
    tipoDocumentoId: string,
    user: User,
    solicitante: Solicitante
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

    page-- 
    const offset = rowsPerPage * (page)

    try {
      let query = this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
          'doc.solicitacaoFisico as "solicitacaoFisico"',
          'doc.nomeArquivo as "nomeArquivo"',
          'doc.dataSolicitacao as "dataSolicitacao"',
          'doc.solicitanteId as "solicitanteId"',
          'a.id as "tipoDocumentoId"',
          'a.descricao as "tipoDocumentoDescricao"',
          'b.id as "clienteId"',
          'b.nomeFantasia as "clienteNomeFantasia"',
          'c.id as "departamentoId"',
          'c.nome as "departamentoNome"',
        ])
        .distinct(true)
        .leftJoin('doc.tipoDocumentoId', 'a')
        .leftJoin('doc.clienteId', 'b')
        .leftJoin('doc.departamentoId', 'c')
        .leftJoin('solicitantes', 'd', 'd.departamentoId = c.id')
      
      if (filter != null) {
        Object.entries(filter).forEach(([key, value], index) => {
          if (value != null && value != '') {
            if (key != 'texto') {
              query = query
                .innerJoin('documentos_digitais_campos', `d${index}`, `d${index}.documentoDigitalId = doc.id and d${index}.campoDocumentoId = '${key}' and d${index}.conteudo iLike '%${value}%'`)
            }
          }
        })
      }

      if (filter != null) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value != null && value != '') {
            if (key === 'texto') {
              query = query
                .andWhere('doc.conteudoEmTexto ilike :conteudo', { conteudo: `%${value}%` })
            }
          }
        })
      }

      if (tipoDocumentoId) {
        query = query
          .andWhere('doc.tipoDocumentoId = :tipoDocumentoId', { tipoDocumentoId })
      }

      if (!user.isAdmin && !user.isSuperUser && !solicitante.gestorContrato) {
        query = query
          .andWhere('d.email = :email', { email: solicitante.email })
          .andWhere('d.departamentoId = doc.departamentoId')
      }

      let documentosDigitais = await query
        .addOrderBy('doc.nomeArquivo')
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
          'doc.nomeArquivo as "label"',
        ])
        .where('doc.nomeArquivo ilike :filter', { filter: `${filter}%` })
        .addOrderBy('doc.nomeArquivo')
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
          'doc.nomeArquivo as "label"',
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
    filter: any,
    tipoDocumentoId: string,
    user: User,
    solicitante: Solicitante
  ): Promise<HttpResponse> {
    search = search ?? ''
    try {
      let query = this.repository.createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
        ])
        .distinct(true)
        .leftJoin('doc.tipoDocumentoId', 'a')
        .leftJoin('doc.clienteId', 'b')
        .leftJoin('doc.departamentoId', 'c')
        .leftJoin('solicitantes', 'd', 'd.departamentoId = c.id')
      
      if (filter != null) {
        Object.entries(filter).forEach(([key, value], index) => {
          if (value != null && value != '') {
            if (key != 'texto') {
              query = query
                .innerJoin('documentos_digitais_campos', `d${index}`, `d${index}.documentoDigitalId = doc.id and d${index}.campoDocumentoId = '${key}' and d${index}.conteudo iLike '%${value}%'`)
            }
          }
        })
      }

      if (filter != null) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value != null && value != '') {
            if (key === 'texto') {
              query = query
                .andWhere('doc.conteudoEmTexto ilike :conteudo', { conteudo: `%${value}%` })
            }
          }
        })
      }

      if (tipoDocumentoId) {
        query = query
          .andWhere('doc.tipoDocumentoId = :tipoDocumentoId', { tipoDocumentoId })
      }

      if (!user.isAdmin && !user.isSuperUser && !solicitante.gestorContrato) {
        query = query
          .andWhere('d.email = :email', { email: solicitante.email })
          .andWhere('d.departamentoId = doc.departamentoId')
      }

      const documentosDigitais = await query
        .getRawMany()

      return ok({ count: documentosDigitais.length })
    } catch (err) {
      console.log(err)
      return serverError(err)
    }
  }


  // count pages
  async countPages(
    user: User,
    solicitante: Solicitante
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('doc')
        .select([
          'SUM(doc.numero_paginas::INT) as "numeroPaginas"',
        ])
        .leftJoin('doc.clienteId', 'a')
        .leftJoin('doc.departamentoId', 'b')
        .leftJoin('solicitantes', 'c', 'c.departamentoId = b.id')

      if (!user.isAdmin && !user.isSuperUser && !solicitante.gestorContrato) {
        query = query
          .andWhere('c.email = :email', { email: solicitante.email })
          .andWhere('c.departamentoId = doc.departamentoId')
      }

      const countPages = await query
        .getRawOne()

      return ok(countPages)
    } catch (err) {
      return serverError(err)
    }
  }


  async countProcessing(
    user: User,
    solicitante: Solicitante
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('doc')
        .select("count(distinct SUBSTRING(doc.nome_arquivo, 3, POSITION('_' IN doc.nome_arquivo) - 3))")
        .leftJoin('doc.clienteId', 'a')
        .leftJoin('doc.departamentoId', 'b')
        .leftJoin('solicitantes', 'c', 'c.departamentoId = b.id')

      if (!user.isAdmin && !user.isSuperUser && !solicitante.gestorContrato) {
        query = query
          .andWhere('c.email = :email', { email: solicitante.email })
          .andWhere('c.departamentoId = doc.departamentoId')
      }
      
      const processing = await query
        .getRawOne()

      return ok(processing)
    } catch (err) {
      return serverError(err)
    }
  }


  // count by tipo documento 
  async countByTipoDocumento(
    user: User,
    solicitante: Solicitante
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('doc')
        .select([
          'a.descricao as "tipoDocumento"',
          'COUNT(a.id) as "quantidade"'
        ])
        .leftJoin('doc.tipoDocumentoId', 'a')
        .leftJoin('doc.clienteId', 'b')
        .leftJoin('doc.departamentoId', 'c')
        .leftJoin('solicitantes', 'd', 'd.departamentoId = c.id')

        if (!user.isAdmin && !user.isSuperUser && !solicitante.gestorContrato) {
          query = query
            .andWhere('d.email = :email', { email: solicitante.email })
            .andWhere('d.departamentoId = doc.departamentoId')
        }

      const countPages = await query
        .groupBy('a.id')
        .orderBy('COUNT(a.id)', 'DESC')
        .take(5)
        .getRawMany()

      return ok(countPages)
    } catch (err) {
      return serverError(err)
    }
  }


  // count by departamento 
  async countByDepartamento(): Promise<HttpResponse> {
    try {
      let countByDepartamento = await this.repository.createQueryBuilder('doc')
        .select([
          'a.nome as "departamento"',
          'COUNT(doc.id) as "quantidade"'
        ])
        .leftJoin('doc.departamentoId', 'a')
        .groupBy('a.nome')
        .orderBy('COUNT(doc.id)', 'DESC')
        .take(5)
        .getRawMany()

      return ok(countByDepartamento)
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
          'doc.solicitacaoFisico as "solicitacaoFisico"',
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
    const documentoDigital = await this.repository
      .createQueryBuilder("doc").select([
        'doc.id as "id"'
      ])
      .where('doc.id =:id', { id })
      .getRawOne()
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
      if (err.message.slice(0, 10) === 'null value') {
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
      if (err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }

  async getDocumentosSolicitados(rowsPerPage: number = 5): Promise<HttpResponse<ISolicitacao[]>> {
    try {
      let query = await this.repository
        .createQueryBuilder('doc')
        .select([
          'doc.id as "id"',
          'doc.solicitacaoFisico as "solicitacaoFisico"',
          'doc.nomeArquivo as "nomeArquivo"',
          'doc.dataSolicitacao as "dataSolicitacao"',
          'sol.id as "solicitanteId"',
          'sol.nome as "solicitanteNome"',
        ])
        .leftJoin('doc.solicitanteId', 'sol')
        .where('doc.solicitacaoFisico = true')
        .addOrderBy('doc.dataSolicitacao', 'DESC')
        .take(rowsPerPage)
        .limit(rowsPerPage)
        .getRawMany()

        return ok(query)
    } catch (err) {
      console.log(err)
      return {statusCode: 500, data: null}
    }
  }
}

export { DocumentoDigitalRepository }
