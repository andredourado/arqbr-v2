import { IDocumentoDigitalCampoDTO } from '@modules/digitalizacao/dtos/i-documento-digital-campo-dto'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { DocumentoDigitalCampo } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital-campo'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class DocumentoDigitalCampoRepositoryInMemory implements IDocumentoDigitalCampoRepository {
  listByDocumento(documentoDigitalId: string): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
  documentosDigitaisCampos: DocumentoDigitalCampo[] = []

  // create
  async create ({
    documentoDigitalId,
    campoDocumentoId,
    conteudo
  }: IDocumentoDigitalCampoDTO): Promise<HttpResponse> {
    const documentoDigitalCampo = new DocumentoDigitalCampo()

    Object.assign(documentoDigitalCampo, {
      documentoDigitalId,
      campoDocumentoId,
      conteudo
    })

    this.documentosDigitaisCampos.push(documentoDigitalCampo)

    return ok(documentoDigitalCampo)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredDocumentosDigitaisCampos = this.documentosDigitaisCampos

    filteredDocumentosDigitaisCampos = filteredDocumentosDigitaisCampos.filter((documentoDigitalCampo) => {
      if (documentoDigitalCampo.conteudo.includes(search)) return true

      return false
    })

    return ok(filteredDocumentosDigitaisCampos.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredDocumentosDigitaisCampos = this.documentosDigitaisCampos

    filteredDocumentosDigitaisCampos = filteredDocumentosDigitaisCampos.filter((documentoDigitalCampo) => {
      if (documentoDigitalCampo.conteudo.includes(filter)) return true

      return false
    })

    return ok(filteredDocumentosDigitaisCampos)
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
    let filteredDocumentosDigitaisCampos = this.documentosDigitaisCampos

    filteredDocumentosDigitaisCampos = filteredDocumentosDigitaisCampos.filter((documentoDigitalCampo) => {
      if (documentoDigitalCampo.conteudo.includes(search)) return true

      return false
    })

    return ok(filteredDocumentosDigitaisCampos.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const documentoDigitalCampo = this.documentosDigitaisCampos.find((documentoDigitalCampo) => documentoDigitalCampo.id === id)

    if (typeof documentoDigitalCampo === 'undefined') {
      return notFound()
    } else {
      return ok(documentoDigitalCampo)
    }
  }


  // update
  async update ({
    id,
    documentoDigitalId,
    campoDocumentoId,
    conteudo
  }: IDocumentoDigitalCampoDTO): Promise<HttpResponse> {
    const index = this.documentosDigitaisCampos.findIndex((documentoDigitalCampo) => documentoDigitalCampo.id === id)

    this.documentosDigitaisCampos[index].documentoDigitalId = documentoDigitalId
    this.documentosDigitaisCampos[index].campoDocumentoId = campoDocumentoId
    this.documentosDigitaisCampos[index].conteudo = conteudo

    return ok(this.documentosDigitaisCampos[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.documentosDigitaisCampos.findIndex((documentoDigitalCampo) => documentoDigitalCampo.id === id)

    this.documentosDigitaisCampos.splice(index, 1)

    return ok(this.documentosDigitaisCampos)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { DocumentoDigitalCampoRepositoryInMemory }
