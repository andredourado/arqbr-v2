import { ITimeColetaDTO } from '@modules/coleta/dtos/i-time-coleta-dto'
import { ITimeColetaRepository } from '@modules/coleta/repositories/i-time-coleta-repository'
import { TimeColeta } from '@modules/coleta/infra/typeorm/entities/time-coleta'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class TimeColetaRepositoryInMemory implements ITimeColetaRepository {
  timesColeta: TimeColeta[] = []

  // create
  async create ({
    coletaId,
    pessoaId
  }: ITimeColetaDTO): Promise<HttpResponse> {
    const timeColeta = new TimeColeta()

    Object.assign(timeColeta, {
      coletaId,
      pessoaId
    })

    this.timesColeta.push(timeColeta)

    return ok(timeColeta)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredTimesColeta = this.timesColeta

    filteredTimesColeta = filteredTimesColeta.filter((timeColeta) => {

      return false
    })

    return ok(filteredTimesColeta.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredTimesColeta = this.timesColeta

    filteredTimesColeta = filteredTimesColeta.filter((timeColeta) => {

      return false
    })

    return ok(filteredTimesColeta)
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
    let filteredTimesColeta = this.timesColeta

    filteredTimesColeta = filteredTimesColeta.filter((timeColeta) => {

      return false
    })

    return ok(filteredTimesColeta.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const timeColeta = this.timesColeta.find((timeColeta) => timeColeta.id === id)

    if (typeof timeColeta === 'undefined') {
      return notFound()
    } else {
      return ok(timeColeta)
    }
  }


  // update
  async update ({
    id,
    coletaId,
    pessoaId
  }: ITimeColetaDTO): Promise<HttpResponse> {
    const index = this.timesColeta.findIndex((timeColeta) => timeColeta.id === id)

    this.timesColeta[index].coletaId = coletaId
    this.timesColeta[index].pessoaId = pessoaId

    return ok(this.timesColeta[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.timesColeta.findIndex((timeColeta) => timeColeta.id === id)

    this.timesColeta.splice(index, 1)

    return ok(this.timesColeta)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { TimeColetaRepositoryInMemory }
