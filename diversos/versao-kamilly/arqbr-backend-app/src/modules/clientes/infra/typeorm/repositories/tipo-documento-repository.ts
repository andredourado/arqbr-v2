import { getRepository, Repository } from 'typeorm'
import { ITipoDocumentoDTO } from '@modules/clientes/dtos/i-tipo-documento-dto'
import { ITipoDocumentoRepository } from '@modules/clientes/repositories/i-tipo-documento-repository'
import { TipoDocumento } from '@modules/clientes/infra/typeorm/entities/tipo-documento'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class TipoDocumentoRepository implements ITipoDocumentoRepository {
  private repository: Repository<TipoDocumento>

  constructor() {
    this.repository = getRepository(TipoDocumento)
  }


  // create
  async create ({
    clienteId,
    contratoId,
    departamentoId,
    descricao,
    composicaoLoteId,
    numeroPaginas,
    mascaraNomeArquivo,
    prazoDescarteAnos,
    desabilitado
  }: ITipoDocumentoDTO): Promise<HttpResponse> {
    const tipoDocumento = this.repository.create({
      clienteId,
      contratoId,
      departamentoId,
      descricao,
      composicaoLoteId,
      numeroPaginas,
      mascaraNomeArquivo,
      prazoDescarteAnos,
      desabilitado
    })

    const result = await this.repository.save(tipoDocumento)
      .then(tipoDocumentoResult => {
        return ok(tipoDocumentoResult)
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
      "descricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let tiposDocumento = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'b.id as "contratoId"',
          'b.identificador as "contratoIdentificador"',
          'c.id as "departamentoId"',
          'c.nome as "departamentoNome"',
          'tip.descricao as "descricao"',
        ])
        .leftJoin('tip.clienteId', 'a')
        .leftJoin('tip.contratoId', 'b')
        .leftJoin('tip.departamentoId', 'c')
        .where('a.nomeFantasia ilike :search', { search: `%${search}%` })
        .orWhere('tip.descricao ilike :search', { search: `%${search}%` })
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('b.identificador', columnOrder[1])
        .addOrderBy('c.nome', columnOrder[2])
        .addOrderBy('tip.descricao', columnOrder[3])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (tiposDocumento.length > rowsPerPage) {
        tiposDocumento = tiposDocumento.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(tiposDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string, clienteId): Promise<HttpResponse> {
    try {
      const tiposDocumento = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "value"',
          'tip.descricao as "label"',
        ])
        .where('tip.clienteId = :clienteId', { clienteId: `${clienteId}`})
        .andWhere('tip.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('tip.descricao')
        .getRawMany()

      return ok(tiposDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const tipoDocumento = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "value"',
          'tip.descricao as "label"',
        ])
        .where('tip.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(tipoDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const tiposDocumento = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
        ])
        .leftJoin('tip.clienteId', 'a')
        .leftJoin('tip.contratoId', 'b')
        .leftJoin('tip.departamentoId', 'c')
        .where('a.nomeFantasia ilike :search', { search: `%${search}%` })
        .orWhere('tip.descricao ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: tiposDocumento.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const tipoDocumento = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
          'tip.clienteId as "clienteId"',
          'tip.contratoId as "contratoId"',
          'tip.departamentoId as "departamentoId"',
          'tip.descricao as "descricao"',
          'tip.composicaoLoteId as "composicaoLoteId"',
          'tip.numeroPaginas as "numeroPaginas"',
          'tip.mascaraNomeArquivo as "mascaraNomeArquivo"',
          'tip.prazoDescarteAnos as "prazoDescarteAnos"',
          'tip.desabilitado as "desabilitado"',
        ])
        .where('tip.id = :id', { id })
        .getRawOne()

      if (typeof tipoDocumento === 'undefined') {
        return noContent()
      }

      return ok(tipoDocumento)
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
    descricao,
    composicaoLoteId,
    numeroPaginas,
    mascaraNomeArquivo,
    prazoDescarteAnos,
    desabilitado
  }: ITipoDocumentoDTO): Promise<HttpResponse> {
    const tipoDocumento = await this.repository.findOne(id)

    if (!tipoDocumento) {
      return notFound()
    }

    const newtipoDocumento = this.repository.create({
      id,
      clienteId,
      contratoId,
      departamentoId,
      descricao,
      composicaoLoteId,
      numeroPaginas,
      mascaraNomeArquivo,
      prazoDescarteAnos,
      desabilitado
    })

    try {
      await this.repository.save(newtipoDocumento)

      return ok(newtipoDocumento)
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

export { TipoDocumentoRepository }
