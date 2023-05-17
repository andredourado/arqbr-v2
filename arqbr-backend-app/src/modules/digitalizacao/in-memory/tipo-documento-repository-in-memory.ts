import { ITipoDocumentoDTO } from '@modules/digitalizacao/dtos/i-tipo-documento-dto'
import { ITipoDocumentoRepository } from '@modules/digitalizacao/repositories/i-tipo-documento-repository'
import { TipoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/tipo-documento'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class TipoDocumentoRepositoryInMemory implements ITipoDocumentoRepository {
  tiposDocumento: TipoDocumento[] = []

  // create
  async create ({
    clienteId,
    departamentoId,
    descricao,
    identificador,
    estrategiaQuebra,
    prazoDescarteAnos,
    desabilitado
  }: ITipoDocumentoDTO): Promise<HttpResponse> {
    const tipoDocumento = new TipoDocumento()

    Object.assign(tipoDocumento, {
      clienteId,
      departamentoId,
      descricao,
      identificador,
      estrategiaQuebra,
      prazoDescarteAnos,
      desabilitado
    })

    this.tiposDocumento.push(tipoDocumento)

    return ok(tipoDocumento)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredTiposDocumento = this.tiposDocumento

    filteredTiposDocumento = filteredTiposDocumento.filter((tipoDocumento) => {
      if (tipoDocumento.descricao.includes(search)) return true
      if (tipoDocumento.identificador.includes(search)) return true

      return false
    })

    return ok(filteredTiposDocumento.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredTiposDocumento = this.tiposDocumento

    filteredTiposDocumento = filteredTiposDocumento.filter((tipoDocumento) => {
      if (tipoDocumento.descricao.includes(filter)) return true
      if (tipoDocumento.identificador.includes(filter)) return true

      return false
    })

    return ok(filteredTiposDocumento)
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
    let filteredTiposDocumento = this.tiposDocumento

    filteredTiposDocumento = filteredTiposDocumento.filter((tipoDocumento) => {
      if (tipoDocumento.descricao.includes(search)) return true
      if (tipoDocumento.identificador.includes(search)) return true

      return false
    })

    return ok(filteredTiposDocumento.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const tipoDocumento = this.tiposDocumento.find((tipoDocumento) => tipoDocumento.id === id)

    if (typeof tipoDocumento === 'undefined') {
      return notFound()
    } else {
      return ok(tipoDocumento)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    departamentoId,
    descricao,
    identificador,
    estrategiaQuebra,
    prazoDescarteAnos,
    desabilitado
  }: ITipoDocumentoDTO): Promise<HttpResponse> {
    const index = this.tiposDocumento.findIndex((tipoDocumento) => tipoDocumento.id === id)

    this.tiposDocumento[index].clienteId = clienteId
    this.tiposDocumento[index].departamentoId = departamentoId
    this.tiposDocumento[index].descricao = descricao
    this.tiposDocumento[index].identificador = identificador
    this.tiposDocumento[index].estrategiaQuebra = estrategiaQuebra
    this.tiposDocumento[index].prazoDescarteAnos = prazoDescarteAnos
    this.tiposDocumento[index].desabilitado = desabilitado

    return ok(this.tiposDocumento[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.tiposDocumento.findIndex((tipoDocumento) => tipoDocumento.id === id)

    this.tiposDocumento.splice(index, 1)

    return ok(this.tiposDocumento)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { TipoDocumentoRepositoryInMemory }
