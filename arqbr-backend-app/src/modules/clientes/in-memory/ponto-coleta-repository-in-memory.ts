import { IPontoColetaDTO } from '@modules/clientes/dtos/i-ponto-coleta-dto'
import { IPontoColetaRepository } from '@modules/clientes/repositories/i-ponto-coleta-repository'
import { PontoColeta } from '@modules/clientes/infra/typeorm/entities/ponto-coleta'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PontoColetaRepositoryInMemory implements IPontoColetaRepository {
  pontosColeta: PontoColeta[] = []

  // create
  async create ({
    clienteId,
    descricao,
    estadoId,
    cidadeId,
    endereco,
    numero,
    complemento,
    pessoaContatoNome,
    pessoaContatoCelular,
    desabilitado
  }: IPontoColetaDTO): Promise<HttpResponse> {
    const pontoColeta = new PontoColeta()

    Object.assign(pontoColeta, {
      clienteId,
      descricao,
      estadoId,
      cidadeId,
      endereco,
      numero,
      complemento,
      pessoaContatoNome,
      pessoaContatoCelular,
      desabilitado
    })

    this.pontosColeta.push(pontoColeta)

    return ok(pontoColeta)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPontosColeta = this.pontosColeta

    filteredPontosColeta = filteredPontosColeta.filter((pontoColeta) => {
      if (pontoColeta.descricao.includes(search)) return true

      return false
    })

    return ok(filteredPontosColeta.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPontosColeta = this.pontosColeta

    filteredPontosColeta = filteredPontosColeta.filter((pontoColeta) => {
      if (pontoColeta.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredPontosColeta)
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
    let filteredPontosColeta = this.pontosColeta

    filteredPontosColeta = filteredPontosColeta.filter((pontoColeta) => {
      if (pontoColeta.descricao.includes(search)) return true

      return false
    })

    return ok(filteredPontosColeta.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const pontoColeta = this.pontosColeta.find((pontoColeta) => pontoColeta.id === id)

    if (typeof pontoColeta === 'undefined') {
      return notFound()
    } else {
      return ok(pontoColeta)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    descricao,
    estadoId,
    cidadeId,
    endereco,
    numero,
    complemento,
    pessoaContatoNome,
    pessoaContatoCelular,
    desabilitado
  }: IPontoColetaDTO): Promise<HttpResponse> {
    const index = this.pontosColeta.findIndex((pontoColeta) => pontoColeta.id === id)

    this.pontosColeta[index].clienteId = clienteId
    this.pontosColeta[index].descricao = descricao
    this.pontosColeta[index].estadoId = estadoId
    this.pontosColeta[index].cidadeId = cidadeId
    this.pontosColeta[index].endereco = endereco
    this.pontosColeta[index].numero = numero
    this.pontosColeta[index].complemento = complemento
    this.pontosColeta[index].pessoaContatoNome = pessoaContatoNome
    this.pontosColeta[index].pessoaContatoCelular = pessoaContatoCelular
    this.pontosColeta[index].desabilitado = desabilitado

    return ok(this.pontosColeta[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.pontosColeta.findIndex((pontoColeta) => pontoColeta.id === id)

    this.pontosColeta.splice(index, 1)

    return ok(this.pontosColeta)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PontoColetaRepositoryInMemory }
