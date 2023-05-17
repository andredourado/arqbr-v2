import { IUnidadeDTO } from '@modules/armazenamento/dtos/i-unidade-dto'
import { IUnidadeRepository } from '@modules/armazenamento/repositories/i-unidade-repository'
import { Unidade } from '@modules/armazenamento/infra/typeorm/entities/unidade'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class UnidadeRepositoryInMemory implements IUnidadeRepository {
  unidades: Unidade[] = []

  // create
  async create ({
    estadoId,
    cidadeId,
    nome,
    endereco,
    numero,
    complemento,
    cep,
    desabilitado
  }: IUnidadeDTO): Promise<HttpResponse> {
    const unidade = new Unidade()

    Object.assign(unidade, {
      estadoId,
      cidadeId,
      nome,
      endereco,
      numero,
      complemento,
      cep,
      desabilitado
    })

    this.unidades.push(unidade)

    return ok(unidade)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredUnidades = this.unidades

    filteredUnidades = filteredUnidades.filter((unidade) => {
      if (unidade.nome.includes(search)) return true

      return false
    })

    return ok(filteredUnidades.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredUnidades = this.unidades

    filteredUnidades = filteredUnidades.filter((unidade) => {
      if (unidade.nome.includes(filter)) return true

      return false
    })

    return ok(filteredUnidades)
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
    let filteredUnidades = this.unidades

    filteredUnidades = filteredUnidades.filter((unidade) => {
      if (unidade.nome.includes(search)) return true

      return false
    })

    return ok(filteredUnidades.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const unidade = this.unidades.find((unidade) => unidade.id === id)

    if (typeof unidade === 'undefined') {
      return notFound()
    } else {
      return ok(unidade)
    }
  }


  // update
  async update ({
    id,
    estadoId,
    cidadeId,
    nome,
    endereco,
    numero,
    complemento,
    cep,
    desabilitado
  }: IUnidadeDTO): Promise<HttpResponse> {
    const index = this.unidades.findIndex((unidade) => unidade.id === id)

    this.unidades[index].estadoId = estadoId
    this.unidades[index].cidadeId = cidadeId
    this.unidades[index].nome = nome
    this.unidades[index].endereco = endereco
    this.unidades[index].numero = numero
    this.unidades[index].complemento = complemento
    this.unidades[index].cep = cep
    this.unidades[index].desabilitado = desabilitado

    return ok(this.unidades[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.unidades.findIndex((unidade) => unidade.id === id)

    this.unidades.splice(index, 1)

    return ok(this.unidades)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { UnidadeRepositoryInMemory }
