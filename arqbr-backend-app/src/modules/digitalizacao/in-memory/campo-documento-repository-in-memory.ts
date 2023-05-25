import { ICampoDocumentoDTO } from '@modules/digitalizacao/dtos/i-campo-documento-dto'
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository'
import { CampoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/campo-documento'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class CampoDocumentoRepositoryInMemory implements ICampoDocumentoRepository {
  getByTipoDocumento(tipoDocumentoId: string, nomeCampo: string): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
  camposDocumento: CampoDocumento[] = []

  // create
  async create ({
    tipoDocumentoId,
    nomeCampo,
    titulo,
    metodoExtracao,
    desabilitado
  }: ICampoDocumentoDTO): Promise<HttpResponse> {
    const campoDocumento = new CampoDocumento()

    Object.assign(campoDocumento, {
      tipoDocumentoId,
      nomeCampo,
      titulo,
      metodoExtracao,
      desabilitado
    })

    this.camposDocumento.push(campoDocumento)

    return ok(campoDocumento)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredCamposDocumento = this.camposDocumento

    filteredCamposDocumento = filteredCamposDocumento.filter((campoDocumento) => {
      if (campoDocumento.nomeCampo.includes(search)) return true
      if (campoDocumento.titulo.includes(search)) return true
      if (campoDocumento.metodoExtracao.includes(search)) return true

      return false
    })

    return ok(filteredCamposDocumento.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredCamposDocumento = this.camposDocumento

    filteredCamposDocumento = filteredCamposDocumento.filter((campoDocumento) => {
      if (campoDocumento.nomeCampo.includes(filter)) return true
      if (campoDocumento.titulo.includes(filter)) return true
      if (campoDocumento.metodoExtracao.includes(filter)) return true

      return false
    })

    return ok(filteredCamposDocumento)
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
    let filteredCamposDocumento = this.camposDocumento

    filteredCamposDocumento = filteredCamposDocumento.filter((campoDocumento) => {
      if (campoDocumento.nomeCampo.includes(search)) return true
      if (campoDocumento.titulo.includes(search)) return true
      if (campoDocumento.metodoExtracao.includes(search)) return true

      return false
    })

    return ok(filteredCamposDocumento.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const campoDocumento = this.camposDocumento.find((campoDocumento) => campoDocumento.id === id)

    if (typeof campoDocumento === 'undefined') {
      return notFound()
    } else {
      return ok(campoDocumento)
    }
  }


  // update
  async update ({
    id,
    tipoDocumentoId,
    nomeCampo,
    titulo,
    metodoExtracao,
    desabilitado
  }: ICampoDocumentoDTO): Promise<HttpResponse> {
    const index = this.camposDocumento.findIndex((campoDocumento) => campoDocumento.id === id)

    this.camposDocumento[index].tipoDocumentoId = tipoDocumentoId
    this.camposDocumento[index].nomeCampo = nomeCampo
    this.camposDocumento[index].titulo = titulo
    this.camposDocumento[index].metodoExtracao = metodoExtracao
    this.camposDocumento[index].desabilitado = desabilitado

    return ok(this.camposDocumento[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.camposDocumento.findIndex((campoDocumento) => campoDocumento.id === id)

    this.camposDocumento.splice(index, 1)

    return ok(this.camposDocumento)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { CampoDocumentoRepositoryInMemory }
