import { IPlantaDTO } from '@modules/armazenamento/dtos/i-planta-dto'
import { IPlantaRepository } from '@modules/armazenamento/repositories/i-planta-repository'
import { Planta } from '@modules/armazenamento/infra/typeorm/entities/planta'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PlantaRepositoryInMemory implements IPlantaRepository {
  plantas: Planta[] = []

  // create
  async create ({
    unidadeId,
    nome,
    quantidadePosicoes,
    desabilitado
  }: IPlantaDTO): Promise<HttpResponse> {
    const planta = new Planta()

    Object.assign(planta, {
      unidadeId,
      nome,
      quantidadePosicoes,
      desabilitado
    })

    this.plantas.push(planta)

    return ok(planta)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPlantas = this.plantas

    filteredPlantas = filteredPlantas.filter((planta) => {
      if (planta.nome.includes(search)) return true

      return false
    })

    return ok(filteredPlantas.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPlantas = this.plantas

    filteredPlantas = filteredPlantas.filter((planta) => {
      if (planta.nome.includes(filter)) return true

      return false
    })

    return ok(filteredPlantas)
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
    let filteredPlantas = this.plantas

    filteredPlantas = filteredPlantas.filter((planta) => {
      if (planta.nome.includes(search)) return true

      return false
    })

    return ok(filteredPlantas.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const planta = this.plantas.find((planta) => planta.id === id)

    if (typeof planta === 'undefined') {
      return notFound()
    } else {
      return ok(planta)
    }
  }


  // update
  async update ({
    id,
    unidadeId,
    nome,
    quantidadePosicoes,
    desabilitado
  }: IPlantaDTO): Promise<HttpResponse> {
    const index = this.plantas.findIndex((planta) => planta.id === id)

    this.plantas[index].unidadeId = unidadeId
    this.plantas[index].nome = nome
    this.plantas[index].quantidadePosicoes = quantidadePosicoes
    this.plantas[index].desabilitado = desabilitado

    return ok(this.plantas[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.plantas.findIndex((planta) => planta.id === id)

    this.plantas.splice(index, 1)

    return ok(this.plantas)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PlantaRepositoryInMemory }
