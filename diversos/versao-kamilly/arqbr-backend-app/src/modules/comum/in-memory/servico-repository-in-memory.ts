import { IServicoDTO } from '@modules/comum/dtos/i-servico-dto'
import { IServicoRepository } from '@modules/comum/repositories/i-servico-repository'
import { Servico } from '@modules/comum/infra/typeorm/entities/servico'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class ServicoRepositoryInMemory implements IServicoRepository {
  servicos: Servico[] = []

  // create
  async create ({
    descricao,
    desabilitado
  }: IServicoDTO): Promise<HttpResponse> {
    const servico = new Servico()

    Object.assign(servico, {
      descricao,
      desabilitado
    })

    this.servicos.push(servico)

    return ok(servico)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredServicos = this.servicos

    filteredServicos = filteredServicos.filter((servico) => {
      if (servico.descricao.includes(search)) return true

      return false
    })

    return ok(filteredServicos.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredServicos = this.servicos

    filteredServicos = filteredServicos.filter((servico) => {
      if (servico.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredServicos)
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
    let filteredServicos = this.servicos

    filteredServicos = filteredServicos.filter((servico) => {
      if (servico.descricao.includes(search)) return true

      return false
    })

    return ok(filteredServicos.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const servico = this.servicos.find((servico) => servico.id === id)

    if (typeof servico === 'undefined') {
      return notFound()
    } else {
      return ok(servico)
    }
  }


  // update
  async update ({
    id,
    descricao,
    desabilitado
  }: IServicoDTO): Promise<HttpResponse> {
    const index = this.servicos.findIndex((servico) => servico.id === id)

    this.servicos[index].descricao = descricao
    this.servicos[index].desabilitado = desabilitado

    return ok(this.servicos[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.servicos.findIndex((servico) => servico.id === id)

    this.servicos.splice(index, 1)

    return ok(this.servicos)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { ServicoRepositoryInMemory }
