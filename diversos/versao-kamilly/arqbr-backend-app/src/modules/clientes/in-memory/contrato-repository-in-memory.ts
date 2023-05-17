import { IContratoDTO } from '@modules/clientes/dtos/i-contrato-dto'
import { IContratoRepository } from '@modules/clientes/repositories/i-contrato-repository'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class ContratoRepositoryInMemory implements IContratoRepository {
  contratos: Contrato[] = []

  // create
  async create ({
    clienteId,
    identificador,
    aceitaServicosTerceiros,
    desabilitado
  }: IContratoDTO): Promise<HttpResponse> {
    const contrato = new Contrato()

    Object.assign(contrato, {
      clienteId,
      identificador,
      aceitaServicosTerceiros,
      desabilitado
    })

    this.contratos.push(contrato)

    return ok(contrato)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredContratos = this.contratos

    filteredContratos = filteredContratos.filter((contrato) => {
      if (contrato.identificador.includes(search)) return true

      return false
    })

    return ok(filteredContratos.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredContratos = this.contratos

    filteredContratos = filteredContratos.filter((contrato) => {
      if (contrato.identificador.includes(filter)) return true

      return false
    })

    return ok(filteredContratos)
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
    let filteredContratos = this.contratos

    filteredContratos = filteredContratos.filter((contrato) => {
      if (contrato.identificador.includes(search)) return true

      return false
    })

    return ok(filteredContratos.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const contrato = this.contratos.find((contrato) => contrato.id === id)

    if (typeof contrato === 'undefined') {
      return notFound()
    } else {
      return ok(contrato)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    identificador,
    aceitaServicosTerceiros,
    desabilitado
  }: IContratoDTO): Promise<HttpResponse> {
    const index = this.contratos.findIndex((contrato) => contrato.id === id)

    this.contratos[index].clienteId = clienteId
    this.contratos[index].identificador = identificador
    this.contratos[index].aceitaServicosTerceiros = aceitaServicosTerceiros
    this.contratos[index].desabilitado = desabilitado

    return ok(this.contratos[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.contratos.findIndex((contrato) => contrato.id === id)

    this.contratos.splice(index, 1)

    return ok(this.contratos)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { ContratoRepositoryInMemory }
