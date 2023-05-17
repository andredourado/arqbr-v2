import { IClienteDTO } from '@modules/clientes/dtos/i-cliente-dto'
import { IClienteRepository } from '@modules/clientes/repositories/i-cliente-repository'
import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class ClienteRepositoryInMemory implements IClienteRepository {
  clientes: Cliente[] = []

  // create
  async create ({
    cnpj,
    nomeFantasia,
    razaoSocial,
    inscricaoEstadual,
    endereco,
    numero,
    complemento,
    estadoId,
    cidadeId,
    cep,
    desabilitado
  }: IClienteDTO): Promise<HttpResponse> {
    const cliente = new Cliente()

    Object.assign(cliente, {
      cnpj,
      nomeFantasia,
      razaoSocial,
      inscricaoEstadual,
      endereco,
      numero,
      complemento,
      estadoId,
      cidadeId,
      cep,
      desabilitado
    })

    this.clientes.push(cliente)

    return ok(cliente)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredClientes = this.clientes

    filteredClientes = filteredClientes.filter((cliente) => {
      if (cliente.cnpj.includes(search)) return true
      if (cliente.nomeFantasia.includes(search)) return true

      return false
    })

    return ok(filteredClientes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredClientes = this.clientes

    filteredClientes = filteredClientes.filter((cliente) => {
      if (cliente.cnpj.includes(filter)) return true
      if (cliente.nomeFantasia.includes(filter)) return true

      return false
    })

    return ok(filteredClientes)
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
    let filteredClientes = this.clientes

    filteredClientes = filteredClientes.filter((cliente) => {
      if (cliente.cnpj.includes(search)) return true
      if (cliente.nomeFantasia.includes(search)) return true

      return false
    })

    return ok(filteredClientes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const cliente = this.clientes.find((cliente) => cliente.id === id)

    if (typeof cliente === 'undefined') {
      return notFound()
    } else {
      return ok(cliente)
    }
  }


  // update
  async update ({
    id,
    cnpj,
    nomeFantasia,
    razaoSocial,
    inscricaoEstadual,
    endereco,
    numero,
    complemento,
    estadoId,
    cidadeId,
    cep,
    desabilitado
  }: IClienteDTO): Promise<HttpResponse> {
    const index = this.clientes.findIndex((cliente) => cliente.id === id)

    this.clientes[index].cnpj = cnpj
    this.clientes[index].nomeFantasia = nomeFantasia
    this.clientes[index].razaoSocial = razaoSocial
    this.clientes[index].inscricaoEstadual = inscricaoEstadual
    this.clientes[index].endereco = endereco
    this.clientes[index].numero = numero
    this.clientes[index].complemento = complemento
    this.clientes[index].estadoId = estadoId
    this.clientes[index].cidadeId = cidadeId
    this.clientes[index].cep = cep
    this.clientes[index].desabilitado = desabilitado

    return ok(this.clientes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.clientes.findIndex((cliente) => cliente.id === id)

    this.clientes.splice(index, 1)

    return ok(this.clientes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { ClienteRepositoryInMemory }
