import { getRepository, Repository } from 'typeorm'
import { IContratoDTO } from '@modules/clientes/dtos/i-contrato-dto'
import { IContratoRepository } from '@modules/clientes/repositories/i-contrato-repository'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class ContratoRepository implements IContratoRepository {
  private repository: Repository<Contrato>

  constructor() {
    this.repository = getRepository(Contrato)
  }


  // create
  async create ({
    clienteId,
    identificador,
    aceitaServicosTerceiros,
    desabilitado
  }: IContratoDTO): Promise<HttpResponse> {
    const contrato = this.repository.create({
      clienteId,
      identificador,
      aceitaServicosTerceiros,
      desabilitado
    })

    const result = await this.repository.save(contrato)
      .then(contratoResult => {
        return ok(contratoResult)
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
      "identificador",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let contratos = await this.repository.createQueryBuilder('con')
        .select([
          'con.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'con.identificador as "identificador"',
        ])
        .leftJoin('con.clienteId', 'a')
        .where('a.nomeFantasia ilike :search', { search: `%${search}%` })
        .orWhere('con.identificador ilike :search', { search: `%${search}%` })
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('con.identificador', columnOrder[1])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (contratos.length > rowsPerPage) {
        contratos = contratos.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(contratos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string, clienteId): Promise<HttpResponse> {
    try {
      const contratos = await this.repository.createQueryBuilder('con')
        .select([
          'con.id as "value"',
          'con.identificador as "label"',
        ])
        .where('con.clienteId = :clienteId', { clienteId: `${clienteId}`})
        .andWhere('con.identificador ilike :filter', { filter: `${filter}%` })
        .addOrderBy('con.identificador')
        .getRawMany()

      return ok(contratos)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const contrato = await this.repository.createQueryBuilder('con')
        .select([
          'con.id as "value"',
          'con.identificador as "label"',
        ])
        .where('con.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(contrato)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const contratos = await this.repository.createQueryBuilder('con')
        .select([
          'con.id as "id"',
        ])
        .leftJoin('con.clienteId', 'a')
        .where('a.nomeFantasia ilike :search', { search: `%${search}%` })
        .orWhere('con.identificador ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: contratos.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const contrato = await this.repository.createQueryBuilder('con')
        .select([
          'con.id as "id"',
          'con.clienteId as "clienteId"',
          'con.identificador as "identificador"',
          'con.aceitaServicosTerceiros as "aceitaServicosTerceiros"',
          'con.desabilitado as "desabilitado"',
        ])
        .where('con.id = :id', { id })
        .getRawOne()

      if (typeof contrato === 'undefined') {
        return noContent()
      }

      return ok(contrato)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    identificador,
    aceitaServicosTerceiros,
    desabilitado
  }: IContratoDTO): Promise<HttpResponse> {
    const contrato = await this.repository.findOne(id)

    if (!contrato) {
      return notFound()
    }

    const newcontrato = this.repository.create({
      id,
      clienteId,
      identificador,
      aceitaServicosTerceiros,
      desabilitado
    })

    try {
      await this.repository.save(newcontrato)

      return ok(newcontrato)
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

export { ContratoRepository }
