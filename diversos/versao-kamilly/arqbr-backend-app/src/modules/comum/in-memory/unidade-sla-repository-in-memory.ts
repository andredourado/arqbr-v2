import { IUnidadeSlaDTO } from '@modules/comum/dtos/i-unidade-sla-dto'
import { IUnidadeSlaRepository } from '@modules/comum/repositories/i-unidade-sla-repository'
import { UnidadeSla } from '@modules/comum/infra/typeorm/entities/unidade-sla'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class UnidadeSlaRepositoryInMemory implements IUnidadeSlaRepository {
  unidadesSla: UnidadeSla[] = []

  // create
  async create ({
    descricao,
    desabilitado
  }: IUnidadeSlaDTO): Promise<HttpResponse> {
    const unidadeSla = new UnidadeSla()

    Object.assign(unidadeSla, {
      descricao,
      desabilitado
    })

    this.unidadesSla.push(unidadeSla)

    return ok(unidadeSla)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredUnidadesSla = this.unidadesSla

    filteredUnidadesSla = filteredUnidadesSla.filter((unidadeSla) => {
      if (unidadeSla.descricao.includes(search)) return true

      return false
    })

    return ok(filteredUnidadesSla.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredUnidadesSla = this.unidadesSla

    filteredUnidadesSla = filteredUnidadesSla.filter((unidadeSla) => {
      if (unidadeSla.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredUnidadesSla)
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
    let filteredUnidadesSla = this.unidadesSla

    filteredUnidadesSla = filteredUnidadesSla.filter((unidadeSla) => {
      if (unidadeSla.descricao.includes(search)) return true

      return false
    })

    return ok(filteredUnidadesSla.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const unidadeSla = this.unidadesSla.find((unidadeSla) => unidadeSla.id === id)

    if (typeof unidadeSla === 'undefined') {
      return notFound()
    } else {
      return ok(unidadeSla)
    }
  }


  // update
  async update ({
    id,
    descricao,
    desabilitado
  }: IUnidadeSlaDTO): Promise<HttpResponse> {
    const index = this.unidadesSla.findIndex((unidadeSla) => unidadeSla.id === id)

    this.unidadesSla[index].descricao = descricao
    this.unidadesSla[index].desabilitado = desabilitado

    return ok(this.unidadesSla[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.unidadesSla.findIndex((unidadeSla) => unidadeSla.id === id)

    this.unidadesSla.splice(index, 1)

    return ok(this.unidadesSla)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { UnidadeSlaRepositoryInMemory }
