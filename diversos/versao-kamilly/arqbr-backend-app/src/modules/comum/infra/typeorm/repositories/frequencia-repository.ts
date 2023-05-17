import { getRepository, Repository } from 'typeorm'
import { IFrequenciaDTO } from '@modules/comum/dtos/i-frequencia-dto'
import { IFrequenciaRepository } from '@modules/comum/repositories/i-frequencia-repository'
import { Frequencia } from '@modules/comum/infra/typeorm/entities/frequencia'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class FrequenciaRepository implements IFrequenciaRepository {
  private repository: Repository<Frequencia>

  constructor() {
    this.repository = getRepository(Frequencia)
  }


  // create
  async create ({
    descricao,
    espacoEmDias,
    desabilitado
  }: IFrequenciaDTO): Promise<HttpResponse> {
    const frequencia = this.repository.create({
      descricao,
      espacoEmDias,
      desabilitado
    })

    const result = await this.repository.save(frequencia)
      .then(frequenciaResult => {
        return ok(frequenciaResult)
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
      "descricao",
      "espacoEmDias",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let frequencias = await this.repository.createQueryBuilder('fre')
        .select([
          'fre.id as "id"',
          'fre.descricao as "descricao"',
          'fre.espacoEmDias as "espacoEmDias"',
        ])
        .where('fre.descricao ilike :search', { search: `%${search}%` })
        .addOrderBy('fre.descricao', columnOrder[0])
        .addOrderBy('fre.espacoEmDias', columnOrder[1])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (frequencias.length > rowsPerPage) {
        frequencias = frequencias.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(frequencias)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const frequencias = await this.repository.createQueryBuilder('fre')
        .select([
          'fre.id as "value"',
          'fre.descricao as "label"',
        ])
        .where('fre.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('fre.descricao')
        .getRawMany()

      return ok(frequencias)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const frequencia = await this.repository.createQueryBuilder('fre')
        .select([
          'fre.id as "value"',
          'fre.descricao as "label"',
        ])
        .where('fre.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(frequencia)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const frequencias = await this.repository.createQueryBuilder('fre')
        .select([
          'fre.id as "id"',
        ])
        .where('fre.descricao ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: frequencias.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const frequencia = await this.repository.createQueryBuilder('fre')
        .select([
          'fre.id as "id"',
          'fre.descricao as "descricao"',
          'fre.espacoEmDias as "espacoEmDias"',
          'fre.desabilitado as "desabilitado"',
        ])
        .where('fre.id = :id', { id })
        .getRawOne()

      if (typeof frequencia === 'undefined') {
        return noContent()
      }

      return ok(frequencia)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    descricao,
    espacoEmDias,
    desabilitado
  }: IFrequenciaDTO): Promise<HttpResponse> {
    const frequencia = await this.repository.findOne(id)

    if (!frequencia) {
      return notFound()
    }

    const newfrequencia = this.repository.create({
      id,
      descricao,
      espacoEmDias,
      desabilitado
    })

    try {
      await this.repository.save(newfrequencia)

      return ok(newfrequencia)
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

export { FrequenciaRepository }
