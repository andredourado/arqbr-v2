import { Brackets, getRepository, Repository } from 'typeorm'
import { ICaixaQuebraDTO } from '@modules/digitalizacao/dtos/i-caixa-quebra-dto'
import { ICaixaQuebraRepository } from '@modules/digitalizacao/repositories/i-caixa-quebra-repository'
import { CaixaQuebra } from '@modules/digitalizacao/infra/typeorm/entities/caixa-quebra'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class CaixaQuebraRepository implements ICaixaQuebraRepository {
  private repository: Repository<CaixaQuebra>

  constructor() {
    this.repository = getRepository(CaixaQuebra)
  }


  // create
  async create ({
    clienteId,
    departamentoId,
    tipoDocumentoId,
    nomeArquivoOrigem,
    sequencia,
    paginaInicial,
    paginaFinal,
    status
  }: ICaixaQuebraDTO): Promise<HttpResponse> {
    const caixaQuebra = this.repository.create({
      clienteId,
      departamentoId,
      tipoDocumentoId,
      nomeArquivoOrigem,
      sequencia,
      paginaInicial,
      paginaFinal,
      status
    })

    const result = await this.repository.save(caixaQuebra)
      .then(caixaQuebraResult => {
        return ok(caixaQuebraResult)
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
      "nomeArquivoOrigem",
      "sequencia",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('cai')
        .select([
          'cai.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'b.id as "departamentoId"',
          'b.nome as "departamentoNome"',
          'c.id as "tipoDocumentoId"',
          'c.descricao as "tipoDocumentoDescricao"',
          'cai.nomeArquivoOrigem as "nomeArquivoOrigem"',
          'cai.sequencia as "sequencia"',
        ])
        .leftJoin('cai.clienteId', 'a')
        .leftJoin('cai.departamentoId', 'b')
        .leftJoin('cai.tipoDocumentoId', 'c')

      if (filter) {
        query = query
          .where(filter)
      }

      const caixasQuebras = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cai.nomeArquivoOrigem AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('b.nome', columnOrder[1])
        .addOrderBy('c.descricao', columnOrder[2])
        .addOrderBy('cai.nomeArquivoOrigem', columnOrder[3])
        .addOrderBy('cai.sequencia', columnOrder[4])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(caixasQuebras)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const caixasQuebras = await this.repository.createQueryBuilder('cai')
        .select([
          'cai. as "value"',
          'cai. as "label"',
        ])
        .where('cai. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('cai.')
        .getRawMany()

      return ok(caixasQuebras)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const caixaQuebra = await this.repository.createQueryBuilder('cai')
        .select([
          'cai. as "value"',
          'cai. as "label"',
        ])
        .where('cai. = :id', { id: `${id}` })
        .getRawOne()

      return ok(caixaQuebra)
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
      let query = this.repository.createQueryBuilder('cai')
        .select([
          'cai.id as "id"',
        ])
        .leftJoin('cai.clienteId', 'a')
        .leftJoin('cai.departamentoId', 'b')
        .leftJoin('cai.tipoDocumentoId', 'c')

      if (filter) {
        query = query
          .where(filter)
      }

      const caixasQuebras = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cai.nomeArquivoOrigem AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: caixasQuebras.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const caixaQuebra = await this.repository.createQueryBuilder('cai')
        .select([
          'cai.id as "id"',
          'cai.clienteId as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'cai.departamentoId as "departamentoId"',
          'b.nome as "departamentoNome"',
          'cai.tipoDocumentoId as "tipoDocumentoId"',
          'c.descricao as "tipoDocumentoDescricao"',
          'cai.nomeArquivoOrigem as "nomeArquivoOrigem"',
          'cai.sequencia as "sequencia"',
          'cai.paginaInicial as "paginaInicial"',
          'cai.paginaFinal as "paginaFinal"',
          'cai.status as "status"',
        ])
        .leftJoin('cai.clienteId', 'a')
        .leftJoin('cai.departamentoId', 'b')
        .leftJoin('cai.tipoDocumentoId', 'c')
        .where('cai.id = :id', { id })
        .getRawOne()

      if (typeof caixaQuebra === 'undefined') {
        return noContent()
      }

      return ok(caixaQuebra)
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
    nomeArquivoOrigem,
    sequencia,
    paginaInicial,
    paginaFinal,
    status
  }: ICaixaQuebraDTO): Promise<HttpResponse> {
    const caixaQuebra = await this.repository.findOne(id)

    if (!caixaQuebra) {
      return notFound()
    }

    const newcaixaQuebra = this.repository.create({
      id,
      clienteId,
      departamentoId,
      tipoDocumentoId,
      nomeArquivoOrigem,
      sequencia,
      paginaInicial,
      paginaFinal,
      status
    })

    try {
      await this.repository.save(newcaixaQuebra)

      return ok(newcaixaQuebra)
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

export { CaixaQuebraRepository }
