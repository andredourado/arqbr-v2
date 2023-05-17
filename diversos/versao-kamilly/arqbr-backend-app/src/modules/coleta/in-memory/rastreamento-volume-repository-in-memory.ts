import { IRastreamentoVolumeDTO } from '@modules/coleta/dtos/i-rastreamento-volume-dto'
import { IRastreamentoVolumeRepository } from '@modules/coleta/repositories/i-rastreamento-volume-repository'
import { RastreamentoVolume } from '@modules/coleta/infra/typeorm/entities/rastreamento-volume'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class RastreamentoVolumeRepositoryInMemory implements IRastreamentoVolumeRepository {
  rastreamentoVolumes: RastreamentoVolume[] = []

  // create
  async create ({
    volumeId,
    dataMovimentacao,
    horaMovimentacao,
    localDeArmazenagem,
    statusId
  }: IRastreamentoVolumeDTO): Promise<HttpResponse> {
    const rastreamentoVolume = new RastreamentoVolume()

    Object.assign(rastreamentoVolume, {
      volumeId,
      dataMovimentacao,
      horaMovimentacao,
      localDeArmazenagem,
      statusId
    })

    this.rastreamentoVolumes.push(rastreamentoVolume)

    return ok(rastreamentoVolume)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredRastreamentoVolumes = this.rastreamentoVolumes

    filteredRastreamentoVolumes = filteredRastreamentoVolumes.filter((rastreamentoVolume) => {

      return false
    })

    return ok(filteredRastreamentoVolumes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredRastreamentoVolumes = this.rastreamentoVolumes

    filteredRastreamentoVolumes = filteredRastreamentoVolumes.filter((rastreamentoVolume) => {

      return false
    })

    return ok(filteredRastreamentoVolumes)
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
    let filteredRastreamentoVolumes = this.rastreamentoVolumes

    filteredRastreamentoVolumes = filteredRastreamentoVolumes.filter((rastreamentoVolume) => {

      return false
    })

    return ok(filteredRastreamentoVolumes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const rastreamentoVolume = this.rastreamentoVolumes.find((rastreamentoVolume) => rastreamentoVolume.id === id)

    if (typeof rastreamentoVolume === 'undefined') {
      return notFound()
    } else {
      return ok(rastreamentoVolume)
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
  }: IRastreamentoVolumeDTO): Promise<HttpResponse> {
    const index = this.rastreamentoVolumes.findIndex((rastreamentoVolume) => rastreamentoVolume.id === id)

    this.rastreamentoVolumes[index].volumeId = volumeId
    this.rastreamentoVolumes[index].dataMovimentacao = dataMovimentacao
    this.rastreamentoVolumes[index].horaMovimentacao = horaMovimentacao
    this.rastreamentoVolumes[index].localDeArmazenagem = localDeArmazenagem
    this.rastreamentoVolumes[index].statusId = statusId

    return ok(this.rastreamentoVolumes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.rastreamentoVolumes.findIndex((rastreamentoVolume) => rastreamentoVolume.id === id)

    this.rastreamentoVolumes.splice(index, 1)

    return ok(this.rastreamentoVolumes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { RastreamentoVolumeRepositoryInMemory }
