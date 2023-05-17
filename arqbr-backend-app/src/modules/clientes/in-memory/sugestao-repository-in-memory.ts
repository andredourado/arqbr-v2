import { ISugestaoDTO } from '@modules/clientes/dtos/i-sugestao-dto'
import { ISugestaoRepository } from '@modules/clientes/repositories/i-sugestao-repository'
import { Sugestao } from '@modules/clientes/infra/typeorm/entities/sugestao'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class SugestaoRepositoryInMemory implements ISugestaoRepository {
  sugestoes: Sugestao[] = []

  // create
  async create ({
    clienteId,
    departamentoId,
    solicitanteId,
    titulo,
    descricao,
    atendido
  }: ISugestaoDTO): Promise<HttpResponse> {
    const sugestao = new Sugestao()

    Object.assign(sugestao, {
      clienteId,
      departamentoId,
      solicitanteId,
      titulo,
      descricao,
      atendido
    })

    this.sugestoes.push(sugestao)

    return ok(sugestao)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredSugestoes = this.sugestoes

    filteredSugestoes = filteredSugestoes.filter((sugestao) => {
      if (sugestao.titulo.includes(search)) return true

      return false
    })

    return ok(filteredSugestoes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredSugestoes = this.sugestoes

    filteredSugestoes = filteredSugestoes.filter((sugestao) => {
      if (sugestao.titulo.includes(filter)) return true

      return false
    })

    return ok(filteredSugestoes)
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
    let filteredSugestoes = this.sugestoes

    filteredSugestoes = filteredSugestoes.filter((sugestao) => {
      if (sugestao.titulo.includes(search)) return true

      return false
    })

    return ok(filteredSugestoes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const sugestao = this.sugestoes.find((sugestao) => sugestao.id === id)

    if (typeof sugestao === 'undefined') {
      return notFound()
    } else {
      return ok(sugestao)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    departamentoId,
    solicitanteId,
    titulo,
    descricao,
    atendido
  }: ISugestaoDTO): Promise<HttpResponse> {
    const index = this.sugestoes.findIndex((sugestao) => sugestao.id === id)

    this.sugestoes[index].clienteId = clienteId
    this.sugestoes[index].departamentoId = departamentoId
    this.sugestoes[index].solicitanteId = solicitanteId
    this.sugestoes[index].titulo = titulo
    this.sugestoes[index].descricao = descricao
    this.sugestoes[index].atendido = atendido

    return ok(this.sugestoes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.sugestoes.findIndex((sugestao) => sugestao.id === id)

    this.sugestoes.splice(index, 1)

    return ok(this.sugestoes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { SugestaoRepositoryInMemory }
