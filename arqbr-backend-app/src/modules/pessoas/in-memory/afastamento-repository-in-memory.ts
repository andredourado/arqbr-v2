import { IAfastamentoDTO } from '@modules/pessoas/dtos/i-afastamento-dto'
import { IAfastamentoRepository } from '@modules/pessoas/repositories/i-afastamento-repository'
import { Afastamento } from '@modules/pessoas/infra/typeorm/entities/afastamento'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class AfastamentoRepositoryInMemory implements IAfastamentoRepository {
  afastamentos: Afastamento[] = []

  // create
  async create ({
    pessoaId,
    tipoAfastamentoId,
    inicio,
    fim,
    desabilitado
  }: IAfastamentoDTO): Promise<HttpResponse> {
    const afastamento = new Afastamento()

    Object.assign(afastamento, {
      pessoaId,
      tipoAfastamentoId,
      inicio,
      fim,
      desabilitado
    })

    this.afastamentos.push(afastamento)

    return ok(afastamento)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredAfastamentos = this.afastamentos

    filteredAfastamentos = filteredAfastamentos.filter((afastamento) => {

      return false
    })

    return ok(filteredAfastamentos.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredAfastamentos = this.afastamentos

    filteredAfastamentos = filteredAfastamentos.filter((afastamento) => {

      return false
    })

    return ok(filteredAfastamentos)
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
    let filteredAfastamentos = this.afastamentos

    filteredAfastamentos = filteredAfastamentos.filter((afastamento) => {

      return false
    })

    return ok(filteredAfastamentos.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const afastamento = this.afastamentos.find((afastamento) => afastamento.id === id)

    if (typeof afastamento === 'undefined') {
      return notFound()
    } else {
      return ok(afastamento)
    }
  }


  // update
  async update ({
    id,
    pessoaId,
    tipoAfastamentoId,
    inicio,
    fim,
    desabilitado
  }: IAfastamentoDTO): Promise<HttpResponse> {
    const index = this.afastamentos.findIndex((afastamento) => afastamento.id === id)

    this.afastamentos[index].pessoaId = pessoaId
    this.afastamentos[index].tipoAfastamentoId = tipoAfastamentoId
    this.afastamentos[index].inicio = inicio
    this.afastamentos[index].fim = fim
    this.afastamentos[index].desabilitado = desabilitado

    return ok(this.afastamentos[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.afastamentos.findIndex((afastamento) => afastamento.id === id)

    this.afastamentos.splice(index, 1)

    return ok(this.afastamentos)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { AfastamentoRepositoryInMemory }
