import { ITipoAfastamentoDTO } from '@modules/comum/dtos/i-tipo-afastamento-dto'
import { ITipoAfastamentoRepository } from '@modules/comum/repositories/i-tipo-afastamento-repository'
import { TipoAfastamento } from '@modules/comum/infra/typeorm/entities/tipo-afastamento'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class TipoAfastamentoRepositoryInMemory implements ITipoAfastamentoRepository {
  tiposAfastamento: TipoAfastamento[] = []

  // create
  async create ({
    descricao,
    desabilitado
  }: ITipoAfastamentoDTO): Promise<HttpResponse> {
    const tipoAfastamento = new TipoAfastamento()

    Object.assign(tipoAfastamento, {
      descricao,
      desabilitado
    })

    this.tiposAfastamento.push(tipoAfastamento)

    return ok(tipoAfastamento)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredTiposAfastamento = this.tiposAfastamento

    filteredTiposAfastamento = filteredTiposAfastamento.filter((tipoAfastamento) => {
      if (tipoAfastamento.descricao.includes(search)) return true

      return false
    })

    return ok(filteredTiposAfastamento.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredTiposAfastamento = this.tiposAfastamento

    filteredTiposAfastamento = filteredTiposAfastamento.filter((tipoAfastamento) => {
      if (tipoAfastamento.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredTiposAfastamento)
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
    let filteredTiposAfastamento = this.tiposAfastamento

    filteredTiposAfastamento = filteredTiposAfastamento.filter((tipoAfastamento) => {
      if (tipoAfastamento.descricao.includes(search)) return true

      return false
    })

    return ok(filteredTiposAfastamento.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const tipoAfastamento = this.tiposAfastamento.find((tipoAfastamento) => tipoAfastamento.id === id)

    if (typeof tipoAfastamento === 'undefined') {
      return notFound()
    } else {
      return ok(tipoAfastamento)
    }
  }


  // update
  async update ({
    id,
    descricao,
    desabilitado
  }: ITipoAfastamentoDTO): Promise<HttpResponse> {
    const index = this.tiposAfastamento.findIndex((tipoAfastamento) => tipoAfastamento.id === id)

    this.tiposAfastamento[index].descricao = descricao
    this.tiposAfastamento[index].desabilitado = desabilitado

    return ok(this.tiposAfastamento[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.tiposAfastamento.findIndex((tipoAfastamento) => tipoAfastamento.id === id)

    this.tiposAfastamento.splice(index, 1)

    return ok(this.tiposAfastamento)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { TipoAfastamentoRepositoryInMemory }
