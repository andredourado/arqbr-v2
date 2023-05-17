import { Brackets, getRepository, Repository } from 'typeorm'
import { IColetaDTO } from '@modules/coleta/dtos/i-coleta-dto'
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository'
import { Coleta } from '@modules/coleta/infra/typeorm/entities/coleta'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class ColetaRepository implements IColetaRepository {
  private repository: Repository<Coleta>

  constructor() {
    this.repository = getRepository(Coleta)
  }


  // create
  async create ({
    clienteId,
    departamentoId,
    solicitanteId,
    pontoColetaId,
    identificador,
    dataProgramadaColeta,
    horaProgramadaColeta,
    volumes,
    veiculoId,
    entregadorId,
    dataEfetivaColeta,
    horaEfetivaColeta,
    arquivoFotoProtocolo
  }: IColetaDTO): Promise<HttpResponse> {
    const coleta = this.repository.create({
      clienteId,
      departamentoId,
      solicitanteId,
      pontoColetaId,
      identificador,
      dataProgramadaColeta,
      horaProgramadaColeta,
      volumes,
      veiculoId,
      entregadorId,
      dataEfetivaColeta,
      horaEfetivaColeta,
      arquivoFotoProtocolo
    })

    const result = await this.repository.save(coleta)
      .then(coletaResult => {
        return ok(coletaResult)
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
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('col')
        .select([
          'col.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'b.id as "departamentoId"',
          'b.nome as "departamentoNome"',
        ])
        .leftJoin('col.clienteId', 'a')
        .leftJoin('col.departamentoId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const coletas = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('b.nome', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(coletas)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const coletas = await this.repository.createQueryBuilder('col')
        .select([
          'col.id as "value"',
          'col.identificador as "label"',
        ])
        .where('col.identificador ilike :filter', { filter: `${filter}%` })
        .addOrderBy('col.identificador')
        .getRawMany()

      return ok(coletas)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const coleta = await this.repository.createQueryBuilder('col')
        .select([
          'col.id as "value"',
          'col.identificador as "label"',
        ])
        .where('col.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(coleta)
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
      let query = this.repository.createQueryBuilder('col')
        .select([
          'col.id as "id"',
        ])
        .leftJoin('col.clienteId', 'a')
        .leftJoin('col.departamentoId', 'b')

      if (filter) {
        query = query
          .where(filter)
      }

      const coletas = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: coletas.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const coleta = await this.repository.createQueryBuilder('col')
        .select([
          'col.id as "id"',
          'col.clienteId as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'col.departamentoId as "departamentoId"',
          'b.nome as "departamentoNome"',
          'col.solicitanteId as "solicitanteId"',
          'c.nome as "solicitanteNome"',
          'col.pontoColetaId as "pontoColetaId"',
          'd.descricao as "pontoColetaDescricao"',
          'col.identificador as "identificador"',
          'col.dataProgramadaColeta as "dataProgramadaColeta"',
          'col.horaProgramadaColeta as "horaProgramadaColeta"',
          'col.volumes as "volumes"',
          'col.veiculoId as "veiculoId"',
          'e.descricao as "veiculoDescricao"',
          'col.entregadorId as "entregadorId"',
          'f.nome as "entregadorNome"',
          'col.dataEfetivaColeta as "dataEfetivaColeta"',
          'col.horaEfetivaColeta as "horaEfetivaColeta"',
          'col.arquivoFotoProtocolo as "arquivoFotoProtocolo"',
        ])
        .leftJoin('col.clienteId', 'a')
        .leftJoin('col.departamentoId', 'b')
        .leftJoin('col.solicitanteId', 'c')
        .leftJoin('col.pontoColetaId', 'd')
        .leftJoin('col.veiculoId', 'e')
        .leftJoin('col.entregadorId', 'f')
        .where('col.id = :id', { id })
        .getRawOne()

      if (typeof coleta === 'undefined') {
        return noContent()
      }

      return ok(coleta)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    departamentoId,
    solicitanteId,
    pontoColetaId,
    identificador,
    dataProgramadaColeta,
    horaProgramadaColeta,
    volumes,
    veiculoId,
    entregadorId,
    dataEfetivaColeta,
    horaEfetivaColeta,
    arquivoFotoProtocolo
  }: IColetaDTO): Promise<HttpResponse> {
    const coleta = await this.repository.findOne(id)

    if (!coleta) {
      return notFound()
    }

    const newcoleta = this.repository.create({
      id,
      clienteId,
      departamentoId,
      solicitanteId,
      pontoColetaId,
      identificador,
      dataProgramadaColeta,
      horaProgramadaColeta,
      volumes,
      veiculoId,
      entregadorId,
      dataEfetivaColeta,
      horaEfetivaColeta,
      arquivoFotoProtocolo
    })

    try {
      await this.repository.save(newcoleta)

      return ok(newcoleta)
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

export { ColetaRepository }
