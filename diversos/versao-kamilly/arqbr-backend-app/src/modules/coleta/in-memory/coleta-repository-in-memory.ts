import { IColetaDTO } from '@modules/coleta/dtos/i-coleta-dto'
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository'
import { Coleta } from '@modules/coleta/infra/typeorm/entities/coleta'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class ColetaRepositoryInMemory implements IColetaRepository {
  coletas: Coleta[] = []

  // create
  async create ({
    clienteId,
    contratoId,
    departamentoId,
    solicitanteId,
    pontoColetaId,
    identificador,
    dataProgramadaColeta,
    horaProgramadaColeta,
    volumes,
    veiculoId,
    entregadorId,
    dataEfetivaColeta,
    horaEfetivaColeta,
    arquivoFotoProtocolo,
    statusId
  }: IColetaDTO): Promise<HttpResponse> {
    const coleta = new Coleta()

    Object.assign(coleta, {
      clienteId,
      contratoId,
      departamentoId,
      solicitanteId,
      pontoColetaId,
      identificador,
      dataProgramadaColeta,
      horaProgramadaColeta,
      volumes,
      veiculoId,
      entregadorId,
      dataEfetivaColeta,
      horaEfetivaColeta,
      arquivoFotoProtocolo,
      statusId
    })

    this.coletas.push(coleta)

    return ok(coleta)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredColetas = this.coletas

    filteredColetas = filteredColetas.filter((coleta) => {

      return false
    })

    return ok(filteredColetas.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredColetas = this.coletas

    filteredColetas = filteredColetas.filter((coleta) => {

      return false
    })

    return ok(filteredColetas)
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
    let filteredColetas = this.coletas

    filteredColetas = filteredColetas.filter((coleta) => {

      return false
    })

    return ok(filteredColetas.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const coleta = this.coletas.find((coleta) => coleta.id === id)

    if (typeof coleta === 'undefined') {
      return notFound()
    } else {
      return ok(coleta)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    contratoId,
    departamentoId,
    solicitanteId,
    pontoColetaId,
    identificador,
    dataProgramadaColeta,
    horaProgramadaColeta,
    volumes,
    veiculoId,
    entregadorId,
    dataEfetivaColeta,
    horaEfetivaColeta,
    arquivoFotoProtocolo,
    statusId
  }: IColetaDTO): Promise<HttpResponse> {
    const index = this.coletas.findIndex((coleta) => coleta.id === id)

    this.coletas[index].clienteId = clienteId
    this.coletas[index].contratoId = contratoId
    this.coletas[index].departamentoId = departamentoId
    this.coletas[index].solicitanteId = solicitanteId
    this.coletas[index].pontoColetaId = pontoColetaId
    this.coletas[index].identificador = identificador
    this.coletas[index].dataProgramadaColeta = dataProgramadaColeta
    this.coletas[index].horaProgramadaColeta = horaProgramadaColeta
    this.coletas[index].volumes = volumes
    this.coletas[index].veiculoId = veiculoId
    this.coletas[index].entregadorId = entregadorId
    this.coletas[index].dataEfetivaColeta = dataEfetivaColeta
    this.coletas[index].horaEfetivaColeta = horaEfetivaColeta
    this.coletas[index].arquivoFotoProtocolo = arquivoFotoProtocolo
    this.coletas[index].statusId = statusId

    return ok(this.coletas[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.coletas.findIndex((coleta) => coleta.id === id)

    this.coletas.splice(index, 1)

    return ok(this.coletas)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { ColetaRepositoryInMemory }
