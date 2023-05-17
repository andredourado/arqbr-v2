import { IFuncaoDTO } from '@modules/pessoas/dtos/i-funcao-dto'
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository'
import { Funcao } from '@modules/pessoas/infra/typeorm/entities/funcao'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class FuncaoRepositoryInMemory implements IFuncaoRepository {
  funcoes: Funcao[] = []

  // create
  async create ({
    descricao,
    metaProducao,
    desabilitado
  }: IFuncaoDTO): Promise<HttpResponse> {
    const funcao = new Funcao()

    Object.assign(funcao, {
      descricao,
      metaProducao,
      desabilitado
    })

    this.funcoes.push(funcao)

    return ok(funcao)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredFuncoes = this.funcoes

    filteredFuncoes = filteredFuncoes.filter((funcao) => {
      if (funcao.descricao.includes(search)) return true

      return false
    })

    return ok(filteredFuncoes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredFuncoes = this.funcoes

    filteredFuncoes = filteredFuncoes.filter((funcao) => {
      if (funcao.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredFuncoes)
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
    let filteredFuncoes = this.funcoes

    filteredFuncoes = filteredFuncoes.filter((funcao) => {
      if (funcao.descricao.includes(search)) return true

      return false
    })

    return ok(filteredFuncoes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const funcao = this.funcoes.find((funcao) => funcao.id === id)

    if (typeof funcao === 'undefined') {
      return notFound()
    } else {
      return ok(funcao)
    }
  }


  // update
  async update ({
    id,
    descricao,
    metaProducao,
    desabilitado
  }: IFuncaoDTO): Promise<HttpResponse> {
    const index = this.funcoes.findIndex((funcao) => funcao.id === id)

    this.funcoes[index].descricao = descricao
    this.funcoes[index].metaProducao = metaProducao
    this.funcoes[index].desabilitado = desabilitado

    return ok(this.funcoes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.funcoes.findIndex((funcao) => funcao.id === id)

    this.funcoes.splice(index, 1)

    return ok(this.funcoes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { FuncaoRepositoryInMemory }
