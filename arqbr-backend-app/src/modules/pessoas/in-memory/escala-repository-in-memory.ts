import { IEscalaDTO } from '@modules/pessoas/dtos/i-escala-dto'
import { IEscalaRepository } from '@modules/pessoas/repositories/i-escala-repository'
import { Escala } from '@modules/pessoas/infra/typeorm/entities/escala'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class EscalaRepositoryInMemory implements IEscalaRepository {
  escalas: Escala[] = []

  // create
  async create ({
    pessoaId,
    jornadaId,
    desabilitado
  }: IEscalaDTO): Promise<HttpResponse> {
    const escala = new Escala()

    Object.assign(escala, {
      pessoaId,
      jornadaId,
      desabilitado
    })

    this.escalas.push(escala)

    return ok(escala)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredEscalas = this.escalas

    filteredEscalas = filteredEscalas.filter((escala) => {

      return false
    })

    return ok(filteredEscalas.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredEscalas = this.escalas

    filteredEscalas = filteredEscalas.filter((escala) => {

      return false
    })

    return ok(filteredEscalas)
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
    let filteredEscalas = this.escalas

    filteredEscalas = filteredEscalas.filter((escala) => {

      return false
    })

    return ok(filteredEscalas.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const escala = this.escalas.find((escala) => escala.id === id)

    if (typeof escala === 'undefined') {
      return notFound()
    } else {
      return ok(escala)
    }
  }


  // update
  async update ({
    id,
    pessoaId,
    jornadaId,
    desabilitado
  }: IEscalaDTO): Promise<HttpResponse> {
    const index = this.escalas.findIndex((escala) => escala.id === id)

    this.escalas[index].pessoaId = pessoaId
    this.escalas[index].jornadaId = jornadaId
    this.escalas[index].desabilitado = desabilitado

    return ok(this.escalas[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.escalas.findIndex((escala) => escala.id === id)

    this.escalas.splice(index, 1)

    return ok(this.escalas)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { EscalaRepositoryInMemory }
