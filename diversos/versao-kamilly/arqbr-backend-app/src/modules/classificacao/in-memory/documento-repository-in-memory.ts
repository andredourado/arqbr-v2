import { IDocumentoDTO } from '@modules/classificacao/dtos/i-documento-dto'
import { IDocumentoRepository } from '@modules/classificacao/repositories/i-documento-repository'
import { Documento } from '@modules/classificacao/infra/typeorm/entities/documento'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class DocumentoRepositoryInMemory implements IDocumentoRepository {
  documentos: Documento[] = []

  // create
  async create ({
    clienteId,
    contratoId,
    departamentoId,
    tipoDocumentoId,
    nip,
    caixaArqbr,
    conteudoQrCode,
    statusId,
    pessoaId
  }: IDocumentoDTO): Promise<HttpResponse> {
    const documento = new Documento()

    Object.assign(documento, {
      clienteId,
      contratoId,
      departamentoId,
      tipoDocumentoId,
      nip,
      caixaArqbr,
      conteudoQrCode,
      statusId,
      pessoaId
    })

    this.documentos.push(documento)

    return ok(documento)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredDocumentos = this.documentos

    filteredDocumentos = filteredDocumentos.filter((documento) => {
      if (documento.nip.includes(search)) return true

      return false
    })

    return ok(filteredDocumentos.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredDocumentos = this.documentos

    filteredDocumentos = filteredDocumentos.filter((documento) => {
      if (documento.nip.includes(filter)) return true

      return false
    })

    return ok(filteredDocumentos)
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
    let filteredDocumentos = this.documentos

    filteredDocumentos = filteredDocumentos.filter((documento) => {
      if (documento.nip.includes(search)) return true

      return false
    })

    return ok(filteredDocumentos.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const documento = this.documentos.find((documento) => documento.id === id)

    if (typeof documento === 'undefined') {
      return notFound()
    } else {
      return ok(documento)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    contratoId,
    departamentoId,
    tipoDocumentoId,
    nip,
    caixaArqbr,
    conteudoQrCode,
    statusId,
    pessoaId
  }: IDocumentoDTO): Promise<HttpResponse> {
    const index = this.documentos.findIndex((documento) => documento.id === id)

    this.documentos[index].clienteId = clienteId
    this.documentos[index].contratoId = contratoId
    this.documentos[index].departamentoId = departamentoId
    this.documentos[index].tipoDocumentoId = tipoDocumentoId
    this.documentos[index].nip = nip
    this.documentos[index].caixaArqbr = caixaArqbr
    this.documentos[index].conteudoQrCode = conteudoQrCode
    this.documentos[index].statusId = statusId
    this.documentos[index].pessoaId = pessoaId

    return ok(this.documentos[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.documentos.findIndex((documento) => documento.id === id)

    this.documentos.splice(index, 1)

    return ok(this.documentos)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { DocumentoRepositoryInMemory }
