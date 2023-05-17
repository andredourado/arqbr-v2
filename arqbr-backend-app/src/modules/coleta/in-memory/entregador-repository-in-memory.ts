import { IEntregadorDTO } from '@modules/coleta/dtos/i-entregador-dto'
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository'
import { Entregador } from '@modules/coleta/infra/typeorm/entities/entregador'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class EntregadorRepositoryInMemory implements IEntregadorRepository {
  entregadores: Entregador[] = []

  // create
  async create ({
    cpfCnpj,
    nome,
    email,
    endereco,
    numero,
    complemento,
    cep,
    telefonesFixos,
    celular,
    desabilitado
  }: IEntregadorDTO): Promise<HttpResponse> {
    const entregador = new Entregador()

    Object.assign(entregador, {
      cpfCnpj,
      nome,
      email,
      endereco,
      numero,
      complemento,
      cep,
      telefonesFixos,
      celular,
      desabilitado
    })

    this.entregadores.push(entregador)

    return ok(entregador)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredEntregadores = this.entregadores

    filteredEntregadores = filteredEntregadores.filter((entregador) => {
      if (entregador.cpfCnpj.includes(search)) return true
      if (entregador.nome.includes(search)) return true
      if (entregador.email.includes(search)) return true

      return false
    })

    return ok(filteredEntregadores.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredEntregadores = this.entregadores

    filteredEntregadores = filteredEntregadores.filter((entregador) => {
      if (entregador.cpfCnpj.includes(filter)) return true
      if (entregador.nome.includes(filter)) return true
      if (entregador.email.includes(filter)) return true

      return false
    })

    return ok(filteredEntregadores)
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
    let filteredEntregadores = this.entregadores

    filteredEntregadores = filteredEntregadores.filter((entregador) => {
      if (entregador.cpfCnpj.includes(search)) return true
      if (entregador.nome.includes(search)) return true
      if (entregador.email.includes(search)) return true

      return false
    })

    return ok(filteredEntregadores.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const entregador = this.entregadores.find((entregador) => entregador.id === id)

    if (typeof entregador === 'undefined') {
      return notFound()
    } else {
      return ok(entregador)
    }
  }


  // update
  async update ({
    id,
    cpfCnpj,
    nome,
    email,
    endereco,
    numero,
    complemento,
    cep,
    telefonesFixos,
    celular,
    desabilitado
  }: IEntregadorDTO): Promise<HttpResponse> {
    const index = this.entregadores.findIndex((entregador) => entregador.id === id)

    this.entregadores[index].cpfCnpj = cpfCnpj
    this.entregadores[index].nome = nome
    this.entregadores[index].email = email
    this.entregadores[index].endereco = endereco
    this.entregadores[index].numero = numero
    this.entregadores[index].complemento = complemento
    this.entregadores[index].cep = cep
    this.entregadores[index].telefonesFixos = telefonesFixos
    this.entregadores[index].celular = celular
    this.entregadores[index].desabilitado = desabilitado

    return ok(this.entregadores[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.entregadores.findIndex((entregador) => entregador.id === id)

    this.entregadores.splice(index, 1)

    return ok(this.entregadores)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { EntregadorRepositoryInMemory }
