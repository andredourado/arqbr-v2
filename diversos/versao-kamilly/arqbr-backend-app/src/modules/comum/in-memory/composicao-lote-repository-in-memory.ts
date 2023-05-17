import { IComposicaoLoteDTO } from '@modules/comum/dtos/i-composicao-lote-dto'
import { IComposicaoLoteRepository } from '@modules/comum/repositories/i-composicao-lote-repository'
import { ComposicaoLote } from '@modules/comum/infra/typeorm/entities/composicao-lote'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class ComposicaoLoteRepositoryInMemory implements IComposicaoLoteRepository {
  composicaoLotes: ComposicaoLote[] = []

  // create
  async create ({
    descricao,
    desabilitado
  }: IComposicaoLoteDTO): Promise<HttpResponse> {
    const composicaoLote = new ComposicaoLote()

    Object.assign(composicaoLote, {
      descricao,
      desabilitado
    })

    this.composicaoLotes.push(composicaoLote)

    return ok(composicaoLote)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredComposicaoLotes = this.composicaoLotes

    filteredComposicaoLotes = filteredComposicaoLotes.filter((composicaoLote) => {
      if (composicaoLote.descricao.includes(search)) return true

      return false
    })

    return ok(filteredComposicaoLotes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredComposicaoLotes = this.composicaoLotes

    filteredComposicaoLotes = filteredComposicaoLotes.filter((composicaoLote) => {
      if (composicaoLote.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredComposicaoLotes)
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
    let filteredComposicaoLotes = this.composicaoLotes

    filteredComposicaoLotes = filteredComposicaoLotes.filter((composicaoLote) => {
      if (composicaoLote.descricao.includes(search)) return true

      return false
    })

    return ok(filteredComposicaoLotes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const composicaoLote = this.composicaoLotes.find((composicaoLote) => composicaoLote.id === id)

    if (typeof composicaoLote === 'undefined') {
      return notFound()
    } else {
      return ok(composicaoLote)
    }
  }


  // update
  async update ({
    id,
    descricao,
    desabilitado
  }: IComposicaoLoteDTO): Promise<HttpResponse> {
    const index = this.composicaoLotes.findIndex((composicaoLote) => composicaoLote.id === id)

    this.composicaoLotes[index].descricao = descricao
    this.composicaoLotes[index].desabilitado = desabilitado

    return ok(this.composicaoLotes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.composicaoLotes.findIndex((composicaoLote) => composicaoLote.id === id)

    this.composicaoLotes.splice(index, 1)

    return ok(this.composicaoLotes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { ComposicaoLoteRepositoryInMemory }
