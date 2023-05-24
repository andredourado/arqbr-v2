import { IDocumentoDigitalDTO, ISolicitacao } from '@modules/digitalizacao/dtos/i-documento-digital-dto'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { DocumentoDigital } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital'
import { ok, notFound, HttpResponse } from '@shared/helpers'
import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante'
import { User } from '@modules/security/infra/typeorm/entities/user'

class DocumentoDigitalRepositoryInMemory implements IDocumentoDigitalRepository {
  countPages(user: User, solicitante: Solicitante): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
  countProcessing(user: User, solicitante: Solicitante): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
  countByTipoDocumento(user: User, solicitante: Solicitante): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
  countByDepartamento(): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
  getDocumentosSolicitados(rowsPerPage: number): Promise<HttpResponse<ISolicitacao[]>> {
    throw new Error('Method not implemented.')
  }
  documentosDigitais: DocumentoDigital[] = []

  // create
  async create ({
    clienteId,
    departamentoId,
    tipoDocumentoId,
    nomeArquivo,
    nomeArquivoOrigem,
    conteudoEmTexto,
    numeroPaginas,
    solicitacaoFisico,
    dataSolicitacao,
    solicitanteId
  }: IDocumentoDigitalDTO): Promise<HttpResponse> {
    const documentoDigital = new DocumentoDigital()

    Object.assign(documentoDigital, {
      clienteId,
      departamentoId,
      tipoDocumentoId,
      nomeArquivo,
      nomeArquivoOrigem,
      conteudoEmTexto,
      numeroPaginas,
      solicitacaoFisico,
      dataSolicitacao,
      solicitanteId
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

      return false
    })

    return ok(filteredDocumentosDigitais.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredDocumentosDigitais = this.documentosDigitais

    filteredDocumentosDigitais = filteredDocumentosDigitais.filter((documentoDigital) => {

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
    clienteId,
    departamentoId,
    tipoDocumentoId,
    nomeArquivo,
    nomeArquivoOrigem,
    conteudoEmTexto,
    numeroPaginas,
    solicitacaoFisico,
    dataSolicitacao,
    solicitanteId
  }: IDocumentoDigitalDTO): Promise<HttpResponse> {
    const index = this.documentosDigitais.findIndex((documentoDigital) => documentoDigital.id === id)

    this.documentosDigitais[index].clienteId = clienteId
    this.documentosDigitais[index].departamentoId = departamentoId
    this.documentosDigitais[index].tipoDocumentoId = tipoDocumentoId
    this.documentosDigitais[index].nomeArquivo = nomeArquivo
    this.documentosDigitais[index].nomeArquivoOrigem = nomeArquivoOrigem
    this.documentosDigitais[index].conteudoEmTexto = conteudoEmTexto
    this.documentosDigitais[index].numeroPaginas = numeroPaginas
    this.documentosDigitais[index].solicitacaoFisico = solicitacaoFisico
    this.documentosDigitais[index].dataSolicitacao = dataSolicitacao
    this.documentosDigitais[index].solicitanteId = solicitanteId

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
