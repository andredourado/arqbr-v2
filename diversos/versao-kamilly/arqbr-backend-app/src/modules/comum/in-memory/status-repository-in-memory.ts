import { IStatusDTO } from '@modules/comum/dtos/i-status-dto'
import { IStatusRepository } from '@modules/comum/repositories/i-status-repository'
import { Status } from '@modules/comum/infra/typeorm/entities/status'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class StatusRepositoryInMemory implements IStatusRepository {
  statuses: Status[] = []

  // create
  async create ({
    servicoId,
    sequencia,
    descricao,
    desabilitado
  }: IStatusDTO): Promise<HttpResponse> {
    const status = new Status()

    Object.assign(status, {
      servicoId,
      sequencia,
      descricao,
      desabilitado
    })

    this.statuses.push(status)

    return ok(status)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredStatuses = this.statuses

    filteredStatuses = filteredStatuses.filter((status) => {
      if (status.sequencia.includes(search)) return true
      if (status.descricao.includes(search)) return true

      return false
    })

    return ok(filteredStatuses.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredStatuses = this.statuses

    filteredStatuses = filteredStatuses.filter((status) => {
      if (status.sequencia.includes(filter)) return true
      if (status.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredStatuses)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    let filteredStatuses = this.statuses

    filteredStatuses = filteredStatuses.filter((status) => {
      if (status.sequencia.includes(search)) return true
      if (status.descricao.includes(search)) return true

      return false
    })

    return ok(filteredStatuses.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const status = this.statuses.find((status) => status.id === id)

    if (typeof status === 'undefined') {
      return notFound()
    } else {
      return ok(status)
    }
  }


  // update
  async update ({
    id,
    servicoId,
    sequencia,
    descricao,
    desabilitado
  }: IStatusDTO): Promise<HttpResponse> {
    const index = this.statuses.findIndex((status) => status.id === id)

    this.statuses[index].servicoId = servicoId
    this.statuses[index].sequencia = sequencia
    this.statuses[index].descricao = descricao
    this.statuses[index].desabilitado = desabilitado

    return ok(this.statuses[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.statuses.findIndex((status) => status.id === id)

    this.statuses.splice(index, 1)

    return ok(this.statuses)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { StatusRepositoryInMemory }
