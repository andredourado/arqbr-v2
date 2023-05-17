import { getRepository, Repository } from 'typeorm'
import { IEscalaDTO } from '@modules/pessoas/dtos/i-escala-dto'
import { IEscalaRepository } from '@modules/pessoas/repositories/i-escala-repository'
import { Escala } from '@modules/pessoas/infra/typeorm/entities/escala'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class EscalaRepository implements IEscalaRepository {
  private repository: Repository<Escala>

  constructor() {
    this.repository = getRepository(Escala)
  }


  // create
  async create ({
    pessoaId,
    jornadaId,
    desabilitado
  }: IEscalaDTO): Promise<HttpResponse> {
    const escala = this.repository.create({
      pessoaId,
      jornadaId,
      desabilitado
    })

    const result = await this.repository.save(escala)
      .then(escalaResult => {
        return ok(escalaResult)
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
      "pessoaNome",
      "jornadaDescricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let escalas = await this.repository.createQueryBuilder('esc')
        .select([
          'esc.id as "id"',
          'a.id as "pessoaId"',
          'a.nome as "pessoaNome"',
          'b.id as "jornadaId"',
          'b.descricao as "jornadaDescricao"',
        ])
        .leftJoin('esc.pessoaId', 'a')
        .leftJoin('esc.jornadaId', 'b')
        .where('a.nome ilike :search', { search: `%${search}%` })
        .addOrderBy('a.nome', columnOrder[0])
        .addOrderBy('b.descricao', columnOrder[1])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (escalas.length > rowsPerPage) {
        escalas = escalas.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(escalas)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const escalas = await this.repository.createQueryBuilder('esc')
        .select([
          'esc. as "value"',
          'esc. as "label"',
        ])
        .where('esc. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('esc.')
        .getRawMany()

      return ok(escalas)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const escala = await this.repository.createQueryBuilder('esc')
        .select([
          'esc. as "value"',
          'esc. as "label"',
        ])
        .where('esc. = :id', { id: `${id}` })
        .getRawOne()

      return ok(escala)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const escalas = await this.repository.createQueryBuilder('esc')
        .select([
          'esc.id as "id"',
        ])
        .leftJoin('esc.pessoaId', 'a')
        .leftJoin('esc.jornadaId', 'b')
        .where('a.nome ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: escalas.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const escala = await this.repository.createQueryBuilder('esc')
        .select([
          'esc.id as "id"',
          'esc.pessoaId as "pessoaId"',
          'esc.jornadaId as "jornadaId"',
          'esc.desabilitado as "desabilitado"',
        ])
        .where('esc.id = :id', { id })
        .getRawOne()

      if (typeof escala === 'undefined') {
        return noContent()
      }

      return ok(escala)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    pessoaId,
    jornadaId,
    desabilitado
  }: IEscalaDTO): Promise<HttpResponse> {
    const escala = await this.repository.findOne(id)

    if (!escala) {
      return notFound()
    }

    const newescala = this.repository.create({
      id,
      pessoaId,
      jornadaId,
      desabilitado
    })

    try {
      await this.repository.save(newescala)

      return ok(newescala)
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

export { EscalaRepository }
