import { IVeiculoDTO } from '@modules/coleta/dtos/i-veiculo-dto'
import { IVeiculoRepository } from '@modules/coleta/repositories/i-veiculo-repository'
import { Veiculo } from '@modules/coleta/infra/typeorm/entities/veiculo'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class VeiculoRepositoryInMemory implements IVeiculoRepository {
  veiculos: Veiculo[] = []

  // create
  async create ({
    descricao,
    desabilitado
  }: IVeiculoDTO): Promise<HttpResponse> {
    const veiculo = new Veiculo()

    Object.assign(veiculo, {
      descricao,
      desabilitado
    })

    this.veiculos.push(veiculo)

    return ok(veiculo)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredVeiculos = this.veiculos

    filteredVeiculos = filteredVeiculos.filter((veiculo) => {
      if (veiculo.descricao.includes(search)) return true

      return false
    })

    return ok(filteredVeiculos.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredVeiculos = this.veiculos

    filteredVeiculos = filteredVeiculos.filter((veiculo) => {
      if (veiculo.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredVeiculos)
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
    let filteredVeiculos = this.veiculos

    filteredVeiculos = filteredVeiculos.filter((veiculo) => {
      if (veiculo.descricao.includes(search)) return true

      return false
    })

    return ok(filteredVeiculos.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const veiculo = this.veiculos.find((veiculo) => veiculo.id === id)

    if (typeof veiculo === 'undefined') {
      return notFound()
    } else {
      return ok(veiculo)
    }
  }


  // update
  async update ({
    id,
    descricao,
    desabilitado
  }: IVeiculoDTO): Promise<HttpResponse> {
    const index = this.veiculos.findIndex((veiculo) => veiculo.id === id)

    this.veiculos[index].descricao = descricao
    this.veiculos[index].desabilitado = desabilitado

    return ok(this.veiculos[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.veiculos.findIndex((veiculo) => veiculo.id === id)

    this.veiculos.splice(index, 1)

    return ok(this.veiculos)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { VeiculoRepositoryInMemory }
