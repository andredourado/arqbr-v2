import { IDepartamentoDTO } from '@modules/clientes/dtos/i-departamento-dto'
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class DepartamentoRepositoryInMemory implements IDepartamentoRepository {
  selectFiltered(filter: string, clienteId: string): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
  departamentos: Departamento[] = []

  // create
  async create ({
    clienteId,
    nome,
    desabilitado
  }: IDepartamentoDTO): Promise<HttpResponse> {
    const departamento = new Departamento()

    Object.assign(departamento, {
      clienteId,
      nome,
      desabilitado
    })

    this.departamentos.push(departamento)

    return ok(departamento)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredDepartamentos = this.departamentos

    filteredDepartamentos = filteredDepartamentos.filter((departamento) => {
      if (departamento.nome.includes(search)) return true

      return false
    })

    return ok(filteredDepartamentos.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredDepartamentos = this.departamentos

    filteredDepartamentos = filteredDepartamentos.filter((departamento) => {
      if (departamento.nome.includes(filter)) return true

      return false
    })

    return ok(filteredDepartamentos)
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
    let filteredDepartamentos = this.departamentos

    filteredDepartamentos = filteredDepartamentos.filter((departamento) => {
      if (departamento.nome.includes(search)) return true

      return false
    })

    return ok(filteredDepartamentos.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const departamento = this.departamentos.find((departamento) => departamento.id === id)

    if (typeof departamento === 'undefined') {
      return notFound()
    } else {
      return ok(departamento)
    }
  }

  
  getByIdentificador(identificador: string): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }


  // update
  async update ({
    id,
    clienteId,
    nome,
    desabilitado
  }: IDepartamentoDTO): Promise<HttpResponse> {
    const index = this.departamentos.findIndex((departamento) => departamento.id === id)

    this.departamentos[index].clienteId = clienteId
    this.departamentos[index].nome = nome
    this.departamentos[index].desabilitado = desabilitado

    return ok(this.departamentos[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.departamentos.findIndex((departamento) => departamento.id === id)

    this.departamentos.splice(index, 1)

    return ok(this.departamentos)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { DepartamentoRepositoryInMemory }
