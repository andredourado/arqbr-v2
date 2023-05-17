import { getRepository, Repository } from 'typeorm'
import { IPontoColetaDTO } from '@modules/clientes/dtos/i-ponto-coleta-dto'
import { IPontoColetaRepository } from '@modules/clientes/repositories/i-ponto-coleta-repository'
import { PontoColeta } from '@modules/clientes/infra/typeorm/entities/ponto-coleta'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class PontoColetaRepository implements IPontoColetaRepository {
  private repository: Repository<PontoColeta>

  constructor() {
    this.repository = getRepository(PontoColeta)
  }


  // create
  async create ({
    clienteId,
    contratoId,
    descricao,
    estadoId,
    cidadeId,
    endereco,
    numero,
    complemento,
    pessoaContatoNome,
    pessoaContatoCelular,
    desabilitado
  }: IPontoColetaDTO): Promise<HttpResponse> {
    const pontoColeta = this.repository.create({
      clienteId,
      contratoId,
      descricao,
      estadoId,
      cidadeId,
      endereco,
      numero,
      complemento,
      pessoaContatoNome,
      pessoaContatoCelular,
      desabilitado
    })

    const result = await this.repository.save(pontoColeta)
      .then(pontoColetaResult => {
        return ok(pontoColetaResult)
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
      "descricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let pontosColeta = await this.repository.createQueryBuilder('pon')
        .select([
          'pon.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'b.id as "contratoId"',
          'b.identificador as "contratoIdentificador"',
          'pon.descricao as "descricao"',
        ])
        .leftJoin('pon.clienteId', 'a')
        .leftJoin('pon.contratoId', 'b')
        .where('a.nomeFantasia ilike :search', { search: `%${search}%` })
        .orWhere('pon.descricao ilike :search', { search: `%${search}%` })
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('b.identificador', columnOrder[1])
        .addOrderBy('pon.descricao', columnOrder[2])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (pontosColeta.length > rowsPerPage) {
        pontosColeta = pontosColeta.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(pontosColeta)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string, clienteId): Promise<HttpResponse> {
    try {
      const pontosColeta = await this.repository.createQueryBuilder('pon')
        .select([
          'pon.id as "value"',
          'pon.descricao as "label"',
        ])
        .where('pon.clienteId = :clienteId', { clienteId: `${clienteId}`})
        .andWhere('pon.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pon.descricao')
        .getRawMany()

      return ok(pontosColeta)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const pontoColeta = await this.repository.createQueryBuilder('pon')
        .select([
          'pon.id as "value"',
          'pon.descricao as "label"',
        ])
        .where('pon.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(pontoColeta)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const pontosColeta = await this.repository.createQueryBuilder('pon')
        .select([
          'pon.id as "id"',
        ])
        .leftJoin('pon.clienteId', 'a')
        .leftJoin('pon.contratoId', 'b')
        .where('a.nomeFantasia ilike :search', { search: `%${search}%` })
        .orWhere('pon.descricao ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: pontosColeta.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const pontoColeta = await this.repository.createQueryBuilder('pon')
        .select([
          'pon.id as "id"',
          'pon.clienteId as "clienteId"',
          'pon.contratoId as "contratoId"',
          'pon.descricao as "descricao"',
          'pon.estadoId as "estadoId"',
          'pon.cidadeId as "cidadeId"',
          'pon.endereco as "endereco"',
          'pon.numero as "numero"',
          'pon.complemento as "complemento"',
          'pon.pessoaContatoNome as "pessoaContatoNome"',
          'pon.pessoaContatoCelular as "pessoaContatoCelular"',
          'pon.desabilitado as "desabilitado"',
        ])
        .where('pon.id = :id', { id })
        .getRawOne()

      if (typeof pontoColeta === 'undefined') {
        return noContent()
      }

      return ok(pontoColeta)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    contratoId,
    descricao,
    estadoId,
    cidadeId,
    endereco,
    numero,
    complemento,
    pessoaContatoNome,
    pessoaContatoCelular,
    desabilitado
  }: IPontoColetaDTO): Promise<HttpResponse> {
    const pontoColeta = await this.repository.findOne(id)

    if (!pontoColeta) {
      return notFound()
    }

    const newpontoColeta = this.repository.create({
      id,
      clienteId,
      contratoId,
      descricao,
      estadoId,
      cidadeId,
      endereco,
      numero,
      complemento,
      pessoaContatoNome,
      pessoaContatoCelular,
      desabilitado
    })

    try {
      await this.repository.save(newpontoColeta)

      return ok(newpontoColeta)
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

export { PontoColetaRepository }
