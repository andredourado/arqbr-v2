import { IPessoaDTO } from '@modules/pessoas/dtos/i-pessoa-dto'
import { IPessoaRepository } from '@modules/pessoas/repositories/i-pessoa-repository'
import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PessoaRepositoryInMemory implements IPessoaRepository {
  pessoas: Pessoa[] = []

  // create
  async create ({
    unidadeId,
    nome,
    email,
    funcaoId,
    gerente,
    desabilitado
  }: IPessoaDTO): Promise<HttpResponse> {
    const pessoa = new Pessoa()

    Object.assign(pessoa, {
      unidadeId,
      nome,
      email,
      funcaoId,
      gerente,
      desabilitado
    })

    this.pessoas.push(pessoa)

    return ok(pessoa)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPessoas = this.pessoas

    filteredPessoas = filteredPessoas.filter((pessoa) => {
      if (pessoa.nome.includes(search)) return true
      if (pessoa.email.includes(search)) return true

      return false
    })

    return ok(filteredPessoas.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPessoas = this.pessoas

    filteredPessoas = filteredPessoas.filter((pessoa) => {
      if (pessoa.nome.includes(filter)) return true
      if (pessoa.email.includes(filter)) return true

      return false
    })

    return ok(filteredPessoas)
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
    let filteredPessoas = this.pessoas

    filteredPessoas = filteredPessoas.filter((pessoa) => {
      if (pessoa.nome.includes(search)) return true
      if (pessoa.email.includes(search)) return true

      return false
    })

    return ok(filteredPessoas.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const pessoa = this.pessoas.find((pessoa) => pessoa.id === id)

    if (typeof pessoa === 'undefined') {
      return notFound()
    } else {
      return ok(pessoa)
    }
  }


  // update
  async update ({
    id,
    unidadeId,
    nome,
    email,
    funcaoId,
    gerente,
    desabilitado
  }: IPessoaDTO): Promise<HttpResponse> {
    const index = this.pessoas.findIndex((pessoa) => pessoa.id === id)

    this.pessoas[index].unidadeId = unidadeId
    this.pessoas[index].nome = nome
    this.pessoas[index].email = email
    this.pessoas[index].funcaoId = funcaoId
    this.pessoas[index].gerente = gerente
    this.pessoas[index].desabilitado = desabilitado

    return ok(this.pessoas[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.pessoas.findIndex((pessoa) => pessoa.id === id)

    this.pessoas.splice(index, 1)

    return ok(this.pessoas)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PessoaRepositoryInMemory }
