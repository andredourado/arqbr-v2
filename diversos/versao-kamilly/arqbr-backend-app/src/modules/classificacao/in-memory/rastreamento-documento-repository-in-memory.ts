import { IRastreamentoDocumentoDTO } from '@modules/classificacao/dtos/i-rastreamento-documento-dto'
import { IRastreamentoDocumentoRepository } from '@modules/classificacao/repositories/i-rastreamento-documento-repository'
import { RastreamentoDocumento } from '@modules/classificacao/infra/typeorm/entities/rastreamento-documento'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class RastreamentoDocumentoRepositoryInMemory implements IRastreamentoDocumentoRepository {
  rastreamentoDocumentos: RastreamentoDocumento[] = []

  // create
  async create ({
    volumeId,
    dataMovimentacao,
    horaMovimentacao,
    localDeArmazenagem,
    statusId
  }: IRastreamentoDocumentoDTO): Promise<HttpResponse> {
    const rastreamentoDocumento = new RastreamentoDocumento()

    Object.assign(rastreamentoDocumento, {
      volumeId,
      dataMovimentacao,
      horaMovimentacao,
      localDeArmazenagem,
      statusId
    })

    this.rastreamentoDocumentos.push(rastreamentoDocumento)

    return ok(rastreamentoDocumento)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredRastreamentoDocumentos = this.rastreamentoDocumentos

    filteredRastreamentoDocumentos = filteredRastreamentoDocumentos.filter((rastreamentoDocumento) => {

      return false
    })

    return ok(filteredRastreamentoDocumentos.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredRastreamentoDocumentos = this.rastreamentoDocumentos

    filteredRastreamentoDocumentos = filteredRastreamentoDocumentos.filter((rastreamentoDocumento) => {

      return false
    })

    return ok(filteredRastreamentoDocumentos)
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
    let filteredRastreamentoDocumentos = this.rastreamentoDocumentos

    filteredRastreamentoDocumentos = filteredRastreamentoDocumentos.filter((rastreamentoDocumento) => {

      return false
    })

    return ok(filteredRastreamentoDocumentos.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const rastreamentoDocumento = this.rastreamentoDocumentos.find((rastreamentoDocumento) => rastreamentoDocumento.id === id)

    if (typeof rastreamentoDocumento === 'undefined') {
      return notFound()
    } else {
      return ok(rastreamentoDocumento)
    }
  }


  // update
  async update ({
    id,
    volumeId,
    dataMovimentacao,
    horaMovimentacao,
    localDeArmazenagem,
    statusId
  }: IRastreamentoDocumentoDTO): Promise<HttpResponse> {
    const index = this.rastreamentoDocumentos.findIndex((rastreamentoDocumento) => rastreamentoDocumento.id === id)

    this.rastreamentoDocumentos[index].volumeId = volumeId
    this.rastreamentoDocumentos[index].dataMovimentacao = dataMovimentacao
    this.rastreamentoDocumentos[index].horaMovimentacao = horaMovimentacao
    this.rastreamentoDocumentos[index].localDeArmazenagem = localDeArmazenagem
    this.rastreamentoDocumentos[index].statusId = statusId

    return ok(this.rastreamentoDocumentos[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.rastreamentoDocumentos.findIndex((rastreamentoDocumento) => rastreamentoDocumento.id === id)

    this.rastreamentoDocumentos.splice(index, 1)

    return ok(this.rastreamentoDocumentos)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { RastreamentoDocumentoRepositoryInMemory }
