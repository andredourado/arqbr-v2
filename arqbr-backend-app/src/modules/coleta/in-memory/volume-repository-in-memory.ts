import { IVolumeDTO } from '@modules/coleta/dtos/i-volume-dto'
import { IVolumeRepository } from '@modules/coleta/repositories/i-volume-repository'
import { Volume } from '@modules/coleta/infra/typeorm/entities/volume'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class VolumeRepositoryInMemory implements IVolumeRepository {
  volumes: Volume[] = []

  // create
  async create ({
    coletaId,
    identificador,
    arquivoFoto,
    comentario,
    localDeArmazenagem
  }: IVolumeDTO): Promise<HttpResponse> {
    const volume = new Volume()

    Object.assign(volume, {
      coletaId,
      identificador,
      arquivoFoto,
      comentario,
      localDeArmazenagem
    })

    this.volumes.push(volume)

    return ok(volume)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredVolumes = this.volumes

    filteredVolumes = filteredVolumes.filter((volume) => {

      return false
    })

    return ok(filteredVolumes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredVolumes = this.volumes

    filteredVolumes = filteredVolumes.filter((volume) => {

      return false
    })

    return ok(filteredVolumes)
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
    let filteredVolumes = this.volumes

    filteredVolumes = filteredVolumes.filter((volume) => {

      return false
    })

    return ok(filteredVolumes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const volume = this.volumes.find((volume) => volume.id === id)

    if (typeof volume === 'undefined') {
      return notFound()
    } else {
      return ok(volume)
    }
  }


  // update
  async update ({
    id,
    coletaId,
    identificador,
    arquivoFoto,
    comentario,
    localDeArmazenagem
  }: IVolumeDTO): Promise<HttpResponse> {
    const index = this.volumes.findIndex((volume) => volume.id === id)

    this.volumes[index].coletaId = coletaId
    this.volumes[index].identificador = identificador
    this.volumes[index].arquivoFoto = arquivoFoto
    this.volumes[index].comentario = comentario
    this.volumes[index].localDeArmazenagem = localDeArmazenagem

    return ok(this.volumes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.volumes.findIndex((volume) => volume.id === id)

    this.volumes.splice(index, 1)

    return ok(this.volumes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { VolumeRepositoryInMemory }
