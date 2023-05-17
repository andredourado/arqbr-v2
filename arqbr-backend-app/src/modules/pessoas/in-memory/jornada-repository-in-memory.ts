import { IJornadaDTO } from '@modules/pessoas/dtos/i-jornada-dto'
import { IJornadaRepository } from '@modules/pessoas/repositories/i-jornada-repository'
import { Jornada } from '@modules/pessoas/infra/typeorm/entities/jornada'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class JornadaRepositoryInMemory implements IJornadaRepository {
  jornadas: Jornada[] = []

  // create
  async create ({
    descricao,
    segPrimeiraInicio,
    segPrimeiraFim,
    segSegundaInicio,
    segSegundaFim,
    terPrimeiraInicio,
    terPrimeiraFim,
    terSegundaInicio,
    terSegundaFim,
    quaPrimeiraInicio,
    quaPrimeiraFim,
    quaSegundaInicio,
    quaSegundaFim,
    quiPrimeiraInicio,
    quiPrimeiraFim,
    quiSegundaInicio,
    quiSegundaFim,
    sexPrimeiraInicio,
    sexPrimeiraFim,
    sexSegundaInicio,
    sexSegundaFim,
    sabPrimeiraInicio,
    sabPrimeiraFim,
    sabSegundaInicio,
    sabSegundaFim,
    domPrimeiraInicio,
    domPrimeiraFim,
    domSegundaInicio,
    domSegundaFim,
    desabilitado
  }: IJornadaDTO): Promise<HttpResponse> {
    const jornada = new Jornada()

    Object.assign(jornada, {
      descricao,
      segPrimeiraInicio,
      segPrimeiraFim,
      segSegundaInicio,
      segSegundaFim,
      terPrimeiraInicio,
      terPrimeiraFim,
      terSegundaInicio,
      terSegundaFim,
      quaPrimeiraInicio,
      quaPrimeiraFim,
      quaSegundaInicio,
      quaSegundaFim,
      quiPrimeiraInicio,
      quiPrimeiraFim,
      quiSegundaInicio,
      quiSegundaFim,
      sexPrimeiraInicio,
      sexPrimeiraFim,
      sexSegundaInicio,
      sexSegundaFim,
      sabPrimeiraInicio,
      sabPrimeiraFim,
      sabSegundaInicio,
      sabSegundaFim,
      domPrimeiraInicio,
      domPrimeiraFim,
      domSegundaInicio,
      domSegundaFim,
      desabilitado
    })

    this.jornadas.push(jornada)

    return ok(jornada)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredJornadas = this.jornadas

    filteredJornadas = filteredJornadas.filter((jornada) => {
      if (jornada.descricao.includes(search)) return true

      return false
    })

    return ok(filteredJornadas.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredJornadas = this.jornadas

    filteredJornadas = filteredJornadas.filter((jornada) => {
      if (jornada.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredJornadas)
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
    let filteredJornadas = this.jornadas

    filteredJornadas = filteredJornadas.filter((jornada) => {
      if (jornada.descricao.includes(search)) return true

      return false
    })

    return ok(filteredJornadas.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const jornada = this.jornadas.find((jornada) => jornada.id === id)

    if (typeof jornada === 'undefined') {
      return notFound()
    } else {
      return ok(jornada)
    }
  }


  // update
  async update ({
    id,
    descricao,
    segPrimeiraInicio,
    segPrimeiraFim,
    segSegundaInicio,
    segSegundaFim,
    terPrimeiraInicio,
    terPrimeiraFim,
    terSegundaInicio,
    terSegundaFim,
    quaPrimeiraInicio,
    quaPrimeiraFim,
    quaSegundaInicio,
    quaSegundaFim,
    quiPrimeiraInicio,
    quiPrimeiraFim,
    quiSegundaInicio,
    quiSegundaFim,
    sexPrimeiraInicio,
    sexPrimeiraFim,
    sexSegundaInicio,
    sexSegundaFim,
    sabPrimeiraInicio,
    sabPrimeiraFim,
    sabSegundaInicio,
    sabSegundaFim,
    domPrimeiraInicio,
    domPrimeiraFim,
    domSegundaInicio,
    domSegundaFim,
    desabilitado
  }: IJornadaDTO): Promise<HttpResponse> {
    const index = this.jornadas.findIndex((jornada) => jornada.id === id)

    this.jornadas[index].descricao = descricao
    this.jornadas[index].segPrimeiraInicio = segPrimeiraInicio
    this.jornadas[index].segPrimeiraFim = segPrimeiraFim
    this.jornadas[index].segSegundaInicio = segSegundaInicio
    this.jornadas[index].segSegundaFim = segSegundaFim
    this.jornadas[index].terPrimeiraInicio = terPrimeiraInicio
    this.jornadas[index].terPrimeiraFim = terPrimeiraFim
    this.jornadas[index].terSegundaInicio = terSegundaInicio
    this.jornadas[index].terSegundaFim = terSegundaFim
    this.jornadas[index].quaPrimeiraInicio = quaPrimeiraInicio
    this.jornadas[index].quaPrimeiraFim = quaPrimeiraFim
    this.jornadas[index].quaSegundaInicio = quaSegundaInicio
    this.jornadas[index].quaSegundaFim = quaSegundaFim
    this.jornadas[index].quiPrimeiraInicio = quiPrimeiraInicio
    this.jornadas[index].quiPrimeiraFim = quiPrimeiraFim
    this.jornadas[index].quiSegundaInicio = quiSegundaInicio
    this.jornadas[index].quiSegundaFim = quiSegundaFim
    this.jornadas[index].sexPrimeiraInicio = sexPrimeiraInicio
    this.jornadas[index].sexPrimeiraFim = sexPrimeiraFim
    this.jornadas[index].sexSegundaInicio = sexSegundaInicio
    this.jornadas[index].sexSegundaFim = sexSegundaFim
    this.jornadas[index].sabPrimeiraInicio = sabPrimeiraInicio
    this.jornadas[index].sabPrimeiraFim = sabPrimeiraFim
    this.jornadas[index].sabSegundaInicio = sabSegundaInicio
    this.jornadas[index].sabSegundaFim = sabSegundaFim
    this.jornadas[index].domPrimeiraInicio = domPrimeiraInicio
    this.jornadas[index].domPrimeiraFim = domPrimeiraFim
    this.jornadas[index].domSegundaInicio = domSegundaInicio
    this.jornadas[index].domSegundaFim = domSegundaFim
    this.jornadas[index].desabilitado = desabilitado

    return ok(this.jornadas[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.jornadas.findIndex((jornada) => jornada.id === id)

    this.jornadas.splice(index, 1)

    return ok(this.jornadas)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { JornadaRepositoryInMemory }
