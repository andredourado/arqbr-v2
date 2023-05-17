import { IDocumentoDigitalDTO } from '@modules/digitalizacao/dtos/i-documento-digital-dto'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { DocumentoDigital } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class DocumentoDigitalRepositoryInMemory implements IDocumentoDigitalRepository {
  documentosDigitais: DocumentoDigital[] = []

  // create
  async create ({
    dataDigitalizacao,
    versaoDocumentoId,
    nip,
    conteudoQrCode,
    nomeArquivo,
    conteudoEmTexto,
    pessoaId,
  }: IDocumentoDigitalDTO): Promise<HttpResponse> {
    const documentoDigital = new DocumentoDigital()

    Object.assign(documentoDigital, {
      dataDigitalizacao,
      versaoDocumentoId,
      nip,
      conteudoQrCode,
      nomeArquivo,
      conteudoEmTexto,
      pessoaId,
    })

    this.documentosDigitais.push(documentoDigital)

    return ok(documentoDigital)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredDocumentosDigitais = this.documentosDigitais

    filteredDocumentosDigitais = filteredDocumentosDigitais.filter((documentoDigital) => {
      if (documentoDigital.nip.includes(search)) return true

      return false
    })

    return ok(filteredDocumentosDigitais.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredDocumentosDigitais = this.documentosDigitais

    filteredDocumentosDigitais = filteredDocumentosDigitais.filter((documentoDigital) => {
      if (documentoDigital.nip.includes(filter)) return true

      return false
    })

    return ok(filteredDocumentosDigitais)
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
    let filteredDocumentosDigitais = this.documentosDigitais

    filteredDocumentosDigitais = filteredDocumentosDigitais.filter((documentoDigital) => {
      if (documentoDigital.nip.includes(search)) return true

      return false
    })

    return ok(filteredDocumentosDigitais.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const documentoDigital = this.documentosDigitais.find((documentoDigital) => documentoDigital.id === id)

    if (typeof documentoDigital === 'undefined') {
      return notFound()
    } else {
      return ok(documentoDigital)
    }
  }


  // update
  async update ({
    id,
    dataDigitalizacao,
    versaoDocumentoId,
    nip,
    conteudoQrCode,
    nomeArquivo,
    conteudoEmTexto,
    pessoaId
  }: IDocumentoDigitalDTO): Promise<HttpResponse> {
    const index = this.documentosDigitais.findIndex((documentoDigital) => documentoDigital.id === id)

    this.documentosDigitais[index].dataDigitalizacao = dataDigitalizacao
    this.documentosDigitais[index].versaoDocumentoId = versaoDocumentoId
    this.documentosDigitais[index].nip = nip
    this.documentosDigitais[index].conteudoQrCode = conteudoQrCode
    this.documentosDigitais[index].nomeArquivo = nomeArquivo
    this.documentosDigitais[index].conteudoEmTexto = conteudoEmTexto
    this.documentosDigitais[index].pessoaId = pessoaId

    return ok(this.documentosDigitais[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.documentosDigitais.findIndex((documentoDigital) => documentoDigital.id === id)

    this.documentosDigitais.splice(index, 1)

    return ok(this.documentosDigitais)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { DocumentoDigitalRepositoryInMemory }
