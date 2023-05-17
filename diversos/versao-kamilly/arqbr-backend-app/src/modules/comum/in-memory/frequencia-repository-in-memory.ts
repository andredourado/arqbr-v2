import { IFrequenciaDTO } from '@modules/comum/dtos/i-frequencia-dto'
import { IFrequenciaRepository } from '@modules/comum/repositories/i-frequencia-repository'
import { Frequencia } from '@modules/comum/infra/typeorm/entities/frequencia'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class FrequenciaRepositoryInMemory implements IFrequenciaRepository {
  frequencias: Frequencia[] = []

  // create
  async create ({
    descricao,
    espacoEmDias,
    desabilitado
  }: IFrequenciaDTO): Promise<HttpResponse> {
    const frequencia = new Frequencia()

    Object.assign(frequencia, {
      descricao,
      espacoEmDias,
      desabilitado
    })

    this.frequencias.push(frequencia)

    return ok(frequencia)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredFrequencias = this.frequencias

    filteredFrequencias = filteredFrequencias.filter((frequencia) => {
      if (frequencia.descricao.includes(search)) return true

      return false
    })

    return ok(filteredFrequencias.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredFrequencias = this.frequencias

    filteredFrequencias = filteredFrequencias.filter((frequencia) => {
      if (frequencia.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredFrequencias)
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
    let filteredFrequencias = this.frequencias

    filteredFrequencias = filteredFrequencias.filter((frequencia) => {
      if (frequencia.descricao.includes(search)) return true

      return false
    })

    return ok(filteredFrequencias.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const frequencia = this.frequencias.find((frequencia) => frequencia.id === id)

    if (typeof frequencia === 'undefined') {
      return notFound()
    } else {
      return ok(frequencia)
    }
  }


  // update
  async update ({
    id,
    descricao,
    espacoEmDias,
    desabilitado
  }: IFrequenciaDTO): Promise<HttpResponse> {
    const index = this.frequencias.findIndex((frequencia) => frequencia.id === id)

    this.frequencias[index].descricao = descricao
    this.frequencias[index].espacoEmDias = espacoEmDias
    this.frequencias[index].desabilitado = desabilitado

    return ok(this.frequencias[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.frequencias.findIndex((frequencia) => frequencia.id === id)

    this.frequencias.splice(index, 1)

    return ok(this.frequencias)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { FrequenciaRepositoryInMemory }
