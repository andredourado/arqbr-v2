import { Brackets, getRepository, Repository } from 'typeorm'
import { ITipoDocumentoDTO } from '@modules/digitalizacao/dtos/i-tipo-documento-dto'
import { ITipoDocumentoRepository } from '@modules/digitalizacao/repositories/i-tipo-documento-repository'
import { TipoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/tipo-documento'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'
import { newObjectBuilder } from '@utils/new-object-constructor'

class TipoDocumentoRepository implements ITipoDocumentoRepository {
  private repository: Repository<TipoDocumento>

  constructor() {
    this.repository = getRepository(TipoDocumento)
  }


  // create
  async create ({
    clienteId,
    departamentoId,
    descricao,
    identificador,
    estrategiaQuebra,
    prazoDescarteAnos,
    desabilitado
  }: ITipoDocumentoDTO): Promise<HttpResponse> {
    const tipoDocumento = this.repository.create({
      clienteId,
      departamentoId,
      descricao,
      identificador,
      estrategiaQuebra,
      prazoDescarteAnos,
      desabilitado
    })

    const result = await this.repository.save(tipoDocumento)
      .then(tipoDocumentoResult => {
        return ok(tipoDocumentoResult)
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
      "descricao",
      "identificador",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'b.id as "departamentoId"',
          'b.nome as "departamentoNome"',
          'tip.descricao as "descricao"',
          'tip.identificador as "identificador"',
        ])
        .leftJoin('tip.clienteId', 'a')
        .leftJoin('tip.departamentoId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const tiposDocumento = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(tip.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(tip.identificador AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('b.nome', columnOrder[1])
        .addOrderBy('tip.descricao', columnOrder[2])
        .addOrderBy('tip.identificador', columnOrder[3])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(tiposDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string, clienteId: string, departamentoId: string): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "value"',
          'tip.descricao as "label"',
          'cam.id as "id"',
          'cam.nomeCampo as "nomeCampo"',
          'cam.titulo as "titulo"',
          'cam.metodoExtracao as "metodoExtracao"'
        ])
        .distinct(true)
        .leftJoin('campos_documento', 'cam', 'cam.tipoDocumentoId = tip.id')

      if (clienteId) {
        query = query 
          .where('tip.clienteId = :clienteId', { clienteId: `${clienteId}`})
      }

      if (departamentoId) {
        query = query 
          .where('tip.departamentoId = :departamentoId', { departamentoId: `${departamentoId}`})
      }

      const tiposDocumento = await query
        .andWhere('tip.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('tip.descricao')
        .getRawMany()

      const newTiposDocumento = newObjectBuilder({
        data: tiposDocumento,
        ref: 'value',
        variablesToArray: ['id', 'nomeCampo', 'titulo', 'metodoExtracao'],
        nameArrayVariable: 'campos' 
      }) 

      return ok(newTiposDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // selectFiltered
  async selectFiltered (filter: string, clienteId: string, departamentoId: string): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "value"',
          'tip.descricao as "label"',
          'cam.id as "id"',
          'cam.nomeCampo as "nomeCampo"',
          'cam.titulo as "titulo"',
          'cam.metodoExtracao as "metodoExtracao"'
        ])
        .distinct(true)
        .leftJoin('campos_documento', 'cam', 'cam.tipoDocumentoId = tip.id')
        .innerJoin('documentos_digitais', 'b', 'b.tipoDocumentoId = tip.id')

      if (clienteId) {
        query = query 
          .where('tip.clienteId = :clienteId', { clienteId: `${clienteId}`})
      }

      if (departamentoId) {
        query = query 
          .where('tip.departamentoId = :departamentoId', { departamentoId: `${departamentoId}`})
      }

      const tiposDocumento = await query
        .andWhere('tip.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('tip.descricao')
        .getRawMany()

      const newTiposDocumento = newObjectBuilder({
        data: tiposDocumento,
        ref: 'value',
        variablesToArray: ['id', 'nomeCampo', 'titulo', 'metodoExtracao'],
        nameArrayVariable: 'campos' 
      }) 

      return ok(newTiposDocumento)
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
    filter: string
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
        ])
        .leftJoin('tip.clienteId', 'a')
        .leftJoin('tip.departamentoId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const tiposDocumento = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(tip.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(tip.identificador AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
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
          'a.nomeFantasia as "clienteNomeFantasia"',
          'tip.departamentoId as "departamentoId"',
          'b.nome as "departamentoNome"',
          'tip.descricao as "descricao"',
          'tip.identificador as "identificador"',
          'tip.estrategiaQuebra as "estrategiaQuebra"',
          'tip.prazoDescarteAnos as "prazoDescarteAnos"',
          'tip.desabilitado as "desabilitado"',
        ])
        .leftJoin('tip.clienteId', 'a')
        .leftJoin('tip.departamentoId', 'b')
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


  // get by identificador
  async getByIdentificador (identificador: string): Promise<HttpResponse> {
    try {
      const tipoDocumento = await this.repository.findOne({ identificador })

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
    departamentoId,
    descricao,
    identificador,
    estrategiaQuebra,
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
      departamentoId,
      descricao,
      identificador,
      estrategiaQuebra,
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
