import { ISolicitanteDTO } from '@modules/clientes/dtos/i-solicitante-dto'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'
import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class SolicitanteRepositoryInMemory implements ISolicitanteRepository {
  getByEmail(email: string): Promise<Solicitante> {
    throw new Error('Method not implemented.')
  }
  solicitantes: Solicitante[] = []

  // create
  async create ({
    clienteId,
    departamentoId,
    nome,
    email,
    telefonesFixos,
    celular,
    gerenteDepartamento,
    gestorContrato,
    desabilitado
  }: ISolicitanteDTO): Promise<HttpResponse> {
    const solicitante = new Solicitante()

    Object.assign(solicitante, {
      clienteId,
      departamentoId,
      nome,
      email,
      telefonesFixos,
      celular,
      gerenteDepartamento,
      gestorContrato,
      desabilitado
    })

    this.solicitantes.push(solicitante)

    return ok(solicitante)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredSolicitantes = this.solicitantes

    filteredSolicitantes = filteredSolicitantes.filter((solicitante) => {
      if (solicitante.nome.includes(search)) return true
      if (solicitante.email.includes(search)) return true

      return false
    })

    return ok(filteredSolicitantes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredSolicitantes = this.solicitantes

    filteredSolicitantes = filteredSolicitantes.filter((solicitante) => {
      if (solicitante.nome.includes(filter)) return true
      if (solicitante.email.includes(filter)) return true

      return false
    })

    return ok(filteredSolicitantes)
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
    let filteredSolicitantes = this.solicitantes

    filteredSolicitantes = filteredSolicitantes.filter((solicitante) => {
      if (solicitante.nome.includes(search)) return true
      if (solicitante.email.includes(search)) return true

      return false
    })

    return ok(filteredSolicitantes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const solicitante = this.solicitantes.find((solicitante) => solicitante.id === id)

    if (typeof solicitante === 'undefined') {
      return notFound()
    } else {
      return ok(solicitante)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    departamentoId,
    nome,
    email,
    telefonesFixos,
    celular,
    gerenteDepartamento,
    gestorContrato,
    desabilitado
  }: ISolicitanteDTO): Promise<HttpResponse> {
    const index = this.solicitantes.findIndex((solicitante) => solicitante.id === id)

    this.solicitantes[index].clienteId = clienteId
    this.solicitantes[index].departamentoId = departamentoId
    this.solicitantes[index].nome = nome
    this.solicitantes[index].email = email
    this.solicitantes[index].telefonesFixos = telefonesFixos
    this.solicitantes[index].celular = celular
    this.solicitantes[index].gerenteDepartamento = gerenteDepartamento
    this.solicitantes[index].gestorContrato = gestorContrato
    this.solicitantes[index].desabilitado = desabilitado

    return ok(this.solicitantes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.solicitantes.findIndex((solicitante) => solicitante.id === id)

    this.solicitantes.splice(index, 1)

    return ok(this.solicitantes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { SolicitanteRepositoryInMemory }
