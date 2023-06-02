import { IDefinicaoExtracaoDTO } from '@modules/digitalizacao/dtos/i-definicao-extracao-dto'
import { DefinicaoExtracao } from '@modules/digitalizacao/infra/typeorm/entities/definicao-extracao'
import { ok, notFound, HttpResponse } from '@shared/helpers'
import { IDefinicaoExtracaoRepository } from '../repositories/i-definicao-extracao-repository'

class DefinicaoExtracaoRepositoryInMemory implements IDefinicaoExtracaoRepository {
  definicoesExtracao: DefinicaoExtracao[] = []

  // create
  async create ({
    clienteId,
    departamentoId,
    tipoDocumentoId,
    pdf,
    textoQuebra,
    nomeCampo,
    titulo,
    estrategia,
    texto,
    linha,
    inicio,
    comprimento
  }: IDefinicaoExtracaoDTO): Promise<HttpResponse> {
    const definicaoExtracao = new DefinicaoExtracao()

    Object.assign(definicaoExtracao, {
      clienteId,
      departamentoId,
      tipoDocumentoId,
      pdf,
      textoQuebra,
      nomeCampo,
      titulo,
      estrategia,
      texto,
      linha,
      inicio,
      comprimento
    })

    this.definicoesExtracao.push(definicaoExtracao)

    return ok(definicaoExtracao)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredDefinicoesExtracao = this.definicoesExtracao

    filteredDefinicoesExtracao = filteredDefinicoesExtracao.filter((definicaoExtracao) => {
      if (definicaoExtracao.pdf.includes(search)) return true

      return false
    })

    return ok(filteredDefinicoesExtracao.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredDefinicoesExtracao = this.definicoesExtracao

    filteredDefinicoesExtracao = filteredDefinicoesExtracao.filter((definicaoExtracao) => {
      if (definicaoExtracao.pdf.includes(filter)) return true

      return false
    })

    return ok(filteredDefinicoesExtracao)
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
    let filteredDefinicoesExtracao = this.definicoesExtracao

    filteredDefinicoesExtracao = filteredDefinicoesExtracao.filter((definicaoExtracao) => {
      if (definicaoExtracao.pdf.includes(search)) return true

      return false
    })

    return ok(filteredDefinicoesExtracao.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const definicaoExtracao = this.definicoesExtracao.find((definicaoExtracao) => definicaoExtracao.id === id)

    if (typeof definicaoExtracao === 'undefined') {
      return notFound()
    } else {
      return ok(definicaoExtracao)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    departamentoId,
    tipoDocumentoId,
    pdf,
    textoQuebra,
    nomeCampo,
    titulo,
    estrategia,
    texto,
    linha,
    inicio,
    comprimento
    
  }: IDefinicaoExtracaoDTO): Promise<HttpResponse> {
    const index = this.definicoesExtracao.findIndex((caixaQuebra) => caixaQuebra.id === id)

    this.definicoesExtracao[index].clienteId = clienteId
    this.definicoesExtracao[index].departamentoId = departamentoId
    this.definicoesExtracao[index].tipoDocumentoId = tipoDocumentoId
    this.definicoesExtracao[index].pdf = pdf
    this.definicoesExtracao[index].textoQuebra = textoQuebra
    this.definicoesExtracao[index].nomeCampo = nomeCampo 
    this.definicoesExtracao[index].titulo = titulo
    this.definicoesExtracao[index].estrategia = estrategia
    this.definicoesExtracao[index].texto = texto
    this.definicoesExtracao[index].linha = linha
    this.definicoesExtracao[index].inicio = inicio
    this.definicoesExtracao[index].comprimento = comprimento

    return ok(this.definicoesExtracao[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.definicoesExtracao.findIndex((definicaoExtracao) => definicaoExtracao.id === id)

    this.definicoesExtracao.splice(index, 1)

    return ok(this.definicoesExtracao)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { DefinicaoExtracaoRepositoryInMemory }
