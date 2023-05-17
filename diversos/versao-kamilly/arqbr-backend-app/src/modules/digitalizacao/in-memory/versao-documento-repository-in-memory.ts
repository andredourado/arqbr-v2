import { IVersaoDocumentoDTO } from '@modules/digitalizacao/dtos/i-versao-documento-dto'
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository'
import { VersaoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/versao-documento'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class VersaoDocumentoRepositoryInMemory implements IVersaoDocumentoRepository {
  versoesDocumento: VersaoDocumento[] = []

  // create
  async create ({
    clienteId,
    contratoId,
    departamentoId,
    tipoDocumentoId,
    descricaoVersao,
    qrcode,
    desabilitado
  }: IVersaoDocumentoDTO): Promise<HttpResponse> {
    const versaoDocumento = new VersaoDocumento()

    Object.assign(versaoDocumento, {
      clienteId,
      contratoId,
      departamentoId,
      tipoDocumentoId,
      descricaoVersao,
      qrcode,
      desabilitado
    })

    this.versoesDocumento.push(versaoDocumento)

    return ok(versaoDocumento)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredVersoesDocumento = this.versoesDocumento

    filteredVersoesDocumento = filteredVersoesDocumento.filter((versaoDocumento) => {
      if (versaoDocumento.descricaoVersao.includes(search)) return true

      return false
    })

    return ok(filteredVersoesDocumento.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredVersoesDocumento = this.versoesDocumento

    filteredVersoesDocumento = filteredVersoesDocumento.filter((versaoDocumento) => {
      if (versaoDocumento.descricaoVersao.includes(filter)) return true

      return false
    })

    return ok(filteredVersoesDocumento)
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
    let filteredVersoesDocumento = this.versoesDocumento

    filteredVersoesDocumento = filteredVersoesDocumento.filter((versaoDocumento) => {
      if (versaoDocumento.descricaoVersao.includes(search)) return true

      return false
    })

    return ok(filteredVersoesDocumento.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const versaoDocumento = this.versoesDocumento.find((versaoDocumento) => versaoDocumento.id === id)

    if (typeof versaoDocumento === 'undefined') {
      return notFound()
    } else {
      return ok(versaoDocumento)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    contratoId,
    departamentoId,
    tipoDocumentoId,
    descricaoVersao,
    qrcode,
    desabilitado
  }: IVersaoDocumentoDTO): Promise<HttpResponse> {
    const index = this.versoesDocumento.findIndex((versaoDocumento) => versaoDocumento.id === id)

    this.versoesDocumento[index].clienteId = clienteId
    this.versoesDocumento[index].contratoId = contratoId
    this.versoesDocumento[index].departamentoId = departamentoId
    this.versoesDocumento[index].tipoDocumentoId = tipoDocumentoId
    this.versoesDocumento[index].descricaoVersao = descricaoVersao
    this.versoesDocumento[index].qrcode = qrcode
    this.versoesDocumento[index].desabilitado = desabilitado

    return ok(this.versoesDocumento[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.versoesDocumento.findIndex((versaoDocumento) => versaoDocumento.id === id)

    this.versoesDocumento.splice(index, 1)

    return ok(this.versoesDocumento)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { VersaoDocumentoRepositoryInMemory }
