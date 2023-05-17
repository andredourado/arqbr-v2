import { IServicoContratadoDTO } from '@modules/clientes/dtos/i-servico-contratado-dto'
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository'
import { ServicoContratado } from '@modules/clientes/infra/typeorm/entities/servico-contratado'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class ServicoContratadoRepositoryInMemory implements IServicoContratadoRepository {
  servicosContratados: ServicoContratado[] = []

  // create
  async create ({
    clienteId,
    contratoId,
    servicoId,
    unidadeSlaId,
    sla,
    desabilitado
  }: IServicoContratadoDTO): Promise<HttpResponse> {
    const servicoContratado = new ServicoContratado()

    Object.assign(servicoContratado, {
      clienteId,
      contratoId,
      servicoId,
      unidadeSlaId,
      sla,
      desabilitado
    })

    this.servicosContratados.push(servicoContratado)

    return ok(servicoContratado)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredServicosContratados = this.servicosContratados

    filteredServicosContratados = filteredServicosContratados.filter((servicoContratado) => {

      return false
    })

    return ok(filteredServicosContratados.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredServicosContratados = this.servicosContratados

    filteredServicosContratados = filteredServicosContratados.filter((servicoContratado) => {

      return false
    })

    return ok(filteredServicosContratados)
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
    let filteredServicosContratados = this.servicosContratados

    filteredServicosContratados = filteredServicosContratados.filter((servicoContratado) => {

      return false
    })

    return ok(filteredServicosContratados.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const servicoContratado = this.servicosContratados.find((servicoContratado) => servicoContratado.id === id)

    if (typeof servicoContratado === 'undefined') {
      return notFound()
    } else {
      return ok(servicoContratado)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    contratoId,
    servicoId,
    unidadeSlaId,
    sla,
    desabilitado
  }: IServicoContratadoDTO): Promise<HttpResponse> {
    const index = this.servicosContratados.findIndex((servicoContratado) => servicoContratado.id === id)

    this.servicosContratados[index].clienteId = clienteId
    this.servicosContratados[index].contratoId = contratoId
    this.servicosContratados[index].servicoId = servicoId
    this.servicosContratados[index].unidadeSlaId = unidadeSlaId
    this.servicosContratados[index].sla = sla
    this.servicosContratados[index].desabilitado = desabilitado

    return ok(this.servicosContratados[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.servicosContratados.findIndex((servicoContratado) => servicoContratado.id === id)

    this.servicosContratados.splice(index, 1)

    return ok(this.servicosContratados)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { ServicoContratadoRepositoryInMemory }
