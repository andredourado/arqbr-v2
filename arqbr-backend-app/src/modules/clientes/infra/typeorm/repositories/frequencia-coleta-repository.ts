import { Brackets, getRepository, Repository } from 'typeorm'
import { IFrequenciaColetaDTO } from '@modules/clientes/dtos/i-frequencia-coleta-dto'
import { IFrequenciaColetaRepository } from '@modules/clientes/repositories/i-frequencia-coleta-repository'
import { FrequenciaColeta } from '@modules/clientes/infra/typeorm/entities/frequencia-coleta'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class FrequenciaColetaRepository implements IFrequenciaColetaRepository {
  private repository: Repository<FrequenciaColeta>

  constructor() {
    this.repository = getRepository(FrequenciaColeta)
  }


  // create
  async create ({
    clienteId,
    diasDoMes,
    segHorarioInicio,
    segHorarioFim,
    terHorarioInicio,
    terHorarioFim,
    quaHorarioInicio,
    quaHorarioFim,
    quiHorarioInicio,
    quiHorarioFim,
    sexHorarioInicio,
    sexHorarioFim,
    sabHorarioInicio,
    sabHorarioFim,
    domHorarioInicio,
    domHorarioFim,
    desabilitado
  }: IFrequenciaColetaDTO): Promise<HttpResponse> {
    const frequenciaColeta = this.repository.create({
      clienteId,
      diasDoMes,
      segHorarioInicio,
      segHorarioFim,
      terHorarioInicio,
      terHorarioFim,
      quaHorarioInicio,
      quaHorarioFim,
      quiHorarioInicio,
      quiHorarioFim,
      sexHorarioInicio,
      sexHorarioFim,
      sabHorarioInicio,
      sabHorarioFim,
      domHorarioInicio,
      domHorarioFim,
      desabilitado
    })

    const result = await this.repository.save(frequenciaColeta)
      .then(frequenciaColetaResult => {
        return ok(frequenciaColetaResult)
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
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('fre')
        .select([
          'fre.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
        ])
        .leftJoin('fre.clienteId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const frequenciaColetas = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(frequenciaColetas)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const frequenciaColetas = await this.repository.createQueryBuilder('fre')
        .select([
          'fre. as "value"',
          'fre. as "label"',
        ])
        .where('fre. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('fre.')
        .getRawMany()

      return ok(frequenciaColetas)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const frequenciaColeta = await this.repository.createQueryBuilder('fre')
        .select([
          'fre. as "value"',
          'fre. as "label"',
        ])
        .where('fre. = :id', { id: `${id}` })
        .getRawOne()

      return ok(frequenciaColeta)
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
      let query = this.repository.createQueryBuilder('fre')
        .select([
          'fre.id as "id"',
        ])
        .leftJoin('fre.clienteId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const frequenciaColetas = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: frequenciaColetas.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const frequenciaColeta = await this.repository.createQueryBuilder('fre')
        .select([
          'fre.id as "id"',
          'fre.clienteId as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'fre.diasDoMes as "diasDoMes"',
          'fre.segHorarioInicio as "segHorarioInicio"',
          'fre.segHorarioFim as "segHorarioFim"',
          'fre.terHorarioInicio as "terHorarioInicio"',
          'fre.terHorarioFim as "terHorarioFim"',
          'fre.quaHorarioInicio as "quaHorarioInicio"',
          'fre.quaHorarioFim as "quaHorarioFim"',
          'fre.quiHorarioInicio as "quiHorarioInicio"',
          'fre.quiHorarioFim as "quiHorarioFim"',
          'fre.sexHorarioInicio as "sexHorarioInicio"',
          'fre.sexHorarioFim as "sexHorarioFim"',
          'fre.sabHorarioInicio as "sabHorarioInicio"',
          'fre.sabHorarioFim as "sabHorarioFim"',
          'fre.domHorarioInicio as "domHorarioInicio"',
          'fre.domHorarioFim as "domHorarioFim"',
          'fre.desabilitado as "desabilitado"',
        ])
        .leftJoin('fre.clienteId', 'a')
        .where('fre.id = :id', { id })
        .getRawOne()

      if (typeof frequenciaColeta === 'undefined') {
        return noContent()
      }

      return ok(frequenciaColeta)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    diasDoMes,
    segHorarioInicio,
    segHorarioFim,
    terHorarioInicio,
    terHorarioFim,
    quaHorarioInicio,
    quaHorarioFim,
    quiHorarioInicio,
    quiHorarioFim,
    sexHorarioInicio,
    sexHorarioFim,
    sabHorarioInicio,
    sabHorarioFim,
    domHorarioInicio,
    domHorarioFim,
    desabilitado
  }: IFrequenciaColetaDTO): Promise<HttpResponse> {
    const frequenciaColeta = await this.repository.findOne(id)

    if (!frequenciaColeta) {
      return notFound()
    }

    const newfrequenciaColeta = this.repository.create({
      id,
      clienteId,
      diasDoMes,
      segHorarioInicio,
      segHorarioFim,
      terHorarioInicio,
      terHorarioFim,
      quaHorarioInicio,
      quaHorarioFim,
      quiHorarioInicio,
      quiHorarioFim,
      sexHorarioInicio,
      sexHorarioFim,
      sabHorarioInicio,
      sabHorarioFim,
      domHorarioInicio,
      domHorarioFim,
      desabilitado
    })

    try {
      await this.repository.save(newfrequenciaColeta)

      return ok(newfrequenciaColeta)
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

export { FrequenciaColetaRepository }
