import { ICaixaQuebraDTO } from '@modules/digitalizacao/dtos/i-caixa-quebra-dto'
import { CaixaQuebra } from '@modules/digitalizacao/infra/typeorm/entities/caixa-quebra'
import { ok, notFound, HttpResponse } from '@shared/helpers'
import { ICaixaQuebraRepository } from '../repositories/i-caixa-quebra-repository'

class CaixaQuebraRepositoryInMemory implements ICaixaQuebraRepository {
  caixasQuebras: CaixaQuebra[] = []

  // create
  async create ({
    clienteId,
    departamentoId,
    tipoDocumentoId,
    nomeArquivoOrigem,
    sequencia,
    paginaInicial,
    paginaFinal,
    status
  }: ICaixaQuebraDTO): Promise<HttpResponse> {
    const caixaQuebra = new CaixaQuebra()

    Object.assign(caixaQuebra, {
      clienteId,
      departamentoId,
      tipoDocumentoId,
      nomeArquivoOrigem,
      sequencia,
      paginaInicial,
      paginaFinal,
      status
    })

    this.caixasQuebras.push(caixaQuebra)

    return ok(caixaQuebra)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredCaixasQuebras = this.caixasQuebras

    filteredCaixasQuebras = filteredCaixasQuebras.filter((caixaQuebra) => {
      if (caixaQuebra.nomeArquivoOrigem.includes(search)) return true

      return false
    })

    return ok(filteredCaixasQuebras.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredCaixasQuebras = this.caixasQuebras

    filteredCaixasQuebras = filteredCaixasQuebras.filter((caixaQuebra) => {
      if (caixaQuebra.nomeArquivoOrigem.includes(filter)) return true

      return false
    })

    return ok(filteredCaixasQuebras)
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
    let filteredCaixasQuebras = this.caixasQuebras

    filteredCaixasQuebras = filteredCaixasQuebras.filter((caixaQuebra) => {
      if (caixaQuebra.nomeArquivoOrigem.includes(search)) return true

      return false
    })

    return ok(filteredCaixasQuebras.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const caixaQuebra = this.caixasQuebras.find((caixaQuebra) => caixaQuebra.id === id)

    if (typeof caixaQuebra === 'undefined') {
      return notFound()
    } else {
      return ok(caixaQuebra)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    departamentoId,
    tipoDocumentoId,
    nomeArquivoOrigem,
    sequencia,
    paginaInicial,
    paginaFinal,
    status
  }: ICaixaQuebraDTO): Promise<HttpResponse> {
    const index = this.caixasQuebras.findIndex((caixaQuebra) => caixaQuebra.id === id)

    this.caixasQuebras[index].clienteId = clienteId
    this.caixasQuebras[index].departamentoId = departamentoId
    this.caixasQuebras[index].tipoDocumentoId = tipoDocumentoId
    this.caixasQuebras[index].nomeArquivoOrigem = nomeArquivoOrigem
    this.caixasQuebras[index].sequencia = sequencia
    this.caixasQuebras[index].paginaInicial = paginaInicial
    this.caixasQuebras[index].paginaFinal = paginaFinal
    this.caixasQuebras[index].status = status

    return ok(this.caixasQuebras[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.caixasQuebras.findIndex((caixaQuebra) => caixaQuebra.id === id)

    this.caixasQuebras.splice(index, 1)

    return ok(this.caixasQuebras)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { CaixaQuebraRepositoryInMemory }
