import { IPosicaoDTO } from '@modules/armazenamento/dtos/i-posicao-dto'
import { IPosicaoRepository } from '@modules/armazenamento/repositories/i-posicao-repository'
import { Posicao } from '@modules/armazenamento/infra/typeorm/entities/posicao'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PosicaoRepositoryInMemory implements IPosicaoRepository {
  posicoes: Posicao[] = []

  // create
  async create ({
    unidadeId,
    plantaId,
    rua,
    linha,
    coluna,
    posicoes,
    posicoesDisponíveis,
    desabilitado
  }: IPosicaoDTO): Promise<HttpResponse> {
    const posicao = new Posicao()

    Object.assign(posicao, {
      unidadeId,
      plantaId,
      rua,
      linha,
      coluna,
      posicoes,
      posicoesDisponíveis,
      desabilitado
    })

    this.posicoes.push(posicao)

    return ok(posicao)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPosicoes = this.posicoes

    filteredPosicoes = filteredPosicoes.filter((posicao) => {
      if (posicao.rua.includes(search)) return true
      if (posicao.linha.includes(search)) return true
      if (posicao.coluna.includes(search)) return true

      return false
    })

    return ok(filteredPosicoes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPosicoes = this.posicoes

    filteredPosicoes = filteredPosicoes.filter((posicao) => {
      if (posicao.rua.includes(filter)) return true
      if (posicao.linha.includes(filter)) return true
      if (posicao.coluna.includes(filter)) return true

      return false
    })

    return ok(filteredPosicoes)
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
    let filteredPosicoes = this.posicoes

    filteredPosicoes = filteredPosicoes.filter((posicao) => {
      if (posicao.rua.includes(search)) return true
      if (posicao.linha.includes(search)) return true
      if (posicao.coluna.includes(search)) return true

      return false
    })

    return ok(filteredPosicoes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const posicao = this.posicoes.find((posicao) => posicao.id === id)

    if (typeof posicao === 'undefined') {
      return notFound()
    } else {
      return ok(posicao)
    }
  }


  // update
  async update ({
    id,
    unidadeId,
    plantaId,
    rua,
    linha,
    coluna,
    posicoes,
    posicoesDisponíveis,
    desabilitado
  }: IPosicaoDTO): Promise<HttpResponse> {
    const index = this.posicoes.findIndex((posicao) => posicao.id === id)

    this.posicoes[index].unidadeId = unidadeId
    this.posicoes[index].plantaId = plantaId
    this.posicoes[index].rua = rua
    this.posicoes[index].linha = linha
    this.posicoes[index].coluna = coluna
    this.posicoes[index].posicoes = posicoes
    this.posicoes[index].posicoesDisponíveis = posicoesDisponíveis
    this.posicoes[index].desabilitado = desabilitado

    return ok(this.posicoes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.posicoes.findIndex((posicao) => posicao.id === id)

    this.posicoes.splice(index, 1)

    return ok(this.posicoes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PosicaoRepositoryInMemory }
